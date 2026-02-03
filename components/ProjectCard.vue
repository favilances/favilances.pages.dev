<template>
  <div class="card" @click="$emit('open', repo)">
    <div class="card-header">
      <h3>{{ repo.name }}</h3>
      <div class="stars">
        <span class="star-icon">★</span>
        <span>{{ repo.stargazers_count }}</span>
      </div>
    </div>
    <p class="description">{{ repo.description || 'No description available' }}</p>
    <div class="card-footer">
      <span v-if="repo.language" class="language">{{ repo.language }}</span>
      <span class="updated">Updated {{ formatDate(repo.updated_at) }}</span>
    </div>
  </div>
</template>

<script>
export default { 
  name: 'ProjectCard', 
  props: { repo: Object },
  methods: {
    formatDate(date) {
      const d = new Date(date)
      const now = new Date()
      const diff = Math.floor((now - d) / (1000 * 60 * 60 * 24))
      if (diff === 0) return 'today'
      if (diff === 1) return 'yesterday'
      if (diff < 30) return `${diff} days ago`
      if (diff < 365) return `${Math.floor(diff/30)} months ago`
      return `${Math.floor(diff/365)} years ago`
    }
  }
}
</script>

<style scoped>
.card{
  background:rgba(255,255,255,0.02);
  border:1px solid rgba(255,255,255,0.06);
  padding:24px;
  border-radius:12px;
  backdrop-filter:blur(4px);
  cursor:pointer;
  transition:all .3s cubic-bezier(0.4, 0, 0.2, 1);
  position:relative;
  overflow:hidden;
}
.card::before{
  content:'';
  position:absolute;
  top:0;
  left:0;
  right:0;
  height:2px;
  background:linear-gradient(90deg, rgba(143,243,212,0.6), rgba(255,143,182,0.6));
  opacity:0;
  transition:opacity .3s;
}
.card:hover{
  background:rgba(255,255,255,0.04);
  border-color:rgba(255,255,255,0.12);
  transform:translateY(-4px);
  box-shadow:0 8px 32px rgba(0,0,0,0.3);
}
.card:hover::before{
  opacity:1;
}

.card-header{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:12px;
  margin-bottom:12px;
}
.card-header h3{
  font-size:18px;
  font-weight:500;
  margin:0;
  letter-spacing:0.5px;
  flex:1;
}
.stars{
  display:flex;
  align-items:center;
  gap:4px;
  font-size:13px;
  opacity:.7;
  white-space:nowrap;
}
.star-icon{
  color:rgba(255,215,0,0.8);
}

.description{
  font-size:14px;
  line-height:1.6;
  opacity:.75;
  margin:0 0 16px 0;
  min-height:40px;
}

.card-footer{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:12px;
  font-size:12px;
  opacity:.6;
  padding-top:12px;
  border-top:1px solid rgba(255,255,255,0.04);
  flex-wrap:wrap;
}
.language{
  font-weight:500;
  color:rgba(143,243,212,0.9);
}
.updated{
  font-size:11px;
}

@media (max-width: 920px) {
  .card {
    padding: 20px;
  }
  .card-header h3 {
    font-size: 17px;
  }
  .description {
    font-size: 13px;
    min-height: 35px;
    margin: 0 0 12px 0;
  }
  .card-footer {
    font-size: 11px;
    padding-top: 10px;
  }
}
</style>
