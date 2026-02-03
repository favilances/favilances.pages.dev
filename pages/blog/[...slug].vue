<template>
  <div class="w-full max-w-4xl mx-auto">
    <ContentDoc v-if="page" :path="path">
      <template #default="{ doc }">
        <article class="prose dark:prose-invert max-w-none">
          <h1 class="text-3xl font-bold mb-4">{{ doc.title }}</h1>
          <div class="text-sm text-gray-500 dark:text-gray-400 mb-8">
            {{ formatDate(doc.date) }}
          </div>
          <ContentRenderer :value="doc" />
        </article>
      </template>
    </ContentDoc>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'blog'
})

const route = useRoute()
const slug = route.params.slug as string[] || []
const path = `/articles/${slug.join('/')}`

const formatDate = (date: string) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  }).replace(/\./g, '-')
}

// İçeriği yükle
const { data: page, error } = await useAsyncData(`content-${path}`, () => 
  queryContent(path).findOne()
)

// Eğer sayfa bulunamazsa 404 göster
if (error.value || !page.value) {
  throw createError({ 
    statusCode: 404, 
    statusMessage: 'Sayfa Bulunamadı',
    fatal: true
  })
}
</script> 