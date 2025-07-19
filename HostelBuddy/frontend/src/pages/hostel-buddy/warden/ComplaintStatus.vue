<template>
  <div class="complaint-status">
    <Navbar_warden />
    <main>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <h1>Complaint Status</h1>
          <p>Track your complaint progress</p>
        </div>

        <!-- Complaint Card -->
        <div class="complaint-card">
          <div class="complaint-meta">
            <span class="badge">ID: #HB-{{ complaint.id }}</span>
            <span class="badge">{{ complaint.date }}</span>
            <span class="badge">{{ complaint.category }}</span>
          </div>

          <h2>{{ complaint.title }}</h2>
          <p class="description">{{ complaint.description }}</p>

          <!-- Status Timeline -->
          <StatusTimeline 
            :steps="statusSteps" 
            :currentStatus="complaint.status" 
          />

          <!-- Images -->
          <div class="images" v-if="complaint.images.length">
            <img 
              v-for="(img, index) in complaint.images" 
              :key="index" 
              :src="img" 
              @click="openImage(img)"
            >
          </div>
        </div>

        <!-- Updates Section -->
        <div class="updates">
          <h3>Updates</h3>
          <div class="update-list">
            <div v-for="(update, index) in updates" :key="index" class="update">
              <div class="update-header">
                <strong>{{ update.author }}</strong>
                <span>{{ update.date }}</span>
              </div>
              <p>{{ update.text }}</p>
            </div>
          </div>

          <!-- Add Comment -->
          <div class="add-comment">
            <textarea v-model="newComment" placeholder="Add an update..."></textarea>
            <button @click="addComment">Submit</button>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>

import Footer from '@/components/Footer.vue'
import StatusTimeline from './StatusTimeline.vue'
import Navbar_warden from '../../../components/Navbar_warden.vue'

export default {
  name: 'ComplaintStatus',
  components: { Navbar_warden, Footer, StatusTimeline },
  data() {
    return {
      complaint: {
        id: 2048,
        title: "Fan problem in Room 205",
        description: "Ceiling fan not working properly, making a loud noise.",
        category: "Electrical Issue",
        date: "15 Oct 2023",
        status: "In Progress",
        images: [
          "src/assets/images/fan-issue.jpg",
          "src/assets/images/fan-repair.jpg"
        ]
      },
      statusSteps: [
        { id: 1, name: "Submitted", description: "Complaint received" },
        { id: 2, name: "Under Review", description: "Warden reviewing" },
        { id: 3, name: "In Progress", description: "Maintenance assigned" },
        { id: 4, name: "Resolved", description: "Issue resolved" }
      ],
      updates: [
        {
          author: "Warden (Mr. Kishore Raju)",
          date: "16 Oct 2023, 10:30 AM",
          text: "Maintenance team notified. They will visit today afternoon."
        },
        {
          author: "Maintenance Team",
          date: "16 Oct 2023, 3:15 PM",
          text: "Technician dispatched to Room 205. Fan issue will be resolved shortly."
        }
      ],
      newComment: ""
    }
  },
  methods: {
    addComment() {
      if (this.newComment.trim()) {
        this.updates.push({
          author: "You",
          date: new Date().toLocaleDateString(),
          text: this.newComment
        })
        this.newComment = ""
      }
    },
    openImage(img) {
      // Implement image viewer
      console.log("Viewing image:", img)
    }
  }
}
</script>

<style scoped>
.complaint-status {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #1BBC9B, #16a085);
  color: white;
  border-radius: 8px;
}

.header h1 {
  margin: 0;
  font-size: 2.2rem;
}

.header p {
  margin: 5px 0 0;
  opacity: 0.9;
}

.complaint-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.complaint-meta {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.badge {
  background: #f5f5f5;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.description {
  line-height: 1.6;
  margin-bottom: 20px;
}

.images {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.images img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s;
}

.images img:hover {
  transform: scale(1.05);
}

.updates {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 20px;
}

.update-list {
  margin: 20px 0;
}

.update {
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.update-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.update-header strong {
  color: #1BBC9B;
}

.update-header span {
  color: #777;
  font-size: 0.9rem;
}

.add-comment textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 80px;
  margin-bottom: 10px;
  font-family: inherit;
}

.add-comment button {
  background: #1BBC9B;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.add-comment button:hover {
  background: #16a085;
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
  
  .header h1 {
    font-size: 1.8rem;
  }
}
</style>