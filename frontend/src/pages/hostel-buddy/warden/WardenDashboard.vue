<template>
  <div class="warden-dashboard">
    <!-- Fixed Header -->
    <header class="dashboard-header">
      <h1>Warden Dashboard</h1>
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
    </header>

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

      <!-- Quick Access Sections -->
      <div class="quick-access-grid">
        <!-- First Row -->
        <div class="quick-access-card" @click="$router.push('/announcements')">
          <h3>Announcements</h3>
          <p>Create and manage hostel announcements</p>
          <button class="access-btn">
            Manage <i class="fas fa-arrow-right"></i>
          </button>
        </div>

        <div class="quick-access-card" @click="$router.push('/room-change')">
          <h3>Change Rooms</h3>
          <p>Manage student room assignments</p>
          <button class="access-btn">
            Manage <i class="fas fa-arrow-right"></i>
          </button>
        </div>

        <div class="quick-access-card" @click="$router.push('/menu-update')">
          <h3>Update Menu</h3>
          <p>Update and manage mess menus</p>
          <button class="access-btn">
            Update <i class="fas fa-arrow-right"></i>
          </button>
        </div>

        <!-- Second Row -->
        <div class="quick-access-card" @click="$router.push('/fee-management')">
          <h3>Fee Management</h3>
          <p>View and manage student fees</p>
          <button class="access-btn">
            View <i class="fas fa-arrow-right"></i>
          </button>
        </div>

        <div class="quick-access-card" @click="showQuickComplaintView">
          <h3>View Complaints</h3>
          <p>Check and resolve student complaints</p>
          <button class="access-btn">
            View <i class="fas fa-arrow-right"></i>
          </button>
        </div>

        <div class="quick-access-card" @click="showFeeReports">
          <h3>Fee Reports</h3>
          <p>Generate and view fee reports</p>
          <button class="access-btn">
            View <i class="fas fa-arrow-right"></i>
          </button>
        </div>

        <!-- Third Row -->
        <div class="quick-access-card" @click="navigateToHostelOccupancy">
          <h3>Hostel Occupancy</h3>
          <p>Which room are available</p>
          <button class="access-btn">
            Check <i class="fas fa-arrow-right"></i>
          </button>
        </div>

        <div class="quick-access-card" @click="navigateToRoomAllocation">
          <h3>Room Allocation</h3>
          <p>Manage student room assignments</p>
          <button class="access-btn">
            Allocate <i class="fas fa-arrow-right"></i>
          </button>
        </div>

        <div class="quick-access-card" @click="navigateToMessManagement">
          <h3>Students Details</h3>
          <p>Check the student status</p>
          <button class="access-btn">
            Manage <i class="fas fa-arrow-right"></i>
          </button>
        </div>

        <!-- Fourth Row -->
        <div class="quick-access-card" @click="navigateToStudentRecords">
          <h3>Leave Approval</h3>
          <p>Manage student leave requests</p>
          <button class="access-btn">
            Approve <i class="fas fa-arrow-right"></i>
          </button>
        </div>

        <div class="quick-access-card" @click="navigateToMessRules">
          <h3>Edit Rules</h3>
          <p>Update hostel rules and regulations</p>
          <button class="access-btn">
            Manage <i class="fas fa-arrow-right"></i>
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
  name: 'WardenDashboard',
  components: {
    Footer
  },
  data() {
    return {
      showDropdown: false,
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
      ]
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
    },
    showQuickComplaintView() {
      this.$router.push('/complaint-management')
    },
    navigateToHostelOccupancy() {
      this.$router.push('/hostel-occupancy')
    },
    showFeeReports() {
      this.$router.push('/payment-tracking')
    },
    navigateToRoomAllocation() {
      this.$router.push('/room-assignment')
    },
    navigateToMessManagement() {
      this.$router.push('/student-management')
    },
    navigateToStudentRecords() {
      this.$router.push('/leave-approval')
    },
    navigateToMessRules() {
      this.$router.push('/rules')
    }
  }
}
</script>

<style scoped>
.warden-dashboard {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
 
}


  .dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #1BBC9B, #16a085);
  color: white;
   height:100px;
}

.dashboard-header h1 {
  margin: 0;
  font-size: 1.8rem;
}


/* Scrollable Content Area */
.dashboard-content {
  flex: 1;
  margin-top: 0px; /* Height of header */
  margin-bottom: 60px; /* Height of footer */
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

/* Responsive Styles */
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