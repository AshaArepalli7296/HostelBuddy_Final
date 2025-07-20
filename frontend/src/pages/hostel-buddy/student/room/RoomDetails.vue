<template>
  <Navbar_Student/>
  <div class="room-details-container">
    <!-- Left side - Student Room Details -->
    <div class="student-info">
      <h1>Your Room</h1>
      
      <div class="detail-item">
        <div class="detail-row">
          <span class="label">Room Number:</span>
          <span class="value">A-204</span>
        </div>
        <div class="detail-row">
          <span class="label">Block/Floor:</span>
          <span class="value">Block A / 2nd Floor</span>
        </div>
        <div class="detail-row">
          <span class="label">Bed Type:</span>
          <span class="value">Single Bed (3ft x 6ft)</span>
        </div>
      </div>
      
      <div class="roommates-section">
        <h3>Roommates</h3>
        <div class="roommate" v-for="(roommate, index) in roommates" :key="index">
          <div class="roommate-name">{{ roommate.name }}</div>
          <div class="roommate-register">
            <span class="register-label">Register No:</span>
            <span class="register-value">{{ roommate.registerNo }}</span>
          </div>
          <div class="roommate-contact">
            <a :href="`tel:${roommate.phone}`">{{ roommate.phone }}</a>
            <a :href="`mailto:${roommate.email}`">{{ roommate.email }}</a>
          </div>
        </div>
      </div>
      
    <div class="button-group">
    <button class="contact-warden" @click="contactWarden">
      <i class="fas fa-phone-alt"></i> Contact Warden
    </button>
    <button class="change-request" @click="navigateToChangeRequest">
      <i class="fas fa-exchange-alt"></i> Change Request
    </button>
  </div>
    </div>
    

    <!-- Right side - Room Images -->
    <div class="room-images">
      <div class="image-row">
        <img src="@/assets/images/hostel-room.jpeg" alt="Hostel room view" class="room-image">
        <img src="@/assets/images/hostel-room_2.jpeg" alt="Hostel room another view" class="room-image">
      </div>
      <div class="image-row">
        <img src="@/assets/images/hostel-room_4.jpeg" alt="Hostel room bathroom" class="room-image">
        <img src="@/assets/images/hostel-room_3.jpeg" alt="Hostel room study area" class="room-image">
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Navbar_Student from '../../../../components/Navbar_Student.vue';
import Footer from '../../../../components/Footer.vue';

export default {
  name: 'RoomDetails',
  components: {
    Navbar_Student,
    Footer
  },
  data() {
    return {
      roommates: [
        {
          name: "Alex Johnson",
          registerNo: "24B91A6108",
          phone: "+91 9876543210",
          email: "alex.j@university.edu"
        },
        {
          name: "Sam Wilson",
          registerNo: "24B91A6108",
          phone: "+91 3456098774",
          email: "sam.w@university.edu"
        }
      ]
    }
  },
  methods: {  
    contactWarden() {
      alert("Connecting to warden...");
    },
    navigateToChangeRequest() {
      this.$router.push('/change-request');
    }
  }
}
</script>

<style scoped>
.room-details-container {
  display: flex;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.student-info {
  flex: 1;
  padding: 20px;
  text-align: center; /* Center all text in student info */
}

.student-info h1 {
  color: #1BBC9B;
  margin-bottom: 25px;
  font-size: 28px;
  border-bottom: 2px solid #1BBC9B;
  padding-bottom: 10px;
}

.detail-item {
  margin: 30px 0 15px;
  background: #f8f8f8;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.detail-row {
  display: flex;
  justify-content: center; /* Center the row content */
  margin-bottom: 12px;
  gap: 10px; /* Space between label and value */
}

.label {
  font-weight: 600;
  color: #555;
}

.value {
  color: #333;
}

.roommates-section {
  margin-top: 30px;
  background: #f8f8f8;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.roommates-section h3 {
  color: #1BBC9B;
  margin-bottom: 15px;
  text-align: center;
}

.roommate {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #e0e0e0;
  text-align: center;
}

.roommate:last-child {
  border-bottom: none;
}

.roommate-name {
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.roommate-register {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 8px 0;
}

.register-label {
  font-weight: 600;
  color: #555;
}

.register-value {
  color: #333;
  font-weight: 500;
}

.roommate-contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
}

.roommate-contact a {
  color: #1BBC9B;
  text-decoration: none;
  font-size: 14px;
}

.roommate-contact a:hover {
  text-decoration: underline;
  color: #15967D;
}

.button-group {
  display: flex;
  gap: 15px;
  margin-top: 25px;
  justify-content: center; /* Center the buttons */
}

.contact-warden {
  background: #1BBC9B;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  flex: 1;
}

.change-request { /* Apply same styles to both buttons */
  background: #1BBC9B;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  flex: 1; /* Make both buttons equal width */
  max-width: 200px; /* Optional: Set a max-width if needed */
  display: flex;
  align-items: center;
  justify-content: center;
}


.change-request-btn:hover {
  background: #15967D;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(27, 188, 155, 0.2);
}

.change-request-btn i {
  margin-right: 8px;
}


.room-images {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.image-row {
  display: flex;
  gap: 15px;
  width: 100%;
}

.room-image {
   margin-top: 25px;
  width: 50%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border: 2px solid #1BBC9B;
}

@media (max-width: 768px) {
  .room-details-container {
    flex-direction: column;
  }
  
  .image-row {
    flex-direction: column;
  }
  
  .room-image {
    width: 100%;
    height: 200px;
  }
  
   .change-request {
    width: 100%;
    max-width: none;
  }
}
</style>