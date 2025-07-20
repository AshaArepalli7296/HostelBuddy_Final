<template>
  <div class="announcements-page">
    <Navbar_warden />
    <main>
      <section class="announcements-header">
        <div class="header-top">
          <div>
            <h1>Announcements</h1>
            <p>Important notices from your hostel administration</p>
          </div>
          <router-link to="/announcement-form" class="publish-btn">
            <i class="fas fa-plus-circle"></i> Publish Announcement
          </router-link>
        </div>
      </section>


      <div class="announcements-container">
        <!-- Filter Controls -->
        <div class="filter-controls">
          <div class="filter-group">
            <label>Filter by:</label>
            <select v-model="filterCategory" class="filter-select">
              <option value="all">All Announcements</option>
              <option value="general">General</option>
              <option value="maintenance">Maintenance</option>
              <option value="events">Events</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
          <div class="search-box">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search announcements..."
              class="search-input"
            >
            <i class="fas fa-search"></i>
          </div>
        </div>

        <!-- Announcements List -->
        <div class="announcements-list">
          <div 
            v-for="announcement in filteredAnnouncements" 
            :key="announcement.id"
            class="announcement-card"
            :class="announcement.category"
          >
            <div class="announcement-header">
              <span class="category-badge">{{ announcement.category }}</span>
              <span class="date">{{ announcement.date }}</span>
            </div>
            <h3 class="title">{{ announcement.title }}</h3>
            <p class="content">{{ announcement.content }}</p>
            <div class="announcement-footer">
              <span class="author">Posted by: {{ announcement.author }}</span>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredAnnouncements.length === 0" class="empty-state">
          <i class="fas fa-bell-slash"></i>
          <p>No announcements found</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>

import Footer from '@/components/Footer.vue'
import Navbar_warden from '../../../components/Navbar_warden.vue'

export default {
  name: 'Announcements',
  components: {
    Navbar_warden,
    Footer
  },
  data() {
    return {
      filterCategory: 'all',
      searchQuery: '',
      announcements: [
        {
          id: 1,
          title: "Water Supply Interruption",
          content: "There will be no water supply from 9 AM to 5 PM on 25th October for maintenance work. Please store water accordingly.",
          category: "maintenance",
          date: "23 Oct 2023",
          author: "Warden (Mr. Kishore Raju)",
          attachment: "water-cut-notice.pdf"
        },
        {
          id: 2,
          title: "Hostel Cultural Fest",
          content: "Annual hostel cultural fest will be held on 30th October. Registrations open at the admin office.",
          category: "events",
          date: "20 Oct 2023",
          author: "Cultural Committee",
          attachment: null
        },
        {
          id: 3,
          title: "New WiFi Password",
          content: "The hostel WiFi password has been changed. Collect the new password from your floor representatives.",
          category: "general",
          date: "18 Oct 2023",
          author: "Care Taker Committee",
          attachment: null
        },
        {
          id: 4,
          title: "Fire Drill Announcement",
          content: "Mandatory fire drill will be conducted tomorrow at 10 AM. All students must participate.",
          category: "emergency",
          date: "15 Oct 2023",
          author: "Warden (Mr. Kishore Raju)",
          attachment: "fire-drill-guidelines.pdf"
        }
      ]
    }
  },
  computed: {
    filteredAnnouncements() {
      return this.announcements.filter(ann => {
        const matchesCategory = this.filterCategory === 'all' || 
                              ann.category === this.filterCategory
        const matchesSearch = ann.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                            ann.content.toLowerCase().includes(this.searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
      }).sort((a, b) => new Date(b.date) - new Date(a.date))
    }
  },
  methods: {
    downloadAttachment(announcement) {
      // Implement download functionality
      console.log("Downloading:", announcement.attachment)
      // In a real app, this would link to your file storage
    }
  }
}
</script>

<style scoped>
.header-top {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}

.publish-btn {
  background: #fff;
  color: #1BBC9B;
  border: 2px solid #1BBC9B;
  padding: 0.6rem 1.2rem;
  font-size: 0.95rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.publish-btn:hover {
  background: #1BBC9B;
  color: #fff;
}

.announcements-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.announcements-header {
  text-align: center;
  padding: 2rem 1rem;
  background: white;
  color: #1BBC9B;
}

.announcements-header h1 {
  margin: 0;
  font-size: 2.2rem;
}

.announcements-header p {
  margin: 0.5rem 0 0;
  opacity: 0.9;
}

.announcements-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
  flex: 1;
}

.filter-controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  padding: 0.5rem 2rem 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 250px;
}

.search-box i {
  position: absolute;
  right: 1rem;
  color: #777;
}

.announcements-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.announcement-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1.5rem;
  border-left: 4px solid #1BBC9B;
}

.announcement-card.general {
  border-left-color: #1BBC9B;
}
.announcement-card.maintenance {
  border-left-color: #3498db;
}
.announcement-card.events {
  border-left-color: #9b59b6;
}
.announcement-card.emergency {
  border-left-color: #e74c3c;
}

.announcement-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.category-badge {
  background: #f5f5f5;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  text-transform: capitalize;
}

.announcement-card.general .category-badge {
  background: #e0f7f4;
  color: #1BBC9B;
}
.announcement-card.maintenance .category-badge {
  background: #e3f2fd;
  color: #3498db;
}
.announcement-card.events .category-badge {
  background: #f3e5f5;
  color: #9b59b6;
}
.announcement-card.emergency .category-badge {
  background: #ffebee;
  color: #e74c3c;
}

.date {
  color: #777;
}

.title {
  margin: 0.5rem 0;
  color: #222;
}

.content {
  margin: 0.5rem 0 1rem;
  line-height: 1.6;
  color: #555;
}

.announcement-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.author {
  color: #777;
  font-style: italic;
}

.download-btn {
  background: #1BBC9B;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.download-btn:hover {
  background: #16a085;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #777;
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

@media (max-width: 768px) {
  .filter-controls {
    flex-direction: column;
  }
  
  .search-input {
    width: 100%;
  }
  
  .announcement-header {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .announcement-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .download-btn {
    align-self: flex-end;
  }
}
</style>