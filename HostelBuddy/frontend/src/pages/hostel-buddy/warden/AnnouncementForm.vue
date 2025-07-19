<template>
  <Navbar_warden/>
  <div class="dashboard">
    <h1>Announcement Dashboard</h1>

    <div class="dashboard-container">
      <div class="create-announcement">
    <!-- <img    src="/backimgannoun.jpg" alt="background img" class="sidebar-image right" /> -->
        <h2> Create Announcement</h2>

        <label>Title</label>
        <input v-model="title" placeholder="e.g., Important Notice: Water Supply" />

        <label>Description</label>
        <textarea v-model="description" placeholder="Provide detailed information about the announcement..."></textarea>
        <label>Target Audience</label>
        <div class="audience-buttons">
          <button
            v-for="aud in ['All', 'Students', 'Mess Staff']"
            :key="aud"
            :class="{ active: audience === aud }"
            @click="audience = aud"
          >
            {{ aud }}
          </button>
        </div>
         <div class="schedule-section">
          <label>Schedule for later</label>
          <div class="schedule-toggle">
            <label class="toggle-switch">
              <input type="checkbox" v-model="scheduleLater" />
              <span class="slider round"></span>
              <span class="toggle-label"></span>
            </label>
            <input 
              v-if="scheduleLater" 
              type="datetime-local" 
              v-model="scheduleDate"
              class="datetime-picker"
            />
          </div>
        </div>
        

        <div class="action-buttons">
          <button @click="resetForm" class="clear"> Clear</button>
          <button class="post" @click="postAnnouncement"> Post Now</button>
        </div>
      </div>

      <div class="past-announcements">
        <h2>Past Announcements</h2>
        <div v-for="(ann, i) in announcements" :key="i" class="announcement-card">
          <h3>{{ ann.title }}</h3>
          <small>{{ timeAgo(ann.timestamp) }}</small>
          <p>{{ ann.description }}</p>
          <div class="audience-tag">{{ ann.audience }}</div>
          <div class="posted-time">
            <span v-if="ann.scheduleDate"> Scheduled for {{ ann.scheduleDate }}</span>
            <span v-else> Posted Immediately</span>
          </div>
        </div>
      </div>
    </div>
    <div class="preview-section">
  <div class="preview-image">
    <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
             alt="Announcement Preview" 
             class="preview-img" />
  </div>

  <div class="live-preview">
    <h2> Live Preview</h2>
    <div class="preview-card" v-if="latestAnnouncement">
      <h3>{{ latestAnnouncement.title }}</h3>
      <small>{{ timeAgo(latestAnnouncement.timestamp) }}</small>
      <p>{{ latestAnnouncement.description }}</p>
      <div class="audience-tag">{{ latestAnnouncement.audience }}</div>
      <div class="posted-time">
        <span v-if="latestAnnouncement.scheduleDate"> Scheduled for {{ latestAnnouncement.scheduleDate }}</span>
        <span v-else> Posted Immediately</span>
      </div>
    </div>
    <div class="preview-card" v-else>
      <h3>Your Title Here</h3>
      <small>less than a minute ago</small>
      <p>Your detailed description will appear here…</p>
      <div class="audience-tag">All</div>
      <div class="posted-time"> Posted Immediately</div>
    </div>
  </div>
  </div>
</div>
<Footer/>
</template>

<script setup>
import { ref, computed } from 'vue'
import Navbar_warden from '../../../components/Navbar_warden.vue'
import Footer from '../../../components/Footer.vue'


const title = ref('')
const description = ref('')
const audience = ref('All')
const scheduleLater = ref(false)
const scheduleDate = ref('')
const announcements = ref([])

const latestAnnouncement = computed(() =>
  announcements.value.length ? announcements.value[0] : null
);


const postAnnouncement = () => {
  const ann = {
    title: title.value,
    description: description.value,
    audience: audience.value,
    scheduleDate: scheduleLater.value ? scheduleDate.value : '',
    timestamp: new Date(),
  }
  announcements.value.unshift(ann);
  resetForm()
};

const resetForm = () => {
  title.value = ''
  description.value = ''
  audience.value = 'All'
  scheduleLater.value = false
  scheduleDate.value = ''
}

const timeAgo = (time) => {
  const now = new Date()
  const diff = Math.floor((now - new Date(time)) / 60000)
  if (diff < 1) return 'less than a minute ago'
  if (diff === 1) return '1 minute ago'
  if (diff < 60) return `${diff} minutes ago`
  const hours = Math.floor(diff / 60)
  if (hours === 1) return '1 hour ago'
  if (hours < 24) return `${hours} hours ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days > 1 ? 's' : ''} ago`
}
</script>

<style scoped>
.dashboard {
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  
}

h1 {
  font-size: 2rem;
  color: black;
  text-align: center;
}

h2 {
  color: #1BBC9B;
  margin-bottom: 1rem;
}

.dashboard-container {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.create-announcement,
.past-announcements {
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  color: black;
  border-radius: 20px;
  padding: 2.5rem;
  flex: 1;
  min-width: 300px;
}

input,
textarea {
  width: 100%;
  margin: 0.4rem 0 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  color: black;
}

textarea {
  min-height: 80px;
}
.audience-buttons {
  display: flex;
  gap: 0.8rem;
  margin: 0.5rem 0 1.5rem;
  width: 100%;
}
.audience-buttons button {
  flex: 1; 
  padding: 0.7rem 0.5rem;
  background: white;
  border: 1px solid #1BBC9B;
  color: #1BBC9B;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  min-width: 80px; 
  transition: all 0.2s ease;
}

.audience-buttons button:hover {
  background: #e8f9f5;
}

.schedule-section {
  margin-top: 1.5rem; 
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.audience-buttons button.active {
  background: #1BBC9B;
  color: white;
}

.schedule-toggle {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.schedule-toggle input[type='datetime-local'] {
  margin-top: 0.5rem;
  background: white;
  color: black;
}
.toggle-switch {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
}

.toggle-label {
  color: #333;
  font-size: 0.9rem;
}


.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #1BBC9B;
}

input:checked + .slider:before {
  transform: translateX(26px);
}


.datetime-picker {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  color: #333;
  font-family: inherit;
  width: 100%;
  max-width: 300px;
}

.datetime-picker:focus {
  outline: none;
  border-color: #1BBC9B;
  box-shadow: 0 0 0 2px rgba(27, 188, 155, 0.2);
}

.action-buttons {
  margin-top: 1rem;
}
.action-buttons :hover {
  background: #1BBC9B;
  color: white;
}
button.clear {
  background: white;
  color: #1BBC9B;
  border: 1px solid #1BBC9B;
  border-radius: 8px;
  border-color: #1BBC9B;
}

button.post {
  background-color:white;
  color: #1BBC9B;
  border-radius: 8px;
  border-color: #1BBC9B;
  border: 1px solid #1BBC9B;
}


button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  margin-right: 0.5rem;
  cursor: pointer;
}

.preview-section {
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-top: 2rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(5px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.preview-image {
  flex: 1;
  min-width: 300px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.preview-image img {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.preview-image img:hover {
  transform: scale(1.02);
}

.live-preview {
  flex: 1;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
.preview-card {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}





.audience-tag {
  margin-top: 0.5rem;
  display: inline-block;
  padding: 6px 10px;
  background:#1BBC9B;
  color: white;
  border-radius: 6px;
  font-size: 1rem;
  min-width: 80px;
  text-align: center;
  border-color: #1BBC9B;
  border: 1px solid #1BBC9B;
}


.posted-time {
  font-size: 0.75rem;
  margin-top: 0.3rem;
  color: #1BBC9B
}

.sidebar-image {
  max-width: 100%;
  margin-bottom: 1rem;
  border-radius: 8px;
}

.sidebar-image.right {
  float: right;
  margin-left: 1rem;
}

.sidebar-image.left {
  float: left;
  margin-right: 1rem;
}
</style>