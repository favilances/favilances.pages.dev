// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-02-03',
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],
  css: [
    '~/assets/css/main.css',
    '~/assets/css/fonts.css'
  ],
  app: {
    head: {
      title: 'Favilances Noir',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'description', content: 'I aim to follow the developments in the field of technology and software and reflect this information to my projects. I enjoy working and generating new ideas. If you would like to contact me, you can reach me at favilances@proton.me' },
        { name: 'keywords', content: 'Favilances Noir, noirLang, pasa' },
        { name: 'author', content: 'Favilances Noir' },
        { property: 'og:title', content: 'Favilances Noir' },
        { property: 'og:description', content: 'I aim to follow the developments in the field of technology and software and reflect this information to my projects. I enjoy working and generating new ideas. If you would like to contact me, you can reach me at favilances@proton.me' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' },
        { rel: 'apple-touch-icon', href: '/logo.png' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  router: {
    options: {
      strict: false
    }
  },
  content: {
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      },
      highlight: {
        theme: 'github-dark'
      }
    }
  }
})
