<template>
  <div class="min-h-screen bg-black text-white flex flex-col">
    <div class="flex-1">
      <header class="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50 border-b border-white/5">
        <div class="flex justify-between items-center p-8">
          <NuxtLink to="/" class="text-xl font-light hover:opacity-75 transition-opacity tracking-wide camiro-font">
            ← Favilances Noir
          </NuxtLink>
          <div class="text-sm font-light tracking-widest opacity-60">
            BLOG
          </div>
        </div>
      </header>

      <main class="pt-36 px-8 pb-20">
        <slot />
      </main>
    </div>

    <footer class="p-8 border-t border-white/5">
      <div class="text-sm text-gray-400 text-center">
        © 2025 noirLang
      </div>
    </footer>
  </div>
</template>
