<template>
  <div class="student-dashboard">
    <!-- Fixed Header -->
    <header class="dashboard-header">
      <h1>Student Dashboard</h1>
      <div class="profile-dropdown">
        <button class="profile-btn" @click="toggleProfileDropdown">
          <i class="fas fa-user-circle"></i>
          <span>Student</span>
          <i class="fas fa-caret-down"></i>
        </button>
        <div v-if="showDropdown" class="dropdown-content">
          <router-link to="/student-profile" @click="showDropdown = false">
            <i class="fas fa-user"></i> My Profile
          </router-link>
          <a href="#" @click.prevent="logout">
            <i class="fas fa-sign-out-alt"></i> Logout
          </a>
        </div>
      </div>
    </header>

    <!-- Scrollable Content -->
    <main class="dashboard-content">
      <!-- Key Metrics -->
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-content">
            <h3>Room No</h3>
            <p class="metric-value">B-205</p>
            <p class="metric-change">
              <i class="fas fa-bed"></i> Shared (2 students)
            </p>
          </div>
          <div class="metric-icon">
            <i class="fas fa-home"></i>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-content">
            <h3>Fee Status</h3>
            <p class="metric-value">Paid</p>
            <p class="metric-change">
              <i class="fas fa-calendar-check"></i> Next due: 10 Aug
            </p>
          </div>
          <div class="metric-icon">
            <i class="fas fa-rupee-sign"></i>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-content">
            <h3>Meals This Week</h3>
            <p class="metric-value">21/21</p>
            <p class="metric-change">
              <i class="fas fa-utensils"></i> 100% attendance
            </p>
          </div>
          <div class="metric-icon">
            <i class="fas fa-utensils"></i>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-content">
            <h3>Pending Leaves</h3>
            <p class="metric-value">2</p>
            <p class="metric-change">
              <i class="fas fa-clock"></i> 1 approved, 1 pending
            </p>
          </div>
          <div class="metric-icon">
            <i class="fas fa-calendar-alt"></i>
          </div>
        </div>
      </div>

      <!-- Recent Notices Section -->
      <div class="dashboard-section">
        <h2>Recent Notices</h2>
        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-icon announcement">
              <i class="fas fa-bullhorn"></i>
            </div>
            <div class="activity-content">
              <p>Water supply will be interrupted tomorrow from 9AM to 5PM for maintenance</p>
              <span class="activity-time">2 hours ago</span>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-icon event">
              <i class="fas fa-calendar"></i>
            </div>
            <div class="activity-content">
              <p>Hostel cultural fest registrations open until Friday</p>
              <span class="activity-time">1 day ago</span>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-icon notice">
              <i class="fas fa-exclamation-circle"></i>
            </div>
            <div class="activity-content">
              <p>New WiFi password available at admin office</p>
              <span class="activity-time">3 days ago</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Access Sections -->
      <div class="quick-access-grid">
        <!-- Row 1 -->
        <div class="quick-access-card" @click="$router.push('/payments')">
          <h3><i class="fas fa-rupee-sign"></i> Pay Fee</h3>
          <p>Make hostel fee payments online</p>
          <button class="access-btn">
            Pay Now <i class="fas fa-arrow-right"></i>
          </button>
        </div>

        <div class="quick-access-card" @click="$router.push('/apply')">
          <h3><i class="fas fa-bed"></i> Apply for Room</h3>
          <p>Submit new room allocation request</p>
          <button class="access-btn">
            Apply <i class="fas fa-arrow-right"></i>
          </button>
        </div>

        <div class="quick-access-card" @click="$router.push('/change-request')">
          <h3><i class="fas fa-exchange-alt"></i> Change Room</h3>
          <p>Request for room change</p>
          <button class="access-btn">
            Request <i class="fas fa-arrow-right"></i>
          </button>
        </div>

        <!-- Row 2 -->
        <div class="quick-access-card" @click="$router.push('/complaints')">
          <h3><i class="fas fa-tools"></i> Raise Issue</h3>
          <p>Report maintenance or other issues</p>
          <button class="access-btn">
            Report <i class="fas fa-arrow-right"></i>
          </button>
        </div>

        <div class="quick-access-card" @click="$router.push('/cancel-meal')">
          <h3><i class="fas fa-book"></i> Cancel Meal</h3>
          <p>Request to cancel meal</p>
          <button class="access-btn">
            Request <i class="fas fa-arrow-right"></i>
          </button>
        </div>

        <div class="quick-access-card" @click="$router.push('/apply-leave')">
          <h3><i class="fas fa-calendar-minus"></i> Apply Leave</h3>
          <p>Apply for hostel leave</p>
          <button class="access-btn">
            Apply <i class="fas fa-arrow-right"></i>
          </button>
        </div>

        <!-- Row 3 -->
        <div class="quick-access-card" @click="$router.push('/menu')">
          <h3><i class="fas fa-utensils"></i> Check Menu</h3>
          <p>View weekly mess menu</p>
          <button class="access-btn">
            View <i class="fas fa-arrow-right"></i>
          </button>
        </div>

        <div class="quick-access-card" @click="$router.push('/feedback')">
          <h3><i class="fas fa-comment-alt"></i> Meal Feedback</h3>
          <p>Provide feedback on meals</p>
          <button class="access-btn">
            Submit <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </main>

    <!-- Fixed Footer -->
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
export default {
  name: 'StudentDashboard',
  components: {
    Footer
  },
  data() {
    return {
      showDropdown: false
    }
  },
  methods: {
    toggleProfileDropdown() {
      this.showDropdown = !this.showDropdown
    },
    logout() {
      console.log("Logging out...")
      this.showDropdown = false
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.student-dashboard {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  min-height: 100vh;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #1BBC9B, #16a085);
  color: white;
  height: 100px;
}

.dashboard-header h1 {
  margin: 0;
  font-size: 1.8rem;
}

/* Scrollable Content Styles */
.dashboard-content {
  flex: 1;
  margin-top: 0px; /* Height of header */
  margin-bottom: 60px; /* Height of footer */
  padding: 1.5rem;
  overflow-y: auto;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.metric-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  border-top: 4px solid #1BBC9B;
}

.metric-content {
  flex: 1;
}

.metric-value {
  font-size: 2.2rem;
  font-weight: 600;
  margin: 0.5rem 0;
  color: #1BBC9B;
}

.metric-change {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.metric-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  color: #1BBC9B;
  font-size: 1.8rem;
}

.dashboard-section {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.dashboard-section h2 {
  margin-top: 0;
  color: #1BBC9B;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.75rem;
}

.activity-list {
  margin-top: 1rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f5f5f5;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.activity-icon.announcement {
  background: #fff3e0;
  color: #e65100;
}

.activity-icon.event {
  background: #e3f2fd;
  color: #1976d2;
}

.activity-icon.notice {
  background: #e8f5e9;
  color: #2e7d32;
}

.activity-content {
  flex: 1;
}

.activity-content p {
  margin: 0 0 0.25rem 0;
}

.activity-time {
  font-size: 0.8rem;
  color: #777;
}

.quick-access-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.quick-access-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 1.5rem;
  border-top: 4px solid #1BBC9B;
  cursor: pointer;
  transition: transform 0.2s;
}

.quick-access-card:hover {
  transform: translateY(-5px);
}

.quick-access-card h3 {
  margin-top: 0;
  color: #1BBC9B;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quick-access-card p {
  color: #666;
  margin-bottom: 1.5rem;
}

.access-btn {
  background: #1BBC9B;
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  transition: background 0.2s;
}

.access-btn:hover {
  background: #16a085;
}

/* Profile Dropdown */
.profile-dropdown {
  position: relative;
  display: inline-block;
}

.profile-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  transition: background 0.2s;
}

.profile-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.profile-btn i {
  font-size: 1.2rem;
}

.dropdown-content {
  position: absolute;
  right: 0;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 4px;
  overflow: hidden;
}

.dropdown-content a {
  color: #333;
  padding: 0.75rem 1rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
}

.dropdown-content a:hover {
  background-color: #f5f5f5;
  color: #1BBC9B;
}

.dropdown-content i {
  width: 20px;
  text-align: center;
}

@media (max-width: 768px) {
  .dashboard-header {
    padding: 1rem;
  }
  
  .dashboard-content {
    margin-top: 60px;
    padding: 1rem;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  
  .quick-access-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  
  .quick-access-grid {
    grid-template-columns: 1fr;
  }
  
  .dashboard-header h1 {
    font-size: 1.3rem;
  }
  
  .profile-btn span {
    display: none;
  }
  
  .profile-btn i.fa-caret-down {
    display: none;
  }
}
</style>