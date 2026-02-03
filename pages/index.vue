<template>
  <div class="single-page">
    <!-- HOME SECTION -->
    <section id="home" class="home-section">
      <div class="mist-bg"></div>
      <div class="home-content">
        <h1 class="main-title">Favilances Noir</h1>
        <p class="subtitle">Developer</p>
      </div>
      <div class="film-grain"></div>
    </section>

    <!-- ABOUT SECTION -->
    <section id="about" class="about-section" ref="aboutSection">
      <div class="about-content" :key="aboutAnimationKey">
        <p v-for="(line, i) in aboutLines" :key="i" class="reveal-line" :class="{ 'is-visible': aboutVisible }">
          {{ line }}
        </p>
      </div>

      <!-- Sliding "Send me an email." hollow text -->
      <div class="email-slider-wrap" @click="openEmail">
        <div class="hollow-row">
          <span v-for="n in 20" :key="n">Send me an email. - </span>
        </div>
      </div>
    </section>

    <!-- PROJECTS SECTION -->
    <section id="projects" class="projects-section" ref="projectsSection">
      <div class="projects-header" :class="{ 'fade-in': projectsVisible }">
        <h2>Projects</h2>
        <p class="projects-subtitle">Recent work from GitHub</p>
      </div>
      
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading projects…</p>
      </div>
      
      <div v-else-if="repos.length" class="projects-grid" :class="{ 'fade-in': projectsVisible }">
        <ProjectCard v-for="repo in repos" :key="repo.id" :repo="repo" @open="openRepo" />
      </div>
      
      <div v-else class="empty-state">
        <p>No projects found. Update GitHub username in config.js</p>
      </div>

      <!-- Modal -->
      <transition name="modal-fade">
        <div v-if="modalOpen" class="modal-backdrop" @click.self="closeModal">
          <div class="modal-panel">
            <button class="modal-close" @click="closeModal">✕</button>
            <h3>{{ modalRepo?.name }}</h3>
            <a v-if="modalRepo" :href="modalRepo.html_url" target="_blank" class="repo-link">
              View on GitHub →
            </a>
            <div v-if="readmeLoading" class="loading-readme">
              <div class="spinner-sm"></div>
              Loading README…
            </div>
            <div v-else class="readme-content" v-html="readmeHtml"></div>
          </div>
        </div>
      </transition>
    </section>

    <!-- BLOG SECTION -->
    <section id="blog" class="blog-section" ref="blogSection">
      <div class="blog-header" :class="{ 'fade-in': blogVisible }">
        <h2>Blog</h2>
        <p class="blog-subtitle">Thoughts & articles</p>
      </div>

      <div class="blog-content" :class="{ 'fade-in': blogVisible }">
        <ContentList path="/articles" v-slot="{ list }" :sort="{ date: -1 }">
          <div class="blog-grid">
            <article 
              v-for="article in list" 
              :key="article._path"
              class="blog-card"
            >
              <div 
                class="blog-card-inner"
                @click="toggleArticle(article._path)"
              >
                <div class="blog-date">
                  {{ formatDate(article.date) }}
                </div>
                <h3 class="blog-title">{{ article.title }}</h3>
                <p v-if="article.description" class="blog-description">
                  {{ article.description }}
                </p>
              </div>

              <Transition
                enter-active-class="blog-content-enter-active"
                enter-from-class="blog-content-enter-from"
                enter-to-class="blog-content-enter-to"
                leave-active-class="blog-content-leave-active"
                leave-from-class="blog-content-leave-from"
                leave-to-class="blog-content-leave-to"
              >
                <div 
                  v-if="openArticles.includes(article._path)" 
                  class="blog-expanded"
                >
                  <ContentDoc :path="article._path">
                    <template #default="{ doc }">
                      <article class="blog-article-content">
                        <ContentRenderer :value="doc" />
                      </article>
                    </template>
                  </ContentDoc>
                </div>
              </Transition>
            </article>
          </div>
        </ContentList>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import ProjectCard from '../components/ProjectCard.vue'
import { GITHUB_USER, DEFAULT_REPO_COUNT } from '~/config'

export default {
  name: 'Home',
  components: { ProjectCard },
  data() {
    return {
      aboutLines: [
        "I aim to follow the developments in the field of technology and software and reflect this information to my projects. I enjoy working and generating new ideas. If you would like to contact me, you can reach me at \"favilances@proton.me\"."
      ],
      repos: [],
      loading: true,
      modalOpen: false,
      modalRepo: null,
      readmeHtml: '',
      readmeLoading: false,
      aboutVisible: false,
      aboutAnimationKey: 0,
      projectsVisible: false,
      blogVisible: false,
      openArticles: []
    }
  },
  async mounted() {
    // Intersection Observer for about section spotlight - SÜREKLI TETİKLENİR
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.aboutAnimationKey++
            this.aboutVisible = true
          } else {
            this.aboutVisible = false
          }
        })
      },
      { threshold: 0.2 }
    )
    
    if (this.$refs.aboutSection) {
      observer.observe(this.$refs.aboutSection)
    }

    // Projects section fade-in
    const projectsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.projectsVisible = true
          }
        })
      },
      { threshold: 0.1 }
    )
    
    if (this.$refs.projectsSection) {
      projectsObserver.observe(this.$refs.projectsSection)
    }

    // Blog section fade-in
    const blogObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.blogVisible = true
          }
        })
      },
      { threshold: 0.1 }
    )
    
    if (this.$refs.blogSection) {
      blogObserver.observe(this.$refs.blogSection)
    }
    
    try {
      // Fetch pinned repositories using GitHub GraphQL API
      const graphqlQuery = {
        query: `
          query {
            user(login: "${GITHUB_USER}") {
              pinnedItems(first: 6, types: REPOSITORY) {
                nodes {
                  ... on Repository {
                    id
                    name
                    description
                    url
                    stargazerCount
                    primaryLanguage {
                      name
                      color
                    }
                    updatedAt
                    owner {
                      login
                    }
                  }
                }
              }
            }
          }
        `
      }
      
      const res = await axios.post('https://api.github.com/graphql', graphqlQuery, {
        headers: {
          'Content-Type': 'application/json',
          // If you have a GitHub token, add it here for higher rate limits:
          // 'Authorization': 'Bearer YOUR_GITHUB_TOKEN'
        }
      })
      
      if (res.data.data && res.data.data.user && res.data.data.user.pinnedItems) {
        this.repos = res.data.data.user.pinnedItems.nodes.map(repo => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.url,
          stargazers_count: repo.stargazerCount,
          language: repo.primaryLanguage ? repo.primaryLanguage.name : null,
          updated_at: repo.updatedAt,
          owner: repo.owner
        }))
      } else {
        // Fallback to regular repos if no pinned repos
        const fallback = await axios.get(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=${DEFAULT_REPO_COUNT}&sort=updated`)
        this.repos = fallback.data.filter(r => !r.fork)
      }
    } catch (e) {
      console.error('Failed to fetch repos:', e)
      // Fallback to regular repos on error
      try {
        const fallback = await axios.get(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=${DEFAULT_REPO_COUNT}&sort=updated`)
        this.repos = fallback.data.filter(r => !r.fork)
      } catch (fallbackError) {
        this.repos = []
      }
    } finally {
      this.loading = false
    }
  },
  methods: {
    async openRepo(repo) {
      this.modalRepo = repo
      this.modalOpen = true
      this.readmeLoading = true
      try {
        const meta = await axios.get(`https://api.github.com/repos/${repo.owner.login}/${repo.name}`)
        const branch = meta.data.default_branch || 'main'
        const raw = `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/${branch}/README.md`
        const r = await axios.get(raw).catch(() => null)
        if (r && r.data) {
          this.readmeHtml = this.parseMarkdown(r.data)
        } else {
          this.readmeHtml = '<p class="no-readme">No README found for this project.</p>'
        }
      } catch (e) {
        this.readmeHtml = '<p class="error">Unable to load README.</p>'
      } finally {
        this.readmeLoading = false
      }
    },
    closeModal() {
      this.modalOpen = false
      this.modalRepo = null
      this.readmeHtml = ''
    },
    parseMarkdown(md) {
      return md
        .split('\n\n')
        .map(p => {
          p = p.replace(/^#{1,6}\s+(.+)$/gm, '<h3>$1</h3>')
          p = p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          p = p.replace(/\*(.+?)\*/g, '<em>$1</em>')
          p = p.replace(/`(.+?)`/g, '<code>$1</code>')
          p = p.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>')
          return p.startsWith('<h3>') ? p : `<p>${p.replace(/\n/g, '<br/>')}</p>`
        })
        .join('')
    },
    openEmail() {
      window.location.href = 'mailto:favilances@proton.me'
    },
    toggleArticle(path) {
      const index = this.openArticles.indexOf(path)
      if (index === -1) {
        this.openArticles.push(path)
      } else {
        this.openArticles = this.openArticles.filter(p => p !== path)
      }
    },
    formatDate(date) {
      if (!date) return ''
      const d = new Date(date)
      return d.toLocaleDateString('tr-TR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\./g, '-')
    }
  }
}
</script>

<style scoped>
.single-page {
  width: 100%;
}

/* ===== HOME SECTION ===== */
.home-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Animated gradient background - uses global animation from styles.css */

.home-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  text-align: center;
  width: 100%;
  padding: 0 40px;
}

.main-title {
  font-size: clamp(72px, 11vw, 130px);
  font-weight: 300;
  letter-spacing: 0.01em;
  margin: 0;
  line-height: 1.2;
  color: rgba(180, 180, 180, 1);
  font-family: 'Camiro', sans-serif;
  mix-blend-mode: screen;
  position: relative;
  z-index: 2;
  animation: slideUpTitle 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(60px);
  filter: brightness(1.1);
}

.subtitle {
  margin-top: 24px;
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 0.05em;
  color: rgba(180, 180, 180, 1);
  mix-blend-mode: screen;
  position: relative;
  z-index: 2;
  animation: slideUpSubtitle 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
  opacity: 0;
  transform: translateY(60px);
  filter: brightness(1.1);
}

@keyframes slideUpTitle {
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUpSubtitle {
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===== ABOUT SECTION ===== */
.about-section {
  position: relative;
  padding: 120px 48px 80px;
  min-height: 100vh;
  background: #000000;
}

.about-content {
  max-width: 1100px;
  margin: 0 auto;
  color: rgba(230, 230, 230, 0.95);
  font-size: 32px;
  line-height: 2;
  font-weight: 300;
}

.reveal-line {
  opacity: 0;
  transform: translateY(40px);
  margin-bottom: 24px;
  position: relative;
  filter: blur(8px) brightness(0.2);
  transition: none;
}

.reveal-line.is-visible {
  animation: spotlightReveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.reveal-line.is-visible:nth-child(1) {
  animation-delay: 0.1s;
}

.reveal-line.is-visible:nth-child(2) {
  animation-delay: 0.3s;
}

.reveal-line.is-visible:nth-child(3) {
  animation-delay: 0.5s;
}

.reveal-line.is-visible:nth-child(4) {
  animation-delay: 0.7s;
}

.reveal-line.is-visible:nth-child(5) {
  animation-delay: 0.9s;
}

@keyframes spotlightReveal {
  0% {
    opacity: 0;
    transform: translateY(40px);
    filter: blur(8px) brightness(0.2);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0) brightness(1);
  }
}

.reveal-line::before {
  content: '';
  position: absolute;
  left: -40px;
  top: 0;
  bottom: 0;
  width: 200%;
  background: radial-gradient(ellipse 400px 100px at 50% 50%, rgba(143, 243, 212, 0.15), transparent 70%);
  opacity: 0;
  pointer-events: none;
}

.reveal-line.is-visible::before {
  animation: spotlightSweep 1.5s ease-out;
  animation-delay: inherit;
}

@keyframes spotlightSweep {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(0);
    opacity: 0;
  }
}

/* Sliding hollow email text */
.email-slider-wrap {
  height: 200px;
  overflow: hidden;
  margin-top: 80px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.email-slider-wrap:hover {
  opacity: 0.8;
}

.hollow-row {
  font-size: clamp(36px, 6vw, 72px);
  white-space: nowrap;
  display: flex;
  animation: slide 30s linear infinite;
  will-change: transform;
  gap: 0;
}

.hollow-row span {
  display: inline-block;
  padding: 0 40px;
  color: transparent;
  -webkit-text-stroke: 2px rgba(255, 255, 255, 0.3);
  font-weight: 700;
  letter-spacing: 3px;
  flex-shrink: 0;
  animation: neonFlicker 3s ease-in-out infinite;
  text-shadow: 
    0 0 10px rgba(143, 243, 212, 0.6),
    0 0 20px rgba(143, 243, 212, 0.4),
    0 0 30px rgba(143, 243, 212, 0.2),
    0 0 40px rgba(143, 243, 212, 0.1);
}

@keyframes slide {
  from { 
    transform: translateX(0); 
  }
  to { 
    transform: translateX(-50%); 
  }
}

@keyframes neonFlicker {
  0%, 100% {
    -webkit-text-stroke: 2px rgba(255, 255, 255, 0.3);
    text-shadow: 
      0 0 10px rgba(143, 243, 212, 0.6),
      0 0 20px rgba(143, 243, 212, 0.4),
      0 0 30px rgba(143, 243, 212, 0.2);
  }
  10%, 30%, 50%, 70%, 90% {
    -webkit-text-stroke: 2.5px rgba(255, 255, 255, 0.5);
    text-shadow: 
      0 0 15px rgba(143, 243, 212, 0.8),
      0 0 25px rgba(143, 243, 212, 0.6),
      0 0 35px rgba(143, 243, 212, 0.4),
      0 0 50px rgba(143, 243, 212, 0.2);
  }
  15%, 35%, 55%, 75%, 95% {
    -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.2);
    text-shadow: 
      0 0 8px rgba(143, 243, 212, 0.4),
      0 0 15px rgba(143, 243, 212, 0.2);
  }
}

/* ===== PROJECTS SECTION ===== */
.projects-section {
  position: relative;
  padding: 120px 48px 80px;
  min-height: 100vh;
  background: #000000;
}

.projects-header {
  max-width: 1200px;
  margin: 0 auto 48px;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1s ease, transform 1s ease;
}

.projects-header.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.projects-header h2 {
  font-size: 64px;
  font-weight: 200;
  margin: 0 0 12px 0;
  letter-spacing: 4px;
}

.projects-subtitle {
  font-size: 20px;
  opacity: 0.7;
  font-weight: 300;
  letter-spacing: 1px;
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 80px 20px;
  opacity: 0.7;
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 16px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: rgba(143, 243, 212, 0.8);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.projects-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1s ease 0.2s, transform 1s ease 0.2s;
}

.projects-grid.fade-in {
  opacity: 1;
  transform: translateY(0);
}

/* Modal styles */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(2, 2, 3, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
}

.modal-panel {
  position: relative;
  width: min(900px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  background: linear-gradient(135deg, rgba(15, 15, 18, 0.95), rgba(8, 8, 10, 0.98));
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 24px;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.modal-close:hover {
  color: #fff;
  transform: rotate(90deg);
}

.modal-panel h3 {
  font-size: 32px;
  font-weight: 300;
  margin: 0 0 8px 0;
  letter-spacing: 1px;
}

.repo-link {
  display: inline-block;
  color: rgba(143, 243, 212, 0.9);
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 24px;
  transition: opacity 0.2s;
}

.repo-link:hover {
  opacity: 1;
}

.loading-readme {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 40px 0;
  opacity: 0.7;
}

.spinner-sm {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-top-color: rgba(143, 243, 212, 0.8);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.readme-content {
  color: rgba(230, 230, 230, 0.9);
  line-height: 1.8;
  font-size: 15px;
}

.readme-content :deep(h3) {
  font-size: 22px;
  font-weight: 500;
  margin: 24px 0 12px;
  color: #fff;
}

.readme-content :deep(p) {
  margin: 12px 0;
}

.readme-content :deep(code) {
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
}

.readme-content :deep(a) {
  color: rgba(143, 243, 212, 0.9);
  text-decoration: none;
}

.readme-content :deep(a):hover {
  text-decoration: underline;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-active .modal-panel,
.modal-fade-leave-active .modal-panel {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-panel {
  transform: scale(0.95) translateY(20px);
}

.modal-fade-leave-to .modal-panel {
  transform: scale(0.95) translateY(-20px);
}

/* ===== BLOG SECTION ===== */
.blog-section {
  position: relative;
  padding: 120px 48px 100px;
  min-height: 100vh;
  background: #000;
}

.blog-header {
  text-align: center;
  margin-bottom: 60px;
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.blog-header.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.blog-header h2 {
  font-size: 56px;
  font-weight: 300;
  letter-spacing: 4px;
  margin: 0;
  color: rgba(230, 230, 230, 0.95);
  text-transform: uppercase;
}

.blog-subtitle {
  font-size: 18px;
  font-weight: 300;
  letter-spacing: 2px;
  margin-top: 12px;
  color: rgba(180, 180, 180, 0.7);
}

.blog-content {
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
}

.blog-content.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.blog-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.blog-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.blog-card:hover {
  border-color: rgba(143, 243, 212, 0.2);
  background: rgba(255, 255, 255, 0.03);
}

.blog-card-inner {
  padding: 24px;
  cursor: pointer;
  position: relative;
}

.blog-date {
  font-size: 13px;
  color: rgba(180, 180, 180, 0.6);
  letter-spacing: 1px;
  margin-bottom: 12px;
  font-weight: 300;
}

.blog-title {
  font-size: 22px;
  font-weight: 400;
  color: rgba(230, 230, 230, 0.95);
  margin: 0 0 8px 0;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
}

.blog-card:hover .blog-title {
  color: rgba(143, 243, 212, 0.9);
}

.blog-description {
  font-size: 15px;
  color: rgba(180, 180, 180, 0.7);
  line-height: 1.6;
  margin: 0;
  font-weight: 300;
}

.blog-expanded {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(0, 0, 0, 0.3);
}

.blog-article-content {
  padding: 32px 24px;
  color: rgba(230, 230, 230, 0.9);
  font-size: 15px;
  line-height: 1.8;
  font-weight: 300;
}

.blog-article-content :deep(h1),
.blog-article-content :deep(h2),
.blog-article-content :deep(h3) {
  color: rgba(230, 230, 230, 0.95);
  font-weight: 400;
  margin: 24px 0 16px;
  letter-spacing: 0.5px;
}

.blog-article-content :deep(h1) {
  font-size: 28px;
}

.blog-article-content :deep(h2) {
  font-size: 24px;
}

.blog-article-content :deep(h3) {
  font-size: 20px;
}

.blog-article-content :deep(p) {
  margin: 16px 0;
  line-height: 1.8;
}

.blog-article-content :deep(a) {
  color: rgba(143, 243, 212, 0.9);
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.blog-article-content :deep(a):hover {
  opacity: 0.7;
}

.blog-article-content :deep(code) {
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: rgba(255, 143, 182, 0.9);
}

.blog-article-content :deep(pre) {
  background: rgba(255, 255, 255, 0.03);
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 20px 0;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.blog-article-content :deep(pre code) {
  background: none;
  padding: 0;
  color: rgba(230, 230, 230, 0.9);
}

.blog-article-content :deep(ul),
.blog-article-content :deep(ol) {
  margin: 16px 0;
  padding-left: 24px;
}

.blog-article-content :deep(li) {
  margin: 8px 0;
  line-height: 1.8;
}

.blog-content-enter-active,
.blog-content-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.blog-content-enter-from,
.blog-content-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-20px);
}

.blog-content-enter-to,
.blog-content-leave-from {
  opacity: 1;
  max-height: 2000px;
  transform: translateY(0);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 920px) {
  .home-content {
    padding: 0 24px;
  }
  
  .main-title {
    font-size: clamp(48px, 14vw, 80px) !important;
    letter-spacing: 2px;
  }
  
  .subtitle {
    font-size: 16px;
    margin-top: 16px;
    letter-spacing: 0.03em;
  }
  
  .about-section {
    padding: 80px 24px 60px;
    min-height: auto;
  }
  
  .about-content {
    font-size: 18px;
    line-height: 1.8;
  }
  
  .reveal-line {
    margin-bottom: 16px;
  }
  
  .reveal-line::before {
    left: -20px;
    width: 150%;
  }
  
  .email-slider-wrap {
    height: 100px;
    margin-top: 48px;
  }
  
  .hollow-row {
    font-size: clamp(28px, 8vw, 48px);
  }
  
  .hollow-row span {
    padding: 0 20px;
    -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.3);
    letter-spacing: 2px;
  }
  
  .projects-section {
    padding: 80px 24px 60px;
    min-height: auto;
  }
  
  .projects-header {
    margin: 0 auto 32px;
  }
  
  .projects-header h2 {
    font-size: 36px;
    letter-spacing: 2px;
  }
  
  .projects-subtitle {
    font-size: 16px;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .modal-backdrop {
    padding: 16px;
  }
  
  .modal-panel {
    padding: 24px;
    border-radius: 12px;
    max-height: 85vh;
  }
  
  .modal-panel h3 {
    font-size: 24px;
    margin-right: 32px;
  }
  
  .modal-close {
    top: 16px;
    right: 16px;
    font-size: 20px;
    width: 28px;
    height: 28px;
  }
  
  .readme-content {
    font-size: 14px;
    line-height: 1.7;
  }
  
  .readme-content :deep(h3) {
    font-size: 18px;
    margin: 20px 0 10px;
  }

  .blog-section {
    padding: 80px 24px 60px;
  }

  .blog-header h2 {
    font-size: 36px;
    letter-spacing: 2px;
  }

  .blog-subtitle {
    font-size: 16px;
  }

  .blog-grid {
    gap: 16px;
  }

  .blog-card-inner {
    padding: 20px;
  }

  .blog-title {
    font-size: 18px;
  }

  .blog-description {
    font-size: 14px;
  }

  .blog-article-content {
    padding: 24px 20px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: clamp(36px, 12vw, 60px) !important;
    letter-spacing: 1px;
  }
  
  .subtitle {
    font-size: 14px;
    letter-spacing: 0.02em;
  }
  
  .about-content {
    font-size: 16px;
    line-height: 1.7;
  }
  
  .hollow-row {
    font-size: clamp(24px, 7vw, 36px);
  }
  
  .hollow-row span {
    padding: 0 16px;
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
    letter-spacing: 1px;
  }
  
  .projects-header h2 {
    font-size: 28px;
    letter-spacing: 1px;
  }
  
  .projects-subtitle {
    font-size: 14px;
  }
}
</style>
