<template>
  <Navbar_warden/>
  <div class="complaint-management-container">
    <div class="header">
      <h1>Complaint Management</h1>
      <div class="header-line"></div>
    </div>

    <div class="controls">
      <div class="filter-buttons">
        <button @click="setFilter('all')" :class="{ active: currentFilter === 'all' }">
          All ({{ complaints.length }})
        </button>
        <button @click="setFilter('pending')" :class="{ active: currentFilter === 'pending' }">
          Pending ({{ pendingCount }})
        </button>
        <button @click="setFilter('in-progress')" :class="{ active: currentFilter === 'in-progress' }">
          In Progress ({{ inProgressCount }})
        </button>
        <button @click="setFilter('resolved')" :class="{ active: currentFilter === 'resolved' }">
          Resolved ({{ resolvedCount }})
        </button>
      </div>

      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search complaints..."
          @input="handleSearch"/>
      </div>
    </div>

    <div class="complaints-grid">
      <div 
        class="complaint-card" 
        v-for="complaint in sortedAndFilteredComplaints" 
        :key="complaint.id"
        :class="complaint.status"
      >
        <div class="card-header">
          <span class="complaint-id">{{ complaint.id }}</span>
          <span :class="['status-badge', complaint.status]">
            {{ formatStatus(complaint.status) }}
          </span>
        </div>
        
        <div class="card-body">
          <div class="detail-row">
            <span class="detail-label">Student:</span>
            <span>{{ complaint.studentName }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Room:</span>
            <span>{{ complaint.room }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Category:</span>
            <span>{{ complaint.category }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Date:</span>
            <span>{{ formatDate(complaint.date) }}</span>
          </div>
          <div class="detail-row" v-if="complaint.assignedStaff">
            <span class="detail-label">Assigned To:</span>
            <span>{{ getStaffName(complaint.assignedStaff) }}</span>
          </div>
          <div class="detail-row description">
            <span class="detail-label">Description:</span>
            <p class="truncated-description">{{ complaint.description || 'No description provided' }}</p>
          </div>
        </div>

        <div class="card-footer">
          <div class="action-controls">
            <div class="staff-assignment">
              <label>Assign Staff:</label>
              <select 
                v-model="complaint.assignedStaff" 
                @change="updateAssignment(complaint)"
                :disabled="complaint.status === 'resolved'"
              >
                <option value="">Unassigned</option>
                <option 
                  v-for="staff in availableStaff(complaint)" 
                  :value="staff.id" 
                  :key="staff.id"
                >
                  {{ staff.name }} ({{ staff.expertise }})
                </option>
              </select>
            </div>
            
            <div class="status-controls">
              <label>Update Status:</label>
              <select 
                v-model="complaint.status" 
                @change="updateStatus(complaint)"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
          
          <button @click="showDetails(complaint)" class="details-btn">
            View Details
          </button>
        </div>
      </div>

      <div v-if="sortedAndFilteredComplaints.length === 0" class="no-results">
        No complaints found matching your criteria.
      </div>
    </div>

    <!-- Complaint Details Modal -->
    <div v-if="selectedComplaint" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Complaint Details</h2>
          <button @click="closeModal" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="detail-row">
            <span class="detail-label">ID:</span>
            <span>{{ selectedComplaint.id }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Student:</span>
            <span>{{ selectedComplaint.studentName }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Room:</span>
            <span>{{ selectedComplaint.room }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Category:</span>
            <span>{{ selectedComplaint.category }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Date Reported:</span>
            <span>{{ formatDate(selectedComplaint.date) }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Status:</span>
            <span :class="['status', selectedComplaint.status]">
              {{ formatStatus(selectedComplaint.status) }}
            </span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Assigned Staff:</span>
            <span v-if="selectedComplaint.assignedStaff">
              {{ getStaffName(selectedComplaint.assignedStaff) }}
            </span>
            <span v-else>Unassigned</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Description:</span>
            <p class="complaint-description">{{ selectedComplaint.description || 'No description provided' }}</p>
          </div>
          <div class="detail-row" v-if="selectedComplaint.resolutionNotes">
            <span class="detail-label">Resolution Notes:</span>
            <p class="resolution-notes">{{ selectedComplaint.resolutionNotes }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="closeModal" class="modal-btn">Close</button>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Navbar_warden from '../../../components/Navbar_warden.vue';
import Footer from '../../../components/Footer.vue';

export default {
  components: {
    Navbar_warden,
    Footer
  },
  data() {
    return {
      currentFilter: 'all',
      searchQuery: '',
      sortColumn: 'date',
      sortDirection: 'desc',
      selectedComplaint: null,
      staffMembers: [
        { id: 'ST001', name: 'Rajesh Kumar', expertise: 'Electrical' },
        { id: 'ST002', name: 'Priya Sharma', expertise: 'Plumbing' },
        { id: 'ST003', name: 'Amit Patel', expertise: 'Furniture' },
        { id: 'ST004', name: 'Neha Gupta', expertise: 'Cleaning' },
        { id: 'ST005', name: 'Vikram Joshi', expertise: 'Internet' }
      ],
      complaints: [
        { 
          id: 'CB2023001', 
          studentName: 'Rahul Sharma', 
          room: 'A-101', 
          category: 'Electrical', 
          date: '2023-07-10', 
          status: 'pending',
          assignedStaff: '',
          description: 'Lights in the room are not working properly, flickering continuously.',
        },
        { 
          id: 'CB2023002', 
          studentName: 'Priya Patel', 
          room: 'B-205', 
          category: 'Plumbing', 
          date: '2023-07-11', 
          status: 'in-progress',
          assignedStaff: 'ST002',
          description: 'Water leakage from the bathroom faucet, causing water wastage.',
        },
        { 
          id: 'CB2023003', 
          studentName: 'Amit Singh', 
          room: 'C-302', 
          category: 'Furniture', 
          date: '2023-07-12', 
          status: 'resolved',
          assignedStaff: 'ST003',
          description: 'Study table drawer is stuck and cannot be opened properly.',
        },
        { 
          id: 'CB2023004', 
          studentName: 'Neha Gupta', 
          room: 'A-102', 
          category: 'Cleaning', 
          date: '2023-07-13', 
          status: 'pending',
          assignedStaff: '',
          description: 'Room needs urgent cleaning, dust accumulation causing allergies.',
        },
        { 
          id: 'CB2023005', 
          studentName: 'Vikram Joshi', 
          room: 'D-401', 
          category: 'Internet', 
          date: '2023-07-14', 
          status: 'in-progress',
          assignedStaff: 'ST005',
          description: 'WiFi connection drops frequently in this room, needs troubleshooting.',
        },
        { 
          id: 'CB2023006', 
          studentName: 'Sanjay Verma', 
          room: 'E-105', 
          category: 'Electrical', 
          date: '2023-07-15', 
          status: 'pending',
          assignedStaff: '',
          description: 'Power socket not working in the study area.',
        },
      ]
    }
  },
  computed: {
    pendingCount() {
      return this.complaints.filter(c => c.status === 'pending').length;
    },
    inProgressCount() {
      return this.complaints.filter(c => c.status === 'in-progress').length;
    },
    resolvedCount() {
      return this.complaints.filter(c => c.status === 'resolved').length;
    },
    filteredComplaints() {
      let filtered = this.complaints;
      
      if (this.currentFilter !== 'all') {
        filtered = filtered.filter(complaint => complaint.status === this.currentFilter);
      }
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(complaint => 
          complaint.studentName.toLowerCase().includes(query) || 
          complaint.id.toLowerCase().includes(query) ||
          complaint.category.toLowerCase().includes(query) ||
          (complaint.assignedStaff && this.getStaffName(complaint.assignedStaff).toLowerCase().includes(query))
        );
      }
      
      return filtered;
    },
    sortedAndFilteredComplaints() {
      return [...this.filteredComplaints].sort((a, b) => {
        let modifier = 1;
        if (this.sortDirection === 'desc') modifier = -1;
        
        if (this.sortColumn === 'date') {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return (dateA - dateB) * modifier;
        }
        
        if (a[this.sortColumn] < b[this.sortColumn]) return -1 * modifier;
        if (a[this.sortColumn] > b[this.sortColumn]) return 1 * modifier;
        return 0;
      });
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
    formatStatus(status) {
      return status.replace('-', ' ');
    },
    getStaffName(staffId) {
      const staff = this.staffMembers.find(s => s.id === staffId);
      return staff ? `${staff.name} (${staff.expertise})` : 'Unknown';
    },
    availableStaff(complaint) {
      return this.staffMembers.filter(staff => 
        staff.expertise.toLowerCase() === complaint.category.toLowerCase()
      );
    },
    updateStatus(complaint) {
      console.log(`Updating status for ${complaint.id} to ${complaint.status}`);
      
      if (complaint.status === 'resolved') {
        complaint.assignedStaff = '';
      }
    },
    updateAssignment(complaint) {
      console.log(`Assigned staff ${complaint.assignedStaff} to complaint ${complaint.id}`);
      
      if (complaint.assignedStaff && complaint.status === 'pending') {
        complaint.status = 'in-progress';
      }
    },
    showDetails(complaint) {
      this.selectedComplaint = complaint;
    },
    closeModal() {
      this.selectedComplaint = null;
    },
    },
  }
</script>

<style scoped>
.complaint-management-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1400px;
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
  font-size: 2.8rem;
  margin-bottom: 10px;
  font-weight: 600;
  padding-bottom: 10px;
}

.header-line {
  height: 4px;
  background-color: #1BBC9B;
  width: 1250px;
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
  margin-right: 0;
}

.filter-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color:white;
  color: #1BBC9B;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border:2px solid #1BBC9B;
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
  position:relative;
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

.complaints-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.complaint-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.complaint-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.complaint-card.pending {
  border-left-color: #e61919;
}

.complaint-card.in-progress {
  border-left-color: #1565c0;
}

.complaint-card.resolved {
  border-left-color: #2e7d32;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eee;
}

.complaint-id {
  font-weight: 600;
  color: #1BBC9B;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-badge.pending {
  background-color: #fff3e0;
  color: #e65100;
}

.status-badge.in-progress {
  background-color: #e3f2fd;
  color: #1565c0;
}

.status-badge.resolved {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.card-body {
  padding: 15px;
  flex-grow: 1;
}

.detail-row {
  display: flex;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.detail-row.description {
  flex-direction: column;
  margin-top: 15px;
}

.detail-label {
  font-weight: 600;
  min-width: 100px;
  color: #666;
}

.truncated-description {
  margin: 5px 0 0;
  color: #555;
  line-height: 1.4;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-footer {
  padding: 15px;
  background-color: #f5f5f5;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.action-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.staff-assignment, .status-controls {
  flex: 1;
  min-width: 150px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #555;
}

select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.85rem;
  background-color: white;
  cursor: pointer;
}

select:focus {
  border-color: #1BBC9B;
  outline: none;
  box-shadow: 0 0 0 2px rgba(27, 188, 155, 0.2);
}

select:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.details-btn {
  align-self: flex-end;
  padding: 8px 16px;
  background-color: #1BBC9B;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background-color 0.2s;
  margin-left: auto;
}

.details-btn:hover {
  background-color: #17a789;
}

.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
  color: #777;
  font-style: italic;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 8px 8px 0 0;
}

.modal-header h2 {
  color: #1BBC9B;
  margin: 0;
  font-size: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #777;
  padding: 0 5px;
}

.close-btn:hover {
  color: #333;
}

.modal-body {
  padding: 20px;
}

.complaint-description, .resolution-notes {
  margin: 5px 0 0;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  line-height: 1.5;
}

.resolution-notes {
  background-color: #e8f5e9;
}

.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  background-color: #f9f9f9;
  border-radius: 0 0 8px 8px;
}

.modal-btn {
  padding: 8px 16px;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.modal-btn.primary {
  background-color: #1BBC9B;
  color: white;
}

.modal-btn:hover {
  background-color: #e0e0e0;
}

.modal-btn.primary:hover {
  background-color: #17a789;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .complaints-grid {
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
  
  .action-controls {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .detail-row {
    flex-direction: column;
    gap: 2px;
  }
  
  .detail-label {
    min-width: auto;
  }
  
  .modal-content {
    width: 95%;
  }
  
  .modal-footer{
    flex-direction: column;
  }
  .modal-btn{
width: 100%;
  }
}
</style>