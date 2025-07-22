<template>
  <div class="student-dashboard">
    <!-- Fixed Header -->
    <header class="dashboard-header">
      <div class="header-left">
        <h1>Student Dashboard</h1>
      </div>
      <div class="header-right">
        <div class="profile-dropdown">
          <button class="profile-btn" @click="toggleProfileDropdown">
            <i class="fas fa-user-circle"></i>
            <span>Student</span>
            <i class="fas fa-caret-down"></i>
          </button>
          <div v-if="showDropdown" class="dropdown-content">
            <router-link to="/student-profile" @click="showDropdown = false">
              My Profile
            </router-link>
            <a href="#" @click.prevent="logout">
              Logout
            </a>
          </div>
        </div>
        <button class="hamburger-btn" @click="toggleMobileMenu">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </header>

    <!-- Mobile Menu Overlay -->
    <div v-if="showMobileMenu" class="mobile-menu-overlay" @click="toggleMobileMenu">
      <div class="mobile-menu-content" @click.stop>
        <div class="mobile-menu-header">
          <h3>Quick Actions</h3>
          <button class="close-btn" @click="toggleMobileMenu">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="mobile-menu-items">
          <div class="mobile-menu-item" @click="navigateTo('/payments')">
            <i class="fas fa-rupee-sign"></i>
            <span>Pay Fee</span>
          </div>
          <div class="mobile-menu-item" @click="navigateTo('/apply')">
            <i class="fas fa-bed"></i>
            <span>Apply for Room</span>
          </div>
          <div class="mobile-menu-item" @click="navigateTo('/change-request')">
            <i class="fas fa-exchange-alt"></i>
            <span>Change Room</span>
          </div>
          <div class="mobile-menu-item" @click="navigateTo('/complaints')">
            <i class="fas fa-tools"></i>
            <span>Raise Issue</span>
          </div>
          <div class="mobile-menu-item" @click="navigateTo('/cancel-meal')">
            <i class="fas fa-book"></i>
            <span>Cancel Meal</span>
          </div>
          <div class="mobile-menu-item" @click="navigateTo('/apply-leave')">
            <i class="fas fa-calendar-minus"></i>
            <span>Apply Leave</span>
          </div>
          <div class="mobile-menu-item" @click="navigateTo('/menu')">
            <i class="fas fa-utensils"></i>
            <span>Check Menu</span>
          </div>
          <div class="mobile-menu-item" @click="navigateTo('/feedback')">
            <i class="fas fa-comment-alt"></i>
            <span>Meal Feedback</span>
          </div>
        </div>
      </div>
    </div>

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

      <!-- Quick Access Cards -->
      <div class="dashboard-section">
        <h2>Quick Actions</h2>
        <div class="quick-access-grid">
          <div class="quick-access-card" @click="navigateTo('/payments')">
            <i class="fas fa-rupee-sign"></i>
            <h3>Pay Fee</h3>
            <p>Make hostel fee payments</p>
          </div>
          <div class="quick-access-card" @click="navigateTo('/apply')">
            <i class="fas fa-bed"></i>
            <h3>Apply for Room</h3>
            <p>Submit room allocation request</p>
          </div>
          <div class="quick-access-card" @click="navigateTo('/change-request')">
            <i class="fas fa-exchange-alt"></i>
            <h3>Change Room</h3>
            <p>Request for room change</p>
          </div>
          <div class="quick-access-card" @click="navigateTo('/complaints')">
            <i class="fas fa-tools"></i>
            <h3>Raise Issue</h3>
            <p>Report maintenance issues</p>
          </div>
          <div class="quick-access-card" @click="navigateTo('/cancel-meal')">
            <i class="fas fa-book"></i>
            <h3>Cancel Meal</h3>
            <p>Request to cancel meal</p>
          </div>
          <div class="quick-access-card" @click="navigateTo('/apply-leave')">
            <i class="fas fa-calendar-minus"></i>
            <h3>Apply Leave</h3>
            <p>Apply for hostel leave</p>
          </div>
          <div class="quick-access-card" @click="navigateTo('/menu')">
            <i class="fas fa-utensils"></i>
            <h3>Check Menu</h3>
            <p>View weekly mess menu</p>
          </div>
          <div class="quick-access-card" @click="navigateTo('/feedback')">
            <i class="fas fa-comment-alt"></i>
            <h3>Meal Feedback</h3>
            <p>Provide feedback on meals</p>
          </div>
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
      showDropdown: false,
      showMobileMenu: false
    }
  },
  methods: {
    toggleProfileDropdown() {
      this.showDropdown = !this.showDropdown
      if (this.showDropdown) {
        this.showMobileMenu = false
      }
    },
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
      if (this.showMobileMenu) {
        this.showDropdown = false
      }
    },
    logout() {
      console.log("Logging out...")
      this.showDropdown = false
      this.$router.push('/login')
    },
    navigateTo(route) {
      this.$router.push(route)
      this.showMobileMenu = false
    }
  }
}
</script>

<style scoped>
.student-dashboard {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
}

/* Header Styles */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #1BBC9B, #16a085);
  color: white;
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.header-left {
  display: flex;
  align-items: center;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dashboard-header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

/* Hamburger Button */
.hamburger-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.hamburger-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Mobile Menu Styles */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  justify-content: flex-end;
}

.mobile-menu-content {
  background-color: white;
  width: 280px;
  height: 100vh;
  overflow-y: auto;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);
  animation: slideInRight 0.3s ease-out;
}

.mobile-menu-header {
  padding: 1.5rem;
  background: linear-gradient(135deg, #1BBC9B, #16a085);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-menu-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

.mobile-menu-items {
  padding: 1rem 0;
}

.mobile-menu-item {
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  border-left: 4px solid transparent;
}

.mobile-menu-item:hover {
  background-color: #f5f5f5;
  border-left-color: #1BBC9B;
}

.mobile-menu-item i {
  width: 24px;
  text-align: center;
  color: #1BBC9B;
  font-size: 1.1rem;
}

.mobile-menu-item span {
  font-size: 0.95rem;
  color: #333;
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
  z-index: 1001;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.dropdown-content a {
  color: #333;
  padding: 0.75rem 1rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.dropdown-content a:hover {
  background-color: #f5f5f5;
  color: #1BBC9B;
}

.dropdown-content i {
  width: 20px;
  text-align: center;
}

/* Dashboard Content */
.dashboard-content {
  flex: 1;
  margin-top: 70px;
  margin-bottom: 60px;
  padding: 1.5rem;
  overflow-y: auto;
}

/* Metrics Grid */
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
  transition: transform 0.2s;
}

.metric-card:hover {
  transform: translateY(-5px);
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

/* Dashboard Sections */
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

/* Activity List */
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

/* Quick Access Grid */
.quick-access-grid {
  display: grid;
  grid-template-columns: repeat( 4, 1fr );
  gap: 1.5rem;
  margin-top: 1rem;
}

.quick-access-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 1.5rem;
  border-top: 4px solid #1BBC9B;
  cursor: pointer;
  transition: transform 0.2s;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 170px;
}

.quick-access-card:hover {
  transform: translateY(-5px);
}

.quick-access-card i {
  color: #1BBC9B;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.quick-access-card h3 {
  margin: 0.5rem 0;
  color: #1BBC9B;
}

.quick-access-card p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

/* Animations */
@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .dashboard-header {
    padding: 1rem;
  }
  
  .dashboard-content {
    margin-top: 70px;
    padding: 1rem;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  
  .quick-access-grid {
    grid-template-columns: repeat(2,1fr) ;
  }
}

@media (max-width: 680px) {
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
  
  .mobile-menu-content {
    width: 85%;
  }
}
</style>