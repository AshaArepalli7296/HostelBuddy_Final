<template>
  <Navbar_Student/>
  <div class="room-change-container">
    <h1>Room Change Request</h1>
    
    <div class="cards-wrapper">
      <!-- Left Card - Request Form -->
      <div class="form-card">
        <div class="current-room">
          <h3>Your Current Room</h3>
      <div class="room-info">
        <span><strong>Room:</strong> A-204</span>
        <span><strong>Block/Floor:</strong> Block A / 2nd Floor</span>
        <span><strong>Bed Type:</strong> Single Bed (3ft x 6ft)</span>
      </div>
    </div>

        <form @submit.prevent="submitRequest" class="request-form">
          <div class="form-group">
            <label for="preferred-block">Preferred Block</label>
           <select id="preferred-block" v-model="formData.preferredBlock" required>
            <option value="">Select Block</option>
            <option value="A">Block A</option>
            <option value="B">Block B</option>
            <option value="C">Block C</option>
  </select>
          </div>

          <div class="form-group">
            <label for="preferred-room">Preferred Room Number</label>
            <input 
              type="text" 
              id="preferred-room" 
              v-model="formData.preferredRoom" 
              placeholder="e.g. B-305" 
              required
            >
          </div>

          <div class="form-group">
            <label for="reason">Reason for Change</label>
            <textarea 
              id="reason" 
              v-model="formData.reason" 
              rows="4" 
              placeholder="Please explain your reason for requesting a room change..."
              required
            ></textarea>
          </div>

          <button type="submit" class="submit-btn">
            Submit Request
          </button>
        </form>
      </div>

      <!-- Right Card - Status Process -->
      <div class="status-process-card">
        <h3>Request Status</h3>
        <div class="process-steps">
          <div class="step" :class="{ active: currentStep >= 1, completed: currentStep >= 1 }">
            <div class="step-number">1</div>
            <div class="step-content">
              <div class="step-title">Pending</div>
              <div class="step-description">Request submitted for review</div>
            </div>
            <div class="step-check" v-if="currentStep >= 1">✓</div>
          </div>
          
          <div class="step" :class="{ active: currentStep >= 2, completed: currentStep >= 2 }">
            <div class="step-number">2</div>
            <div class="step-content">
              <div class="step-title">Approved</div>
              <div class="step-description">Request approved by admin</div>
            </div>
            <div class="step-check" v-if="currentStep >= 2">✓</div>
          </div>
          
          <div class="step" :class="{ active: currentStep >= 3, completed: currentStep >= 3 }">
            <div class="step-number">3</div>
            <div class="step-content">
              <div class="step-title">Rejected</div>
              <div class="step-description">Request not approved</div>
            </div>
            <div class="step-check" v-if="currentStep >= 3">✓</div>
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

export default {
  name: 'RoomChangeRequest',
  components: {
    Navbar_Student,
    Footer
  },
  data() {
    return {
      formData: {
        preferredBlock: '',
        preferredRoom: '',
        reason: ''
      },
      currentStep: 1, // 1 = Pending, 2 = Approved, 3 = Rejected
      requests: [
        {
          date: new Date(),
          preferredBlock: 'B',
          preferredRoom: '305',
          reason: 'Want to be closer to friends',
          status: 'Pending',
          comments: ''
        }
      ]
    }
  },
  methods: {
    submitRequest() {
      const newRequest = {
        date: new Date(),
        preferredBlock: this.formData.preferredBlock,
        preferredRoom: this.formData.preferredRoom,
        reason: this.formData.reason,
        status: 'Pending',
        comments: ''
      }
      
      this.requests.unshift(newRequest);
      this.currentStep = 1; // Set to Pending status
      
      // Reset form
      this.formData = {
        preferredBlock: '',
        preferredRoom: '',
        reason: ''
      }
      
      alert('Request submitted successfully!');
      
      // Simulate admin approval/rejection after 3 seconds (for demo)
      setTimeout(() => {
        const randomStatus = Math.random() > 0.5 ? 2 : 3; // 50% chance of Approved/Rejected
        this.currentStep = randomStatus;
        this.requests[0].status = randomStatus === 2 ? 'Approved' : 'Rejected';
      }, 3000);
    },
    formatDate(date) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
}
</script>

<style scoped>
.room-change-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
}

h1 {
  color: #1BBC9B;
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  border-bottom: 2px solid #1BBC9B;
  padding-bottom: 10px;
}

.cards-wrapper {
  display: flex;
  gap: 30px;
}

.form-card {
  flex: 1;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 25px;
  width:1000px;
}

.status-process-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 25px;
  flex: 1;
  max-width: 350px;
}

h3 {
  color: #1BBC9B;
  margin-bottom: 15px;
}
.current-room {
  background: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  text-align: center; /* Added center alignment */
}

.room-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 15px;
  align-items: center; /* Center align items horizontally */
}

.request-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}


.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-weight: 600;
  color: #555;
}

input, select, textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border 0.3s;
}

input:focus, select:focus, textarea:focus {
  border-color: #1BBC9B;
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-btn {
  background: #1BBC9B;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
  width: 200px;
  align-self: center;
}

.submit-btn:hover {
  background: #15967D;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(27, 188, 155, 0.2);
}

.process-steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.step {
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;
  padding-bottom: 20px;
}

.step:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 16px;
  top: 36px;
  bottom: -20px;
  width: 2px;
  background: #e0e0e0;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e0e0e0;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
  z-index: 1;
}

.step-content {
  flex-grow: 1;
}

.step-title {
  font-weight: 600;
  color: #666;
  margin-bottom: 4px;
}

.step-description {
  font-size: 14px;
  color: #999;
}

.step-check {
  color: white;
  background: #1BBC9B;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  flex-shrink: 0;
}

/* Active step styling */
.step.active .step-number {
  background: #1BBC9B;
  color: white;
}

.step.active .step-title {
  color: #1BBC9B;
}

/* Completed step styling */
.step.completed .step-number {
  background: #1BBC9B;
  color: white;
}

.step.completed .step-title {
  color: #1BBC9B;
}

.step.completed::after {
  background: #1BBC9B;
}

@media (max-width: 768px) {
  .room-change-container {
    padding: 20px;
  }
  
  .cards-wrapper {
    flex-direction: column;
  }
  
  .form-card, .status-process-card {
    padding: 20px;
    max-width: 100%;
  }
}
</style>