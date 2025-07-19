<template>
  <Navbar_warden/>
  <div class="payment-tracking-container">
    <div class="header">
      <h1>Payment Tracking</h1>
      <div class="header-line"></div>
    </div>

    <div class="controls">
      <div class="filter-buttons">
        <button @click="setFilter('all')" :class="{ active: currentFilter === 'all' }">
          All ({{ students.length }})
        </button>
        <button @click="setFilter('paid')" :class="{ active: currentFilter === 'paid' }">
          Paid ({{ paidCount }})
        </button>
        <button @click="setFilter('unpaid')" :class="{ active: currentFilter === 'unpaid' }">
          Unpaid ({{ unpaidCount }})
        </button>
      </div>

      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search by name or ID..."/> 
      </div>
    </div>

    <div class="students-grid">
      <div 
        class="payment-card" 
        v-for="student in filteredStudents" 
        :key="student.id"
        :class="student.status"
      >
        <div class="card-header">
          <span class="student-id">{{ student.id }}</span>
          <span :class="['payment-status', student.status]">
            {{ student.status === 'paid' ? 'Paid' : 'Unpaid' }}
          </span>
        </div>

        <div class="card-body">
          <div class="student-info">
            <div class="info-row">
              <span class="label">Name:</span>
              <span class="value">{{ student.name }}</span>
            </div>
            <div class="info-row">
              <span class="label">Room:</span>
              <span class="value">{{ student.room }}</span>
            </div>
            <div class="info-row">
              <span class="label">Amount:</span>
              <span class="value">₹{{ student.amount.toLocaleString() }}</span>
            </div>
            <div class="info-row">
              <span class="label">Due Date:</span>
              <span class="value">{{ formatDate(student.dueDate) }}</span>
            </div>
          </div>
        </div>

        <div class="card-footer">
          <button 
            @click="updatePaymentStatus(student)"
            class="status-btn"
            :class="student.status">
            Mark as {{ student.status === 'paid' ? 'Unpaid' : 'Paid' }}
          </button>
          <button @click="sendReminder(student)" class="reminder-btn" v-if="student.status === 'unpaid'">
            Send Reminder
          </button>
        </div>
      </div>

      <div v-if="filteredStudents.length === 0" class="no-results">
        No students found matching your criteria.
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Footer from '../../../components/Footer.vue';
import Navbar_warden from '../../../components/Navbar_warden.vue';

export default {
  
  components:{
    Navbar_warden,Footer
  },data() {
    return {
      currentFilter: 'all',
      searchQuery: '',
      students: [
        { id: '3001', name: 'Rahul Sharma', room: 'A-101', amount: 12000, dueDate: '2023-07-15', status: 'paid' },
        { id: '3002', name: 'Priya ', room: 'B-205', amount: 12000, dueDate: '2023-07-15', status: 'unpaid' },
        { id: '3003', name: 'Jenny', room: 'C-302', amount: 12000, dueDate: '2023-07-15', status: 'paid' },
        { id: '3004', name: 'Neha', room: 'A-102', amount: 12000, dueDate: '2023-07-15', status: 'unpaid' },
        { id: '3005', name: 'Mallika', room: 'D-401', amount: 12000, dueDate: '2023-07-15', status: 'paid' },
      ]
    }
  },
  computed: {
    paidCount() {
      return this.students.filter(s => s.status === 'paid').length;
    },
    unpaidCount() {
      return this.students.filter(s => s.status === 'unpaid').length;
    },
    filteredStudents() {
      let filtered = this.students;
      
      if (this.currentFilter !== 'all') {
        filtered = filtered.filter(student => student.status === this.currentFilter);
      }
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(student => 
          student.name.toLowerCase().includes(query) || 
          student.id.toLowerCase().includes(query)
        );
      }
      
      return filtered;
    }
  },
  methods: {
    setFilter(filter) {
      this.currentFilter = filter;
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    },
    updatePaymentStatus(student) {
      student.status = student.status === 'paid' ? 'unpaid' : 'paid';
      // Here you would typically make an API call to update the status
      console.log(`Updated ${student.name}'s payment status to ${student.status}`);
    },
    sendReminder(student) {
      // Here you would typically trigger a reminder email/SMS
      console.log(`Sending payment reminder to ${student.name}`);
      alert(`Reminder sent to ${student.name} (${student.id}) about unpaid fee of ₹${student.amount}`);
    }
  }
}
</script>

<style scoped>
.payment-tracking-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  width:1000px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
}

.header {
  margin-bottom: 30px;
  text-align: center;
}

.header h1 {
  color: #1BBC9B;
  font-size: 2.2rem;
  margin-bottom: 10px;
  font-weight: 600;
}

.header-line {
  height: 3px;
  background-color: #1BBC9B;
  width: 1050px;
  margin: 0 auto;
  border-radius: 2px;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  gap: 15px;
}

.filter-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: white;
  border:2px solid #1BBC9B;
  color: #1BBC9B;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.filter-buttons button.active {
  background-color: #1BBC9B;
  color: white;
}

.filter-buttons button:hover {
  background-color: #17a789;
  color: white;
}

.search-box {
  position: relative;
  min-width: 250px;
  flex-grow: 1;
  max-width: 400px;
}

.search-box input {
  width: 100%;
  padding: 10px 15px 10px 35px;
  border: 2px solid #1BBC9B;
  border-radius: 25px;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.3s;
}

.search-box input:focus {
  border-color: #1BBC9B;
  box-shadow: 0 0 0 2px rgba(27, 188, 155, 0.2);
}
 
.students-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.payment-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}
.payment-card {
  border-left: 4px solid #1BBC9B; 
}

.payment-card.paid {
  border-left-color: #2e7d32; 
}

.payment-card.unpaid {
  border-left-color: #c62828;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eee;
}

.student-id {
  font-weight: 600;
  color: #1BBC9B;
}

.payment-status {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize;
}

.payment-status.paid {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.payment-status.unpaid {
  background-color: #ffebee;
  color: #c62828;
}

.card-body {
  padding: 15px;
}

.student-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-row {
  display: flex;
  text-align: left;
}

.label {
  font-weight: 600;
  color: #666;
}

.value {
  text-align: left;
  margin-left: 20px;
}

.card-footer {
  padding: 15px;
  background-color: #f5f5f5;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
}

.status-btn {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.status-btn.paid {
  background-color: #ffebee;
  color: #c62828;
}

.status-btn.unpaid {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-btn:hover {
  opacity: 0.9;
}

.reminder-btn {
  padding: 8px 12px;
  background-color: #1BBC9B;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.reminder-btn:hover {
  background-color: #17a789;
}

.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
  color: #777;
  font-style: italic;
}

@media (max-width: 768px) {
  .students-grid {
    grid-template-columns: 1fr;
  }
  
  .controls {
    flex-direction: column;
  }
  
  .filter-buttons {
    justify-content: center;
  }
  
  .search-box {
    width: 100%;
  }
  
  .card-footer {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .info-row {
    flex-direction: column;
    gap: 2px;
  }
  
  .label, .value {
    text-align: left;
  }
}
</style>