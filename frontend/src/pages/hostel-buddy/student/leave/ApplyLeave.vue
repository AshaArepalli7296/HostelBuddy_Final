<template>
  <Navbar_Student/>
  <div class="Theme">
    <div class="leave-application-container">
      <div class="cards-wrapper">

        <!-- Left Card - Application Form -->
        <div class="form-card">
          <h1>Leave Application</h1>
          <form @submit.prevent="submitLeaveRequest" class="leave-form">
            <div class="form-group">
              <label for="student-name"> Name</label>
              <input type="text" id="student-name" v-model="leaveForm.studentName" placeholder="Enter your Name" required>
            </div>

            <div class="form-group">
              <label for="room-number">Room Number</label>
              <input type="text" id="room-number" v-model="leaveForm.roomNumber" placeholder="Enter your room number" required>
            </div>

            <div class="form-group">
              <label for="from-date">From Date</label>
              <input type="date" id="from-date" v-model="leaveForm.fromDate" required :min="today">
            </div>

            <div class="form-group">
              <label for="to-date">To Date</label>
              <input type="date" id="to-date" v-model="leaveForm.toDate" required :min="leaveForm.fromDate || today">
            </div>

            <div class="form-group">
              <label for="reason">Reason for Leave</label>
              <textarea id="reason" v-model="leaveForm.reason" rows="4" placeholder="Please specify your reason for leave..." required></textarea>
            </div>

            <div class="form-group">
              <label for="emergency-contact">Emergency Contact</label>
              <input type="text" id="emergency-contact" v-model="leaveForm.emergencyContact" placeholder="Enter emergency contact number" required>
            </div>

            <div class="submit-wrapper">
              <button type="submit" class="submit-btn">Submit Application</button>
            </div>
          </form>
        </div>

        <!-- Right Card - Leave History -->
        <div class="history-card">
          <h2>Leave History</h2>
          <div class="history-list" v-if="leaveHistory.length > 0">
            <div class="history-item" v-for="(leave, index) in leaveHistory" :key="index" :class="leave.status.toLowerCase()">
              <div class="leave-dates">{{ formatDate(leave.fromDate) }} to {{ formatDate(leave.toDate) }}</div>
              <div class="leave-status">
                <span class="status-badge">{{ leave.status }}</span>
                <span class="leave-days">{{ calculateDays(leave.fromDate, leave.toDate) }} days</span>
              </div>
              <div class="leave-reason">{{ leave.reason }}</div>
              <div class="leave-contact">Contact: {{ leave.emergencyContact }}</div>
              <div class="leave-actions" v-if="leave.status === 'Pending'">
                <button class="cancel-btn" @click="cancelLeave(leave.id)">Cancel</button>
              </div>
            </div>
          </div>
          <div class="empty-history" v-else>
            <p>No leave applications yet</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Navbar_Student from '../../../../components/Navbar_Student.vue';
import Footer from '../../../../components/Footer.vue';
import axios from 'axios';

export default {
  name: 'LeaveApplication',
  components: {
    Navbar_Student,
    Footer
  },
  data() {
    return {
      today: new Date().toISOString().split('T')[0],
      user: {
        fullName: '',
        roomNumber: ''
      },
      leaveForm: {
        fromDate: '',
        toDate: '',
        reason: '',
        emergencyContact: '',
        studentName: '',
        roomNumber: ''
      },
      leaveHistory: []
    };
  },
  mounted() {
    this.fetchLeaveHistory();
  },
  methods: {
    fetchLeaveHistory() {
      const token = localStorage.getItem('token');
      axios.get('/api/v1/leave/history', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        this.leaveHistory = res.data.map(leave => ({
          id: leave._id,
          StudentName: leave.fullName,
          RoomNo: leave.roomNumber,
          fromDate: leave.startDate,
          toDate: leave.endDate,
          reason: leave.reason,
          emergencyContact: leave.emergencyContact,
          status: leave.status.charAt(0).toUpperCase() + leave.status.slice(1)
        }));
      })
      .catch(err => {
        console.error(err);
        alert('Failed to fetch leave history');
      });
    },

    submitLeaveRequest() {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('You must be logged in to apply for leave.');
        return;
      }

      axios.post('/api/v1/leave/apply', {
        studentName: this.leaveForm.fullName,
        roomNumber: this.leaveForm.roomNumber,
        startDate: this.leaveForm.fromDate,
        endDate: this.leaveForm.toDate,
        reason: this.leaveForm.reason,
        emergencyContact: this.leaveForm.emergencyContact
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        const newLeave = response.data;
        this.leaveHistory.unshift({
          id: newLeave._id,
          fromDate: newLeave.startDate,
          toDate: newLeave.endDate,
          reason: newLeave.reason,
          emergencyContact: newLeave.emergencyContact,
          status: newLeave.status.charAt(0).toUpperCase() + newLeave.status.slice(1)
        });

        this.leaveForm = {
          fromDate: '',
          toDate: '',
          reason: '',
          emergencyContact: '',
          studentName: '',
          roomNumber: ''
        };

        alert('Leave application submitted successfully!');
      })
      .catch(error => {
        console.error(error);
        alert(error.response?.data?.message || 'Something went wrong. Please try again.');
      });
    },

    cancelLeave(id) {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('You must be logged in to cancel a leave.');
        return;
      }

      if (confirm('Are you sure you want to cancel this leave application?')) {
        axios.delete(`/api/v1/leave/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(() => {
          this.leaveHistory = this.leaveHistory.filter(leave => leave.id !== id);
          alert('Leave application cancelled successfully');
        })
        .catch(err => {
          console.error("Cancel error:", err.response?.data || err.message);
          alert(err.response?.data?.message || 'Failed to cancel leave');
        });
      }
    },

    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    },

    calculateDays(fromDate, toDate) {
      const diff = new Date(toDate) - new Date(fromDate);
      return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
    }
  }
};
</script>

<style scoped>
.leave-application-container {
  max-width: 1200px;

  padding: 30px;
  /* margin-top: 70px; */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
margin-top: auto;
margin-bottom: auto;


}

.cards-wrapper {
  display: flex;
  gap: 20px;
}

.form-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
  padding: 0px;
}

.form-card {
  flex: 1;
  width:1000px;
  padding: 20px;
}

.history-card {
  width: 450px;
  padding-top:60px;
}

h1 {
  color: #1BBC9B;
  text-align: left;
  margin-bottom: 25px;
  font-size: 28px;
  padding-bottom: 10px;
  border-bottom: 2px solid #1BBC9B;
  text-align: center;
 margin-top: 80px;
}

h2 {
  color: #1BBC9B;
  margin-bottom: 20px;
  font-size: 22px;
}

.leave-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-weight: 600;
  color: #555;
  font-size: 15px;
}

input, textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
}

input:focus, textarea:focus {
  border-color: #1BBC9B;
  outline: none;
  box-shadow: 0 0 0 2px rgba(27, 188, 155, 0.2);
}

textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.submit-btn {
  background: #1BBC9B;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover {
  background: #15967D;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(27, 188, 155, 0.3);
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 600px;
  overflow-y: auto;
  padding-right: 10px;
  margin-top: 30px;
}

.history-item {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid #ddd;
}

.history-item.pending {
  border-left-color: #FFC107;
}

.history-item.approved {
  border-left-color: #28A745;
}

.history-item.rejected {
  border-left-color: #DC3545;
}

.leave-dates {
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.leave-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.history-item.pending .status-badge {
  background: #FFF3CD;
  color: #856404;
}

.history-item.approved .status-badge {
  background: #D4EDDA;
  color: #155724;
}

.history-item.rejected .status-badge {
  background: #F8D7DA;
  color: #721C24;
}

.leave-days {
  color: #666;
  font-size: 14px;
}

.leave-reason {
  color: #555;
  margin-bottom: 10px;
  line-height: 1.5;
}

.leave-contact {
  color: #666;
  font-size: 14px;
}

.leave-actions {
  margin-top: 10px;
  text-align: right;
}

.cancel-btn {
  background: #f8f8f8;
  color: #DC3545;
  border: 1px solid #DC3545;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.cancel-btn:hover {
  background: #DC3545;
  color: white;
}

.empty-history {
  text-align: center;
  color: #666;
  padding: 40px 0;
}

.Theme {
  min-height: calc(100vh - 60px); /* Adjust this based on Navbar/Footer height */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 3rem 2rem;
  background: linear-gradient(to bottom, 
    #e0f8f6 0%, 
    #f0fdfc 30%, 
    #ffffff 50%, 
    #f0fdfc 70%, 
    #e0f8f6 100%);
  overflow-y: auto;  /* ✅ This makes the form scrollable */
}

@media (max-width: 768px) {
  .leave-application-container {
    padding: 20px;
  }
  
  .form-card, .history-card {
    padding: 20px;
  }
}

 
</style>