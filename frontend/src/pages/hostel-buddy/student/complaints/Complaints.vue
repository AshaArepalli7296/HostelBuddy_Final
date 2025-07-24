<template>
  <Navbar_Student />
  <div class="request-container1">
    <div class="request-container">
      <div class="cards-wrapper">

        <!-- Complaint Form -->
        <div class="form-card">
          <h1 class="center-heading">Complaint Submission</h1>

          <div class="complaint-section">
            <div class="form-group">
              <label>Complaint Type:</label>
              <select v-model="complaintType" class="form-input">
                <option disabled value="">Select complaint type</option>
                <option>Electrical</option>
                <option>Plumbing</option>
                <option>Furniture</option>
                <option>Cleaning</option>
                <option>Other</option>
              </select>
            </div>

            <div class="form-group">
              <label>Description:</label>
              <textarea
                v-model="complaintDescription"
                placeholder="Please describe your complaint in detail..."
                rows="4"
                class="form-input"
              ></textarea>
            </div>

            <div class="form-group">
              <label>Upload Photo (Optional):</label>
              <input type="file" @change="handleFileUpload" accept="image/*" class="form-input" />
            </div>

            <div class="submit-wrapper">
              <button @click="submitComplaint" class="submit-btn">
                Submit Complaint
              </button>
            </div>
          </div>
        </div>

        <!-- Status Tracker -->
        <div class="status-card">
          <h2>Request Status</h2>
          <div class="status-timeline">
            <div class="status-step" :class="{ active: statusStep >= 1 }">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>Pending</h3>
                <p>Complaint submitted for review</p>
              </div>
            </div>

            <div class="status-step" :class="{ active: statusStep >= 2 }">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>In Progress</h3>
                <p>Maintenance team working on it</p>
              </div>
            </div>

            <div class="status-step" :class="{ active: statusStep >= 3 }">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>Resolved</h3>
                <p>Issue has been resolved</p>
              </div>
            </div>
          </div>

          <div class="current-status" v-if="currentComplaint">
            <h3>Current Complaint:</h3>
            <p><strong>Type:</strong> {{ currentComplaint.type }}</p>
            <p><strong>Submitted:</strong> {{ formatDate(currentComplaint.date) }}</p>
            <p><strong>Status:</strong> {{ currentComplaint.status }}</p>
          </div>
        </div>

      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Navbar_Student from '../../../../components/Navbar_Student.vue';
import Footer from '../../../../components/Footer.vue';
import axios from 'axios';

export default {
  name: 'ComplaintSystem',
  components: { Footer, Navbar_Student },
  data() {
    return {
      complaintType: '',
      complaintDescription: '',
      uploadedPhoto: null,
      statusStep: 1,
      currentComplaint: null,
      complaints: [] // to avoid error if unshift is used
    };
  },
  methods: {
    handleFileUpload(event) {
      this.uploadedPhoto = event.target.files[0];
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleString('en-IN');
    },
    async submitComplaint() {
      const token = JSON.parse(localStorage.getItem('user'))?.token;

      if (!this.complaintType || !this.complaintDescription) {
        alert('Please fill in all fields.');
        return;
      }

      try {
        const formData = new FormData();
        formData.append('category', this.complaintType);
        formData.append('description', this.complaintDescription);

        if (this.uploadedPhoto) {
          formData.append('photo', this.uploadedPhoto);
        }

        const res = await axios.post(
          '/api/v1/students/complaints',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        const complaintData = res.data.data;

        alert('Complaint submitted successfully!');
        this.resetComplaintForm();

        this.complaints.unshift(complaintData);
        this.currentComplaint = complaintData;
        this.statusStep = 1; // reset or set accordingly
      } catch (err) {
        console.error('Complaint submission error:', err);
        alert(err.response?.data?.message || 'Failed to submit complaint. Please try again.');
      }
    },
    resetComplaintForm() {
      this.complaintType = '';
      this.complaintDescription = '';
      this.uploadedPhoto = null;
    }
  }
};
</script>


<style scoped>
.request-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.center-heading {
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
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
  padding: 30px;
  width:800px;
}

.form-card {
  flex: 1;
 
}

.status-card {
  width: 400px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
}

.form-input:focus {
  border-color: #1BBC9B;
  outline: none;
  box-shadow: 0 0 0 2px rgba(27, 188, 155, 0.2);
}

textarea.form-input {
  min-height: 100px;
  resize: vertical;
}

.status-timeline {
  position: relative;
  padding-left: 30px;
  margin-top: 20px;
}

.status-timeline::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #ddd;
}

.status-step {
  position: relative;
  margin-bottom: 30px;
  padding-bottom: 20px;
}

.status-step:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
}

.step-number {
  position: absolute;
  left: -30px;
  top: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #ddd;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.status-step.active .step-number {
  background: #1BBC9B;
}
.request-container1 {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

padding: 3rem 2rem;
  background: linear-gradient(to bottom, 
    #e0f8f6 0%, 
    #f0fdfc 30%, 
    #ffffff 50%, 
    #f0fdfc 70%, 
    #e0f8f6 100%);
 position: relative;
  overflow: hidden;}

.step-content {
  padding-left: 20px;
}

.step-content h3 {
  margin: 0 0 5px 0;
  color: #333;
}

.step-content p {
  margin: 0;
  color: #777;
}

.current-status {
  margin-top: 30px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
}

.current-status h3 {
  margin-top: 0;
  color: #1BBC9B;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.submit-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 25px;
}

.submit-btn {
  background: #1BBC9B;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  width: 200px;
}

.submit-btn:hover {
  background: #15967D;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(27, 188, 155, 0.3);
}

@media (max-width: 992px) {
  .cards-wrapper {
    flex-direction: column;
  }
  
  .status-card {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .request-container {
    padding: 20px;
  }
  
  .form-card, .status-card {
    padding: 20px;
  }
}
</style>