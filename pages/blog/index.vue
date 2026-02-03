<template>
  <div class="w-full max-w-4xl mx-auto">
    <div class="blog-page-header">
      <h1 class="blog-page-title">Blog</h1>
      <p class="blog-page-subtitle">Thoughts & articles</p>
    </div>

    <ContentList path="/articles" v-slot="{ list }" :sort="{ date: -1 }">
      <div class="blog-page-grid">
        <article 
          v-for="article in list" 
          :key="article._path"
          class="blog-page-card"
        >
          <div 
            class="blog-page-card-inner"
            @click="toggleArticle(article._path)"
          >
            <div class="blog-page-date">
              {{ formatDate(article.date) }}
            </div>
            <h2 class="blog-page-card-title">{{ article.title }}</h2>
            <p v-if="article.description" class="blog-page-description">
              {{ article.description }}
            </p>
          </div>

          <Transition
            enter-active-class="blog-expand-enter-active"
            enter-from-class="blog-expand-enter-from"
            enter-to-class="blog-expand-enter-to"
            leave-active-class="blog-expand-leave-active"
            leave-from-class="blog-expand-leave-from"
            leave-to-class="blog-expand-leave-to"
          >
            <div 
              v-if="openArticles.includes(article._path)" 
              class="blog-page-expanded"
            >
              <ContentDoc :path="article._path">
                <template #default="{ doc }">
                  <article class="blog-page-content">
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '@vueuse/head'

definePageMeta({
  layout: 'blog'
})

const openArticles = ref<string[]>([])

const toggleArticle = (path: string) => {
  const index = openArticles.value.indexOf(path)
  if (index === -1) {
    openArticles.value.push(path)
  } else {
    openArticles.value = openArticles.value.filter(p => p !== path)
  }
}

const formatDate = (date: string) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('tr-TR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\./g, '-')
}

useHead({
  title: 'favilances - blog',
  titleTemplate: 'favilances - blog',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'description', content: 'favilances - blog' },
    { name: 'keywords', content: 'favilances, blog, teknoloji, yazılım, düşünceler' },
    { name: 'author', content: 'favilances' },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:site_name', content: 'favilances - blog' },
    { property: 'og:title', content: 'favilances - blog' },
    { property: 'og:description', content: 'favilances - blog' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'tr_TR' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@favilances' },
    { name: 'twitter:creator', content: '@favilances' },
    { name: 'twitter:title', content: 'favilances - blog' },
    { name: 'twitter:description', content: 'favilances - blog' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'canonical', href: 'https://favilances.pages.dev/blog' }
  ]
})
</script>

<style scoped>
.blog-page-header {
  text-align: center;
  margin-bottom: 60px;
}

.blog-page-title {
  font-size: 56px;
  font-weight: 300;
  letter-spacing: 4px;
  margin: 0;
  color: rgba(230, 230, 230, 0.95);
  text-transform: uppercase;
}

.blog-page-subtitle {
  font-size: 18px;
  font-weight: 300;
  letter-spacing: 2px;
  margin-top: 12px;
  color: rgba(180, 180, 180, 0.7);
}

.blog-page-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.blog-page-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.blog-page-card:hover {
  border-color: rgba(143, 243, 212, 0.2);
  background: rgba(255, 255, 255, 0.03);
}

.blog-page-card-inner {
  padding: 24px;
  cursor: pointer;
}

.blog-page-date {
  font-size: 13px;
  color: rgba(180, 180, 180, 0.6);
  letter-spacing: 1px;
  margin-bottom: 12px;
  font-weight: 300;
}

.blog-page-card-title {
  font-size: 22px;
  font-weight: 400;
  color: rgba(230, 230, 230, 0.95);
  margin: 0 0 8px 0;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
}

.blog-page-card:hover .blog-page-card-title {
  color: rgba(143, 243, 212, 0.9);
}

.blog-page-description {
  font-size: 15px;
  color: rgba(180, 180, 180, 0.7);
  line-height: 1.6;
  margin: 0;
  font-weight: 300;
}

.blog-page-expanded {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(0, 0, 0, 0.3);
}

.blog-page-content {
  padding: 32px 24px;
  color: rgba(230, 230, 230, 0.9);
  font-size: 15px;
  line-height: 1.8;
  font-weight: 300;
}

.blog-page-content :deep(h1),
.blog-page-content :deep(h2),
.blog-page-content :deep(h3) {
  color: rgba(230, 230, 230, 0.95);
  font-weight: 400;
  margin: 24px 0 16px;
  letter-spacing: 0.5px;
}

.blog-page-content :deep(h1) { font-size: 28px; }
.blog-page-content :deep(h2) { font-size: 24px; }
.blog-page-content :deep(h3) { font-size: 20px; }

.blog-page-content :deep(p) {
  margin: 16px 0;
  line-height: 1.8;
}

.blog-page-content :deep(a) {
  color: rgba(143, 243, 212, 0.9);
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.blog-page-content :deep(a):hover {
  opacity: 0.7;
}

.blog-page-content :deep(code) {
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: rgba(255, 143, 182, 0.9);
}

.blog-page-content :deep(pre) {
  background: rgba(255, 255, 255, 0.03);
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 20px 0;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.blog-page-content :deep(pre code) {
  background: none;
  padding: 0;
  color: rgba(230, 230, 230, 0.9);
}

.blog-expand-enter-active,
.blog-expand-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.blog-expand-enter-from,
.blog-expand-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-20px);
}

.blog-expand-enter-to,
.blog-expand-leave-from {
  opacity: 1;
  max-height: 2000px;
  transform: translateY(0);
}

@media (max-width: 920px) {
  .blog-page-header {
    margin-bottom: 40px;
  }

  .blog-page-title {
    font-size: 36px;
    letter-spacing: 2px;
  }

  .blog-page-subtitle {
    font-size: 16px;
  }

  .blog-page-card-inner {
    padding: 20px;
  }

  .blog-page-card-title {
    font-size: 18px;
  }

  .blog-page-description {
    font-size: 14px;
  }

  .blog-page-content {
    padding: 24px 20px;
    font-size: 14px;
  }
}
</style>
