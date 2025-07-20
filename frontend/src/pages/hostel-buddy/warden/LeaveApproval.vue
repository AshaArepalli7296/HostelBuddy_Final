<template>
  <Navbar_warden/>
  <div class="leave-approval-container">
    <h2 class="approval-title">Leave Approval Requests</h2>
    <div class="leave-approval-content">
      <div class="requests-section">
        <div 
          v-for="(request, index) in leaveRequests" 
          :key="request.id"
          class="leave-request"
          :class="{
            'approved': request.status === 'approved',
            'rejected': request.status === 'rejected'
          }"
        >
          <div class="request-info">
            <h3>{{ request.studentName }}</h3>
            <p><strong>Room No:</strong> {{ request.roomNo }}</p>
            <p><strong>Leave Type:</strong> {{ request.leaveType }}</p>
            <p><strong>From:</strong> {{ request.startDate }} <strong>To:</strong> {{ request.endDate }}</p>
            <p><strong>Reason:</strong> {{ request.reason }}</p>
          </div>
          <div class="request-actions">
            <template v-if="request.status === 'pending'">
              <button class="approve-btn" @click="approveLeave(index)">Approve</button>
              <button class="reject-btn" @click="rejectLeave(index)">Reject</button>
            </template>
            <div v-else class="status-display">
              {{ request.status.toUpperCase() }}
            </div>
          </div>
        </div>
      </div>
      
      <div class="approval-image">
        <img src="@/assets/images/approve&reject.jpg" alt="Approval Status Illustration">
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Navbar_warden from '../../../components/Navbar_warden.vue';
import Footer from '../../../components/Footer.vue';

export default {
  name: 'LeaveApproval',
  components :{
    Navbar_warden,Footer
  },
  data() {
    return {
      leaveRequests: [
        {
          id: 1,
          studentName: 'Rahul',
          roomNo: 'B-205',
          leaveType: 'Emergency',
          startDate: '2023-06-15',
          endDate: '2023-06-18',
          reason: 'Family emergency',
          status: 'pending'
        },
        {
          id: 2,
          studentName: 'Priya',
          roomNo: 'A-104',
          leaveType: 'Vacation',
          startDate: '2023-06-20',
          endDate: '2023-06-25',
          reason: 'Going home for sister\'s wedding',
          status: 'pending'
        },
        {
          id: 3,
          studentName: 'John',
          roomNo: 'C-302',
          leaveType: 'Medical',
          startDate: '2023-06-12',
          endDate: '2023-06-14',
          reason: 'Hospital appointment',
          status: 'pending'
        },
        {
          id: 4,
          studentName: 'Neha Gupta',
          roomNo: 'D-107',
          leaveType: 'Personal',
          startDate: '2023-06-17',
          endDate: '2023-06-17',
          reason: 'Personal work in city',
          status: 'pending'
        }
      ]
    }
  },
  methods: {
    approveLeave(index) {
      this.leaveRequests[index].status = 'approved';
    },
    rejectLeave(index) {
      this.leaveRequests[index].status = 'rejected';
    }
  }
}
</script>

<style scoped>
.leave-approval-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.approval-title {
  color: #1BBC9B;
  padding-bottom: 10px;
  border-bottom: 3px solid #1BBC9B;
  margin-bottom: 25px;
  font-size: 35px;
  text-align: center;
}
.approval-title{
 padding-bottom: 10px;
  border-bottom: 3px solid #1BBC9B;
  margin-bottom: 25px;
  width:800px;
}
.leave-approval-content {
  display: flex;
  gap: 30px;
}

.requests-section {
  flex: 2;
}

.approval-image {
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 20px;
}

.approval-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  }

.leave-request {
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-left: 5px solid transparent;
  display: flex;
  justify-content: space-between;
  transition: all 0.3s ease;
}

.leave-request.approved {
  border-left-color: #1BBC9B;
}

.leave-request.rejected {
  border-left-color: #e74c3c;
}

.request-info {
  flex: 1;
}

.request-info h3 {
  margin-top: 0;
  color: #2c3e50;
}

.request-info p {
  margin: 5px 0;
  color: #555;
}

.request-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  min-width: 120px;
}

.approve-btn, .reject-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
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

.status-display {
  padding: 8px 15px;
  border-radius: 4px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.leave-request.approved .status-display {
  color: #1BBC9B;
  background-color: rgba(27, 188, 155, 0.1);
}

.leave-request.rejected .status-display {
  color: #e74c3c;
  background-color: rgba(231, 76, 60, 0.1);
}

@media (max-width: 768px) {
  .leave-approval-content {
    flex-direction: column;
  }
  
  .approval-image {
    order: -1;
    margin-bottom: 20px;
  }
  
  .approval-image img {
    max-width: 300px;
  }
}
</style>