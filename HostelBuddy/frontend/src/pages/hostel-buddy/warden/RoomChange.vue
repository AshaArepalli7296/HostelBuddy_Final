<template>
  <Navbar_warden/>
  <div class="room-change-container">
    <div class="approval-section">
      <div class="room-change-approval">
        <h2 class="approval-title">Room Change Requests</h2>
        <div class="approval-list">
          <div 
            v-for="(student, index) in students" 
            :key="student.id"
            class="approval-item"
            :class="{
              'approved': student.status === 'approved',
              'rejected': student.status === 'rejected'
            }"
          >
            <div class="student-info">
              <h3>{{ student.name }}</h3>
              <p>Current Room: {{ student.currentRoom }}</p>
              <p>Requested Room: {{ student.requestedRoom }}</p>
              <p>Reason: {{ student.reason }}</p>
            </div>
            <div class="approval-actions">
              <template v-if="student.status === 'pending'">
                <button class="approve-btn" @click="approveRequest(index)">
                  Approve
                </button>
                <button class="reject-btn" @click="rejectRequest(index)">
                  Reject
                </button>
              </template>
              <div v-else class="status-text">
                {{ student.status.charAt(0).toUpperCase() + student.status.slice(1) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="images-section">
      <div class="hostel-image">
        <img src="@/assets/images/room 1.jpg" alt="Modern hostel accommodation">
         </div>
      <div class="hostel-image">
        <img src="@/assets/images/room 2.jpg" alt="Hostel room with bunk beds">
        </div>
      <div class="hostel-image">
        <img src="@/assets/images/room 3.jpg" alt="Clean hostel room">
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Navbar_warden from '../../../components/Navbar_warden.vue';
import Footer from '../../../components/Footer.vue';

export default {
  name: 'RoomChangeApproval',
   components:{
    Navbar_warden,Footer
  },
  data() {
    return {
      students: [
        {
          id: 1,
          name: 'John Doe',
          currentRoom: 'A101',
          requestedRoom: 'B205',
          reason: 'Need to room with friends',
          status: 'pending'
        },
        {
          id: 2,
          name: 'Jane Smith',
          currentRoom: 'C304',
          requestedRoom: 'D102',
          reason: 'Medical reasons',
          status: 'pending'
        },
        {
          id: 3,
          name: 'Michael Johnson',
          currentRoom: 'B201',
          requestedRoom: 'A105',
          reason: 'Quieter room requested',
          status: 'pending'
        },
        {
          id: 4,
          name: 'Emily Davis',
          currentRoom: 'D103',
          requestedRoom: 'C202',
          reason: 'Change of roommate',
          status: 'pending'
        }
      ]
    }
  },
  methods: {
    approveRequest(index) {
      this.students[index].status = 'approved';
    },
    rejectRequest(index) {
      this.students[index].status = 'rejected';
    }
  }
}
</script>

<style scoped>
.room-change-container {
  display: flex;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.approval-section {
  flex: 2;
}

.images-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.room-change-approval {
  font-family: 'Arial', sans-serif;
}

.approval-title {
  color: #1BBC9B;
  padding-bottom: 10px;
  border-bottom: 3px solid #1BBC9B;
  margin-bottom: 20px;
  font-size: 35px;
  text-align: center;
}

.approval-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.approval-item {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 15px;
  border-left: 5px solid transparent;
  transition: all 0.3s ease;
}

.approval-item.approved {
  border-left: 5px solid #1BBC9B;
}

.approval-item.rejected {
  border-left: 5px solid #e74c3c;
}

.student-info {
  flex: 1;
}

.student-info h3 {
  margin-top: 0;
  color: #2c3e50;
}

.student-info p {
  margin: 5px 0;
  color: #555;
}

.approval-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding-left: 15px;
  min-width: 120px;
}

.approve-btn, .reject-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.approve-btn {
   color: #1BBC9B;
  border:2px solid #1BBC9B;
  background-color: #fff;
  font-size: 17px;
  margin-right: 40px;
  border-radius: 10px;
}

.approve-btn:hover {
  background-color: #16a085;
  color:white;
}

.reject-btn {
   color: #fa2929;
  border:2px solid #fa2929;
  background-color: #fff;
  font-size: 17px;
  margin-right: 40px;
  border-radius: 10px;
}

.reject-btn:hover {
  background-color: #c0392b;
  color:white;
}

.status-text {
  padding: 8px 15px;
  border-radius: 4px;
  font-weight: bold;
  text-align: center;
}

.approval-item.approved .status-text {
  color: #1BBC9B;
  background-color: rgba(27, 188, 155, 0.1);
}

.approval-item.rejected .status-text {
  color: #e74c3c;
  background-color: rgba(231, 76, 60, 0.1);
}

.hostel-image {
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.hostel-image img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.hostel-image img:hover {
  transform: scale(1.03);
}

.image-caption {
  text-align: center;
  margin-top: 8px;
  font-weight: 500;
  color: #2c3e50;
}

@media (max-width: 900px) {
  .room-change-container {
    flex-direction: column;
  }
  
  .images-section {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .hostel-image {
    flex: 1 1 45%;
    min-width: 200px;
  }
}

@media (max-width: 600px) {
  .hostel-image {
    flex: 1 1 100%;
  }
}
</style>