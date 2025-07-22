<template>
  <div class="warden-dashboard">
    <!-- Fixed Header -->
    <header class="dashboard-header">
      <div class="header-left">
        <h1>Warden Dashboard</h1>
      </div>
      <div class="header-right">
        <div class="profile-dropdown">
          <button class="profile-btn" @click="toggleProfileDropdown">
            <i class="fas fa-user-circle"></i>
            <span>Warden</span>
            <i class="fas fa-caret-down"></i>
          </button>
          <div v-if="showDropdown" class="dropdown-content">
            <router-link to="/admin-profile" @click="showDropdown = false">
              <i class="fas fa-user"></i> My Profile
            </router-link>
            <a href="#" @click.prevent="logout">
              <i class="fas fa-sign-out-alt"></i> Logout
            </a>
          </div>
        </div>
        <button class="hamburger-btn" @click="toggleMobileMenu">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </header>

    <!-- Mobile Menu Overlay - Right Side -->
    <div v-if="showMobileMenu" class="mobile-menu-overlay" @click="toggleMobileMenu">
      <div class="mobile-menu-content right" @click.stop>
        <div class="mobile-menu-header">
          <h3>Quick Actions</h3>
          <button class="close-btn" @click="toggleMobileMenu">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="mobile-menu-items">
          <div class="mobile-menu-item" @click="navigateTo('/announcements')">
            <!-- <i class="fas fa-bullhorn"></i> -->
            <span>Announcements</span>
          </div>
          <div class="mobile-menu-item" @click="navigateTo('/room-change')">
            <!-- <i class="fas fa-exchange-alt"></i> -->
            <span>Change Rooms</span>
          </div>
          <div class="mobile-menu-item" @click="navigateTo('/menu-update')">
            <!-- <i class="fas fa-utensils"></i> -->
            <span>Update Menu</span>
          </div>
          <div class="mobile-menu-item" @click="navigateTo('/fee-management')">
            <!-- <i class="fas fa-rupee-sign"></i> -->
            <span>Fee Management</span>
          </div>
          <div class="mobile-menu-item" @click="navigateTo('/complaint-management')">
            <!-- <i class="fas fa-tools"></i> -->
            <span>View Complaints</span>
          </div>
          <div class="mobile-menu-item" @click="navigateTo('/payment-tracking')">
            <!-- <i class="fas fa-file-invoice"></i> -->
            <span>Fee Reports</span>
          </div>
          <div class="mobile-menu-item" @click="navigateTo('/hostel-occupancy')">
            <!-- <i class="fas fa-bed"></i> -->
            <span>Hostel Occupancy</span>
          </div>
          <div class="mobile-menu-item" @click="navigateTo('/room-assignment')">
            <!-- <i class="fas fa-home"></i> -->
            <span>Room Allocation</span>
          </div>
          <div class="mobile-menu-item" @click="navigateTo('/student-management')">
            <!-- <i class="fas fa-user-graduate"></i> -->
            <span>Student Details</span>
          </div>
          <div class="mobile-menu-item" @click="navigateTo('/leave-approval')">
            <!-- <i class="fas fa-calendar-check"></i> -->
            <span>Leave Approval</span>
          </div>
          <div class="mobile-menu-item" @click="navigateTo('/rules')">
            <!-- <i class="fas fa-clipboard-list"></i> -->
            <span>Edit Rules</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Scrollable Content -->
    <main class="dashboard-content">
      <!-- Key Metrics -->
      <div class="metrics-grid">
        <div class="metric-card" v-for="(metric, index) in metricList" :key="index">
          <div class="metric-content">
            <h3>{{ metric.title }}</h3>
            <p class="metric-value">{{ metric.value }}</p>
            <p class="metric-change">
              <i :class="metric.icon"></i> {{ metric.change }}
            </p>
          </div>
          <div class="metric-icon">
            <i :class="metric.metricIcon"></i>
          </div>
        </div>
      </div>

      <!-- Recent Activity Section -->
      <div class="dashboard-section">
        <h2>Recent Activity</h2>
        <div class="activity-list">
          <div v-for="(activity, index) in recentActivities" :key="index" class="activity-item">
            <div class="activity-icon" :class="activity.type">
              <i :class="activity.icon"></i>
            </div>
            <div class="activity-content">
              <p>{{ activity.description }}</p>
              <span class="activity-time">{{ activity.time }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Access Cards - All menu items as cards -->
      <div class="dashboard-section">
        <h2>Quick Access</h2>
        <div class="quick-access-grid">
          <div class="quick-access-card" v-for="(action, index) in quickActions" :key="index" @click="navigateTo(action.route)">
            <div class="action-icon" :style="{ backgroundColor: action.bgColor }">
              <i :class="action.icon"></i>
            </div>
            <h3>{{ action.title }}</h3>
            <p>{{ action.description }}</p>
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
  name: 'WardenDashboard',
  components: {
    Footer
  },
  data() {
    return {
      showDropdown: false,
      showMobileMenu: false,
      metricList: [
        {
          title: 'Total Students',
          value: 248,
          change: '+12 this month',
          icon: 'fas fa-user-plus',
          metricIcon: 'fas fa-users'
        },
        {
          title: 'Vacant Rooms',
          value: 15,
          change: '89% occupancy',
          icon: 'fas fa-bed',
          metricIcon: 'fas fa-home'
        },
        {
          title: 'Pending Complaints',
          value: 8,
          change: '1.5 avg. days',
          icon: 'fas fa-clock',
          metricIcon: 'fas fa-clipboard-list'
        },
        {
          title: 'Fee Defaulters',
          value: 14,
          change: '₹175000 pending',
          icon: 'fas fa-rupee-sign',
          metricIcon: 'fas fa-money-bill-wave'
        }
      ],
      recentActivities: [
        {
          type: 'complaint',
          icon: 'fas fa-tools',
          description: 'New complaint submitted by Rahul Sharma (Room B-205)',
          time: '10 minutes ago'
        },
        {
          type: 'payment',
          icon: 'fas fa-rupee-sign',
          description: 'Fee payment received from Priya Patel (₹12,500)',
          time: '1 hour ago'
        },
        {
          type: 'announcement',
          icon: 'fas fa-bullhorn',
          description: 'You posted a new announcement about water supply',
          time: '3 hours ago'
        },
        {
          type: 'leave',
          icon: 'fas fa-calendar-check',
          description: 'Leave request approved for Arjun Kumar',
          time: 'Yesterday'
        }
      ],
      quickActions: [
        {
          title: 'Announcements',
          icon: 'fas fa-bullhorn',
          description: 'Make new announcements to students',
          route: '/announcements',
          bgColor: '#e3f2fd'
        },
        {
          title: 'Room Allocation',
          icon: 'fas fa-home',
          description: 'Assign rooms to new students',
          route: '/room-assignment',
          bgColor: '#e8f5e9'
        },
        {
          title: 'Leave Approval',
          icon: 'fas fa-calendar-check',
          description: 'Approve student leave requests',
          route: '/leave-approval',
          bgColor: '#fff3e0'
        },
        {
          title: 'Complaints',
          icon: 'fas fa-tools',
          description: 'View and resolve complaints',
          route: '/complaint-management',
          bgColor: '#f3e5f5'
        },
        {
          title: 'Fee Management',
          icon: 'fas fa-rupee-sign',
          description: 'Manage student fee payments',
          route: '/fee-management',
          bgColor: '#e0f7fa'
        },
        {
          title: 'Student Details',
          icon: 'fas fa-user-graduate',
          description: 'View and manage student records',
          route: '/student-management',
          bgColor: '#f1f8e9'
        },
        {
          title: 'Hostel Occupancy',
          icon: 'fas fa-bed',
          description: 'View current hostel occupancy',
          route: '/hostel-occupancy',
          bgColor: '#fce4ec'
        },
        {
          title: 'Fee Reports',
          icon: 'fas fa-file-invoice',
          description: 'Generate fee payment reports',
          route: '/payment-tracking',
          bgColor: '#e8eaf6'
        },
        {
          title: 'Change Rooms',
          icon: 'fas fa-exchange-alt',
          description: 'Process room change requests',
          route: '/room-change',
          bgColor: '#e0f2f1'
        },
        {
          title: 'Update Menu',
          icon: 'fas fa-utensils',
          description: 'Update hostel food menu',
          route: '/menu-update',
          bgColor: '#fff8e1'
        },
        {
          title: 'Edit Rules',
          icon: 'fas fa-clipboard-list',
          description: 'Update hostel rules and policies',
          route: '/rules',
          bgColor: '#efebe9'
        }
      ]
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
/* Main Dashboard Styles */
.warden-dashboard {
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

/* Hamburger Button - Now after profile button */
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

/* Mobile Menu Styles - Right Side */
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

.mobile-menu-content.right {
  background-color: white;
  width: 280px;
  height: 100vh;
  overflow-y: auto;
  box-shadow: -2px 0 10px rgba(0,0,0,0.1);
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
  border-right: 4px solid transparent;
}

.mobile-menu-item:hover {
  background-color: #f5f5f5;
  border-right-color: #1BBC9B;
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

.activity-icon.complaint {
  background: #e3f2fd;
  color: #1976d2;
}

.activity-icon.payment {
  background: #e8f5e9;
  color: #2e7d32;
}

.activity-icon.announcement {
  background: #fff3e0;
  color: #e65100;
}

.activity-icon.leave {
  background: #f3e5f5;
  color: #7b1fa2;
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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.quick-access-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border-top: 4px solid #1BBC9B;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.quick-access-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.action-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: #1BBC9B;
  font-size: 1.5rem;
}

.quick-access-card h3 {
  margin: 0.5rem 0;
  color: #1BBC9B;
  font-size: 1.1rem;
}

.quick-access-card p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
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
@media (max-width: 768px) {
  .dashboard-header {
    padding: 1rem;
  }
  
  .dashboard-content {
    margin-top: 70px;
    padding: 1rem;
  }
  
  .metrics-grid,
  .quick-access-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .metrics-grid,
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