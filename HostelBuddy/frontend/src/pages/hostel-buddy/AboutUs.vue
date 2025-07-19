<template>
  <div class="about-us" :class="{ 'dark-theme': isDarkTheme }">
    <Navbar />
    
    <div class="top-section">
      <p class="breadcrumb">Hostel Buddy / About Us</p>
      <h1>About <span class="highlight">Us</span></h1>

      <div role="tablist" class="tab-container">
        <button
          role="tab"
          :aria-selected="currentTab === 'why'"
          @click="currentTab = 'why'"
          :class="{ active: currentTab === 'why' }"
        >
          The Why
        </button>
        <button
          role="tab"
          :aria-selected="currentTab === 'what'"
          @click="currentTab = 'what'"
          :class="{ active: currentTab === 'what' }"
        >
          The What
        </button>
        <button
          role="tab"
          :aria-selected="currentTab === 'how'"
          @click="currentTab = 'how'"
          :class="{ active: currentTab === 'how' }"
        >
          The How
        </button>
      </div>

      <!-- THE WHY -->
      <div v-if="currentTab === 'why'" class="content-section">
        <div class="content-row">
          <div class="text-content">
            <h2>We saw hostel life needed a <span class="highlight">change</span></h2>
            <p>
              Traditional hostel management was stuck in paperwork and chaos – lost complaints,
              endless queues for fees, and miscommunication between students and administration.
              We experienced these problems firsthand during our hostel days.
            </p>
          </div>
          <div class="image-content">
            <img 
              loading="lazy" 
              src="https://www.thehivehostels.com/uploads/images/1658301040_7796f3aa4d7819a2f5d5.jpeg" 
              alt="Messy paperwork and disorganized hostel administration" 
            />
          </div>
        </div>

        <div class="content-row reverse">
          <div class="text-content">
            <h2>So we created a <span class="highlight">digital solution</span></h2>
            <p>
              Hostel Buddy was born from countless late-night discussions in common rooms,
              where we imagined how technology could solve these daily frustrations.
              Our mission: transform hostel living through smart digital tools.
            </p>
          </div>
          <div class="image-content">
            <img 
              loading="lazy" 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" 
              alt="Students discussing digital solutions in hostel common room" 
            />
          </div>
        </div>
      </div>

      <!-- THE WHAT -->
      <div v-if="currentTab === 'what'" class="content-section">
        <div class="content-row">
          <div class="text-content">
            <h2>Your complete hostel <span class="highlight">companion</span></h2>
            <p>
              Hostel Buddy consolidates all aspects of hostel life into one platform –
              from room allocation and fee payments to mess management and maintenance requests.
              No more running between different offices.
            </p>
          </div>
          <div class="image-content">
            <img 
              loading="lazy" 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71" 
              alt="Hostel Buddy app interface on mobile device" 
            />
          </div>
        </div>

        <div class="content-row reverse">
          <div class="text-content">
            <h2>Built for <span class="highlight">students</span> and <span class="highlight">administrators</span></h2>
            <p>
              We designed separate interfaces that serve both students and wardens equally well.
              Students get convenience, wardens get better oversight – everyone wins with
              streamlined operations.
            </p>
          </div>
          <div class="image-content">
            <img 
              loading="lazy" 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" 
              alt="Team collaborating on hostel management solution" 
            />
          </div>
        </div>
      </div>

      <!-- THE HOW -->
      <div v-if="currentTab === 'how'" class="content-section">
        <div class="content-row">
          <div class="text-content">
            <h2><span class="highlight">Technology</span> meets real needs</h2>
            <p>
              Our platform combines cloud infrastructure with mobile-first design,
              ensuring reliability and accessibility. We use student feedback loops to
              continuously improve features based on actual hostel experiences.
            </p>
          </div>
          <div class="image-content">
            <img 
              loading="lazy" 
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643" 
              alt="Developers working on Hostel Buddy platform" 
            />
          </div>
        </div>

        <div class="content-row reverse">
          <div class="text-content">
            <h2>Built by <span class="highlight">hostelers</span>, for <span class="highlight">hostelers</span></h2>
            <p>
              Every feature goes through testing with real students and wardens before launch.
              We maintain regular feedback sessions to ensure Hostel Buddy evolves with
              changing needs in hostel communities.
            </p>
          </div>
          <div class="image-content">
            <img 
              loading="lazy" 
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216" 
              alt="Team meeting to discuss hostel management improvements" 
            />
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const currentTab = ref('why')
const isDarkTheme = ref(false)

onMounted(() => {
  // Check initial theme
  const savedTheme = localStorage.getItem('darkTheme')
  if (savedTheme) {
    isDarkTheme.value = savedTheme === 'dark'
  }
  
  const handleThemeChange = (event) => {
    isDarkTheme.value = event.detail.isDark
  }
  
  window.addEventListener('themeChanged', handleThemeChange)
  
  // Clean up event listener
  onUnmounted(() => {
    window.removeEventListener('themeChanged', handleThemeChange)
  })
})
</script>

<style scoped>
.about-us {
  font-family: 'Segoe UI', sans-serif;
  --text-color: #555;
  --heading-color: #333;
  --bg-color: #ffffff;
  --secondary-bg: #f0fdfc;
  --tab-bg: #ffffff;
  --tab-color: #666;
  --active-tab-color: #44d4c5;
  --breadcrumb-color: #888;
  --image-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  color: var(--text-color);
  background-color: var(--bg-color);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Dark theme variables */
.about-us.dark-theme {
  --text-color: #e0e0e0;
  --heading-color: #ffffff;
  --bg-color: #1A1C2D;
  --secondary-bg: #2E3047;
  --tab-bg: #2E3047;
  --tab-color: #aaa;
  --active-tab-color: #44d4c5;
  --breadcrumb-color: #aaa;
  --image-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.top-section {
  padding: 3rem 2rem;
  background: linear-gradient(
    to bottom,
    var(--secondary-bg) 0%,
    var(--bg-color) 50%,
    var(--secondary-bg) 100%
  );
  position: relative;
  flex: 1;
}

.breadcrumb {
  font-size: 0.9rem;
  color: var(--breadcrumb-color);
  margin-bottom: 0.5rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--heading-color);
}

h2 {
  color: var(--heading-color);
}

.highlight {
  color: var(--active-tab-color);
}

/* Tabs */
.tab-container {
  display: flex;
  background: var(--tab-bg);
  border-radius: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: max-content;
  margin: 1rem 0 2rem;
}

.tab-container button {
  padding: 0.8rem 2rem;
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: var(--tab-color);
  transition: all 0.3s ease;
  position: relative;
}

.tab-container button:focus {
  outline: 2px solid var(--active-tab-color);
  outline-offset: 2px;
}

.tab-container .active {
  color: var(--active-tab-color);
  font-weight: bold;
}

.tab-container .active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 3px;
  background-color: var(--active-tab-color);
}

/* Content sections */
.content-section {
  margin-top: 2rem;
}

.content-row {
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-bottom: 3rem;
}

.content-row.reverse {
  flex-direction: row-reverse;
}

.text-content {
  flex: 1;
  min-width: 300px;
}

.text-content h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.text-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-color);
}

.image-content {
  flex: 1;
  min-width: 300px;
}

.image-content img {
  width: 85%;
  border-radius: 1rem;
  box-shadow: var(--image-shadow);
  max-height: 350px;
  object-fit: cover;
  margin-left: 20px;
  transition: transform 0.3s ease;
}

/* Hover effects only on devices that support hover */
@media (hover: hover) {
  .image-content img:hover {
    transform: scale(1.05);
  }
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .content-row,
  .content-row.reverse {
    gap: 2rem;
  }
  
  .image-content img {
    width: 90%;
    margin-left: 0;
  }
}

@media (max-width: 768px) {
  .top-section {
    padding: 2rem 1rem;
  }
  
  .content-row,
  .content-row.reverse {
    flex-direction: column;
  }

  .text-content,
  .image-content {
    width: 100%;
  }
  
  .tab-container {
    width: 100%;
    justify-content: center;
  }
  
  .tab-container button {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  .tab-container {
    border-radius: 0.5rem;
  }
  
  .tab-container button {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
}
</style>