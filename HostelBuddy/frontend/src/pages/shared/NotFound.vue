<template>
  <div class="error-page">
    <div class="error-content">
      <div class="error-header">
        <h1>404 – Page Not Found</h1>
        <p>Oops! Looks like you took a wrong turn down the hostel corridor.</p>
      </div>

      <div class="error-illustration">
        <!-- <img src="https://illustrations.popsy.co/amber/confused-humans.svg" alt="Lost in hostel illustration"> -->
      </div>

      <div class="navigation-buttons">
        <button @click="goBack" class="nav-btn back-btn"> Go Back</button>
        <button @click="goHome" class="nav-btn home-btn"> Return to Home</button>
        <button @click="showSiteMap" class="nav-btn sitemap-btn"> View Site Map</button>
      </div>

      <div class="quick-links">
        <h3>Quick Links</h3>
        <div class="links-grid">
          <router-link to="/announcements" class="quick-link"> Announcements</router-link>
          <router-link to="/complaints" class="quick-link"> Submit Complaint</router-link>
          <router-link to="/mess-menu" class="quick-link"> Mess Menu</router-link>
          <router-link to="/room-info" class="quick-link"> Room Info</router-link>
          <router-link to="/profile" class="quick-link"> My Profile</router-link>
        </div>
      </div>

      <div class="error-footer">
        <p class="redirect-timer" v-if="showTimer">
          Automatically redirecting to homepage in {{ countdown }} seconds... 
          <button @click="cancelRedirect" class="cancel-btn">Cancel</button>
        </p>
        <p class="report-issue">
          Think this is a mistake? <router-link to="/support">Report an issue</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const countdown = ref(5)
const showTimer = ref(true)
let timer = null

const goBack = () => {
  router.go('/login')
}

const goHome = () => {
  router.push('/')
}

const showSiteMap = () => {

  router.push('/sitemap')
}

const cancelRedirect = () => {
  showTimer.value = false
  clearInterval(timer)
}

const startCountdown = () => {
  timer = setInterval(() => {
    if (countdown.value > 1) {
      countdown.value--
    } else {
      clearInterval(timer)
      goHome()
    }
  }, 1000)
}

onMounted(() => {
  startCountdown()
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.error-page {
  /* background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
              url('https://c8.alamy.com/comp/T6KGFE/404-error-page-not-found-vector-plug-graphic-background-T6KGFE.jpg'); */
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: white;
}

.error-content {
  max-width: 800px;
  text-align: center;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  backdrop-filter: blur(5px);
  border: 2px solid rgba(15, 13, 13, 0.1);
}

.error-header h1 {
  font-size: 2.5rem;
  color: #1BBC9B;
  margin-bottom: 0.5rem;
}

.error-header p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.error-illustration img {
  max-width: 300px;
  margin: 0 auto 2rem;
}

.navigation-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.nav-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
}

.back-btn {
  background: #1BBC9B;
  color: white;
}

.home-btn {
  background:#1BBC9B;
  color: white
}

.sitemap-btn {
  background: #1BBC9B;
  color: white;
}

.nav-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.quick-links {
  margin-bottom: 2rem;
}

.quick-links h3 {
  margin-bottom: 1rem;
  color: #1BBC9B;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.quick-link {
  display: block;
  padding: 0.75rem;
  background: white;
  border-radius: 8px;
  color: #1BBC9B;
  text-decoration: none;
  transition: all 0.2s;
}

.quick-link:hover {
  background: white;
  transform: translateY(-2px);
}

.error-footer {
  margin-top: 2rem;
}

.redirect-timer {
  margin-bottom: 1rem;
  color: #0b0c0e;
}

.cancel-btn {
  background: transparent;
  border: none;
  color:#1BBC9B;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  margin-left: 0.5rem;
}

.report-issue {
  color: #1BBC9B;
}

.report-issue a {
  color: #000000;
  text-decoration: none;
}

.report-issue a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .navigation-buttons {
    flex-direction: column;
  }
  
  .nav-btn {
    width: 100%;
  }
  
  .links-grid {
    grid-template-columns: 1fr;
  }
}
</style>