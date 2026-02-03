<template>
  <div class="loading-fullscreen">
    <!-- Loading ekranı artık sadece boş ekran, direkt ana sayfaya geçiş -->
  </div>
</template>

<script>
export default {
  emits: ['loaded'],
  mounted() {
    // Hemen yüklenmiş olarak işaretle
    setTimeout(() => this.$emit('loaded'), 100)
  }
}
</script>

<style scoped>
.loading-fullscreen {
  display: none;
}
</style>
