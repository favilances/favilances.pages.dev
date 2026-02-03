<template>
  <header class="nav-bar">
    <nav class="nav-items">
      <a href="#home" :class="{ active: activeSection === 'home' }" @click.prevent="scrollToSection('home')">
        Home
      </a>
      <a href="#about" :class="{ active: activeSection === 'about' }" @click.prevent="scrollToSection('about')">
        About
      </a>
      <a href="#projects" :class="{ active: activeSection === 'projects' }" @click.prevent="scrollToSection('projects')">
        Projects
      </a>
      <a href="#blog" :class="{ active: activeSection === 'blog' }" @click.prevent="scrollToSection('blog')">
        Blog
      </a>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      activeSection: 'home'
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
    this.onScroll()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    scrollToSection(id) {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    onScroll() {
      const sections = ['home', 'about', 'projects', 'blog']
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const top = element.offsetTop
          const bottom = top + element.offsetHeight
          if (scrollPosition >= top && scrollPosition < bottom) {
            this.activeSection = section
            break
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.nav-bar {
  position: fixed;
  top: 24px;
  right: 48px;
  z-index: 100;
  padding: 0;
  display: flex;
  justify-content: flex-end;
  pointer-events: none;
}

.nav-items {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
  pointer-events: auto;
}

.nav-items a,
.nav-items .blog-link {
  position: relative;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 8px 12px;
  background: rgba(5, 5, 7, 0.3);
  backdrop-filter: blur(8px);
  border-radius: 4px;
  display: block;
}

.nav-items a:hover,
.nav-items .blog-link:hover {
  color: rgba(255, 255, 255, 0.95);
}

/* Active indicator - dot on the right */
.nav-items a.active {
  color: rgba(255, 255, 255, 1);
  font-weight: 400;
}

.nav-items a.active::after {
  content: '';
  position: absolute;
  right: -16px;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background: linear-gradient(135deg, rgba(143,243,212,0.9), rgba(255,143,182,0.8));
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(143,243,212,0.6);
  animation: pulse-indicator 2s ease-in-out infinite;
}

@keyframes pulse-indicator {
  0%, 100% {
    transform: translateY(-50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateY(-50%) scale(1.2);
    opacity: 0.8;
  }
}

/* Mobile: Hide navigation completely */
@media (max-width: 920px) {
  .nav-bar {
    display: none;
  }
}
</style>
