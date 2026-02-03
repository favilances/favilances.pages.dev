<template>
  <div id="app">
    <Loading v-if="loading" @loaded="onLoaded" />
    <div v-else>
      <div class="site-wrap">
        <NavBar />
        <slot />
      </div>
      <footer class="site-footer" ref="footer" :class="{ 'footer-visible': footerVisible }">
        <div class="footer-mist"></div>
        
        <div class="footer-content">
          <div class="footer-left">
            <h2 class="footer-title">Favilances Noir</h2>
            <div class="copy">© 2025 noirLang</div>
          </div>
          
          <button class="scroll-top" @click="scrollTop" title="Back to top">
            <span class="arrow">↑</span>
          </button>
          
          <nav class="footer-links">
            <a href="https://x.com/favilances" target="_blank">X</a>
            <a href="https://instagram.com/favilances" target="_blank">Instagram</a>
            <a href="https://youtube.com/@favilances" target="_blank">YouTube</a>
            <a href="https://github.com/favilances" target="_blank">GitHub</a>
            <a href="mailto:favilances@proton.me">Email</a>
          </nav>
        </div>
        
        <div class="made-with">Made with <span class="heart">♥</span> Vue</div>
      </footer>
    </div>
  </div>
</template>

<script setup>
const loading = ref(true)
const footerVisible = ref(false)
const footer = ref(null)

function onLoaded() {
  loading.value = false
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  setTimeout(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            footerVisible.value = true
          }
        })
      },
      { threshold: 0.1 }
    )
    
    if (footer.value) {
      observer.observe(footer.value)
    }
  }, 500)
})
</script>

<style>
.site-wrap {
  min-height: 100vh;
  color: #eaeaea;
}

.site-footer {
  position: relative;
  padding: 60px 48px 24px;
  background: #050507;
  overflow: hidden;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1s ease, transform 1s ease;
}

.site-footer.footer-visible {
  opacity: 1;
  transform: translateY(0);
}
.footer-mist{
  position: absolute;
  inset: 0;
  z-index: 0;
  background: radial-gradient(500px 300px at 20% 50%, rgba(143,243,212,0.04), transparent 20%),
              radial-gradient(500px 400px at 80% 50%, rgba(255,143,182,0.03), transparent 25%),
              linear-gradient(180deg, #000 10%, rgba(255,255,255,0.01) 70%);
  filter: blur(20px);
  animation: footerDrift 20s ease-in-out infinite alternate;
}
@keyframes footerDrift{
  0%{transform: translate3d(-8px,-4px,0) scale(1)}
  50%{transform: translate3d(10px,6px,0) scale(1.01)}
  100%{transform: translate3d(-8px,10px,0) scale(1)}
}

.footer-content {
  position: relative;
  z-index: 5;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: start;
  gap: 32px;
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 20px;
}

.footer-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.footer-title {
  font-size: 48px;
  font-weight: 300;
  letter-spacing: 0.01em;
  margin: 0;
  line-height: 1.2;
  color: rgba(180, 180, 180, 1);
  font-family: 'Camiro', sans-serif;
  mix-blend-mode: screen;
  filter: brightness(1.1);
}
.copy {
  font-size: 13px;
  font-weight: 300;
  opacity: 0.5;
  letter-spacing: 0.5px;
}

.scroll-top {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.8);
  padding: 16px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 24px;
  transition: all .3s;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  margin: 0 auto;
}
.scroll-top:hover {
  background: rgba(255,255,255,0.06);
  border-color: rgba(143,243,212,0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(143,243,212,0.1);
}
.arrow {
  display: block;
  font-weight: bold;
}

.footer-links {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
  justify-self: end;
}
.footer-links a {
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  font-size: 15px;
  font-weight: 300;
  letter-spacing: 1px;
  transition: all .3s;
  position: relative;
  text-align: right;
}
.footer-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, rgba(143,243,212,0.6), rgba(255,143,182,0.6));
  transform: scaleX(0);
  transform-origin: right;
  transition: transform .3s;
}
.footer-links a:hover {
  color: #fff;
}
.footer-links a:hover::after {
  transform: scaleX(1);
}

.made-with {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 12px;
  font-size: 12px;
  font-weight: 300;
  opacity: 0.5;
  letter-spacing: 1px;
  z-index: 10;
}
.heart {
  color: rgba(255,143,182,0.8);
  display: inline-block;
  animation: heartbeat 2s ease-in-out infinite;
}
@keyframes heartbeat{
  0%, 100%{transform: scale(1)}
  10%, 30%{transform: scale(1.1)}
  20%, 40%{transform: scale(1)}
}

@media (max-width: 920px){
  .site-footer {
    padding: 40px 24px 20px;
  }
  .footer-content{
    grid-template-columns: 1fr;
    gap: 24px;
    text-align: center;
  }
  .footer-left{
    align-items: center;
  }
  .footer-title {
    font-size: 36px;
  }
  .scroll-top {
    padding: 12px 16px;
    font-size: 20px;
  }
  .footer-links{
    align-items: center;
    justify-self: center;
    gap: 12px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  .footer-links a {
    font-size: 13px;
    letter-spacing: 0.5px;
  }
  .made-with {
    font-size: 11px;
    bottom: 8px;
  }
}
</style>
