<template>
  <Navbar_Warden />

  <div class="complaints-container">
    <div class="filter-container">
      <label for="statusFilter">Filter by Status:</label>
      <select id="statusFilter" v-model="filterStatus">
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>

      <input type="text" v-model="searchQuery" placeholder="Search complaints..." />
    </div>

    <div class="complaints-list">
      <div
        v-for="complaint in filteredComplaints"
        :key="complaint.id"
        class="complaint-card"
      >
        <h2>{{ complaint.category }}</h2>
        <p><strong>Student:</strong> {{ complaint.studentName }}</p>
        <p><strong>Room:</strong> {{ complaint.room }}</p>
        <p><strong>Date:</strong> {{ formatDate(complaint.date) }}</p>
        <p><strong>Status:</strong> {{ complaint.status }}</p>
        <p><strong>Description:</strong> {{ complaint.description }}</p>

        <label for="staff">Assign Staff:</label>
        <select v-model="complaint.assignedStaff">
          <option value="">Select Staff</option>
          <option value="Electrician">Electrician</option>
          <option value="Plumber">Plumber</option>
          <option value="Carpenter">Carpenter</option>
        </select>

        <label for="status">Update Status:</label>
        <select v-model="complaint.status">
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <label for="resolutionNotes">Resolution Notes:</label>
        <textarea
          v-model="complaint.resolutionNotes"
          placeholder="Add notes..."
        ></textarea>

        <button @click="updateComplaint(complaint)">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar_Warden from '@/components/Navbar_Warden.vue';
import axios from 'axios';

export default {
  components: {
    Navbar_Warden
  },
  data() {
    return {
      complaints: [],
      filterStatus: 'all',
      searchQuery: '',
      loading: false,
      error: ''
    };
  },
  computed: {
    filteredComplaints() {
      return this.complaints.filter((complaint) => {
        const matchesStatus =
          this.filterStatus === 'all' || complaint.status === this.filterStatus;
        const matchesSearch =
          complaint.category?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          complaint.studentName?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          complaint.description?.toLowerCase().includes(this.searchQuery.toLowerCase());

        return matchesStatus && matchesSearch;
      });
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },

    async fetchComplaints() {
      this.loading = true;
      this.error = '';
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.token) {
          throw new Error('No token found in localStorage');
        }

        const res = await axios.get('/api/v1/warden/complaints', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

        this.complaints = res.data.data.map((c, index) => ({
          id: c._id || `CB2023${index + 1}`,
          studentName: c.submittedBy?.fullName || 'Unknown',
          room: c.submittedBy?.room || 'Not specified',
          category: c.category || 'General',
          date: c.createdAt,
          status: c.status,
          assignedStaff: c.assignedStaff || '',
          description: c.description || '',
          resolutionNotes: c.resolutionNotes || ''
        }));
      } catch (err) {
        console.error('❌ Error fetching complaints:', err);
        this.error = err?.response?.data?.message || 'Failed to load complaints.';
        alert(this.error);
      } finally {
        this.loading = false;
      }
    },

    async updateComplaint(complaint) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.token) {
          throw new Error('No token found in localStorage');
        }

        await axios.patch(
          `/api/v1/warden/complaints/${complaint.id}`,
          {
            status: complaint.status,
            assignedStaff: complaint.assignedStaff,
            resolutionNotes: complaint.resolutionNotes
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        );

        alert('Complaint updated successfully.');
      } catch (err) {
        console.error('❌ Error updating complaint:', err);
        const errorMessage = err?.response?.data?.message || 'Failed to update complaint.';
        alert(errorMessage);
      }
    }
  },

  mounted() {
    this.fetchComplaints();
  }
};
</script>



<style scoped>
.complaints-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
}
.filter-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.filter-container input,
.filter-container select {
  padding: 0.5rem;
  font-size: 16px;
}
.complaints-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.complaint-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
}
.complaint-card h2 {
  margin-bottom: 0.5rem;
}
.complaint-card p {
  margin: 0.2rem 0;
}
.complaint-card label {
  display: block;
  margin-top: 1rem;
  font-weight: bold;
}
.complaint-card select,
.complaint-card textarea {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.complaint-card button {
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.complaint-card button:hover {
  background: #43a047;
}
</style>
