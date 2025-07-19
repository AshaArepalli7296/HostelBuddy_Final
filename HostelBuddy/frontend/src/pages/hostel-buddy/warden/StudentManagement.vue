<template>
  <Navbar_warden/>
 <div class="student-management">
    <h1 class="title">Student Management</h1>

    <div class="controls">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by name, roll, room..."
        class="search-box"
      />
      <select v-model="filterStatus">
        <option value="">All Statuses</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        <option value="On Leave">On Leave</option>
        <option value="Mess Off">Mess Off</option>
        <option value="Pending">Pending</option>
      </select>
      <button class="btn" @click="openAddModal">+ Add Student</button>
    </div>

    <table class="student-table">
      <thead>
        <tr>
          <th>Student</th>
          <th>Course</th>
          <th>Room</th>
          <th>Status</th>
         
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in filteredStudents" :key="student.roll">
          <td>
            <div class="student-info">
              <!-- <img :src="`https://ui-avatars.com/api/?name=${student.name}&background=4CAF50&color=fff&rounded=true&size=50`" :alt="student.name"  /> -->
               <img 
                  :src="`https://ui-avatars.com/api/?name=${student.name}&background=1BBC9B&color=fff&rounded=true&size=50`" 
                  :alt="student.name" 
                  class="student-avatar"
                />
              <div>
                <div>{{ student.name }}</div>
                <small>{{ student.roll }}</small>
                
              </div>
            </div>
          </td>
          <td>{{ student.course }}<br /><small>{{ student.year }}</small></td>
          <td>{{ student.room }}<br /><small>{{ student.warden }}</small></td>
          <td>
            <span :class="['status', student.status.toLowerCase().replace(' ', '-')]">
              {{ student.status }}
            </span>
          </td>
          
        </tr>
      </tbody>
    </table>

    <div v-if="showAddModal" class="modal">
      <div class="modal-box">
        <h2>Add New Student</h2>
        <form @submit.prevent="addStudent">
          <div class="form-columns">
            <input v-model="form.name" required placeholder="Full Name" />
            <input v-model="form.roll" required placeholder="Roll Number" />
            <select v-model="form.gender">
              <option>Male</option>
              <option>Female</option>
            </select>
            <input v-model="form.course" required placeholder="Course" />
            <select v-model="form.year">
              <option>Year 1</option>
              <option>Year 2</option>
              <option>Year 3</option>
              <option>Year 4</option>
            </select>
            <input v-model="form.room" required placeholder="Room Number" />
            <select v-model="form.status">
              <option>Active</option>
              <option>Inactive</option>
              <option>On Leave</option>
              <option>Mess Off</option>
              <option>Pending</option>
            </select>
            <input v-model="form.phone" placeholder="Phone" />
            <input v-model="form.email" placeholder="Email" />
            <input v-model="form.warden" placeholder="Assign Warden (Optional)" />
          </div>
          <div class="modal-actions">
            <button type="button" class="cancel-btn" @click="showAddModal = false">Cancel</button>
            <button type="submit" class="submit-btn">Create Student</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <Footer/>
</template>
<script>
import Navbar_warden from '../../../components/Navbar_warden.vue';
import Footer from '../../../components/Footer.vue';

export default {
   components:{
    Navbar_warden,Footer
  },data() {
    return {
      searchQuery: '',
      filterStatus: '',
      showAddModal: false,
      form: {
        name: '',
        roll: '',
        gender: 'Male',
        course: '',
        year: 'Year 1',
        room: '',
        status: 'Active',
        phone: '',
        email: '',
        warden: '',
      },
      students: [
        {
          name: 'Alice Johnson',
          roll: 'S2024001',
          gender: 'Female',
          course: 'Computer Science',
          year: 'Year 3',
          room: 'A-101',
          warden: 'Mr. Smith',
          status: 'Active',
        },
        {
          name: 'Bob Williams',
          roll: 'S2024002',
          gender: 'Male',
          course: 'Mathematics',
          year: 'Year 4',
          room: 'A-102',
          warden: 'Mr. Smith',
          status: 'Active',
        },
        {
          name: 'Charlie Brown',
          roll: 'S2024003',
          gender: 'Male',
          course: 'Physics',
          year: 'Year 2',
          room: 'B-201',
          warden: 'Mrs. Jones',
          status: 'Inactive',
        },
        {
          name: 'Diana Prince',
          roll: 'S2024004',
          gender: 'Female',
          course: 'History',
          year: 'Year 3',
          room: 'B-202',
          warden: 'Mrs. Jones',
          status: 'On Leave',
        },
        {
          name: 'Ethan Hunt',
          roll: 'S2024005',
          gender: 'Male',
          course: 'Chemistry',
          year: 'Year 1',
          room: 'C-101',
          warden: 'Mr. Davis',
          status: 'Pending',
        },
        {
          name: 'Fiona Glenanne',
          roll: 'S2024006',
          gender: 'Female',
          course: 'Literature',
          year: 'Year 2',
          room: 'C-301',
          warden: 'Mr. Davis',
          status: 'Mess Off',
        },
      ],
    };
  },
  computed: {
    filteredStudents() {
      return this.students.map((student, index) => ({
        ...student,
        avatar: this.getAvatarUrl(student, index)
      })).filter(
        (s) =>
          (!this.filterStatus || s.status === this.filterStatus) &&
          (s.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          s.roll.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          s.room.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    },
  },
  methods: {
    getAvatarUrl(student, index) {
     
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=4CAF50&color=fff&rounded=true&size=50`;
      
      
    },
    openAddModal() {
      this.showAddModal = true;
      this.form = {
        name: '',
        roll: '',
        gender: 'Male',
        course: '',
        year: 'Year 1',
        room: '',
        status: 'Active',
        phone: '',
        email: '',
        warden: '',
      };
    },
    addStudent() {
      const newStudent = { 
        ...this.form,
        
        avatar: this.getAvatarUrl(this.form, this.students.length)
      };
      this.students.push(newStudent);
      this.showAddModal = false;
    },
  },
};
</script>
  

<style scoped>
.student-management {
  padding: 1.5rem;
  color: #333;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 50vh;
  min-width: 300px;
  /* background: linear-gradient(rgba(59, 57, 57, 0.9), rgba(255, 255, 255, 0.9)), 
              url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80') no-repeat center center fixed; */
  background-size: cover;
  max-width: 800px;
  margin: 0 auto;
}

.title {
  color: #1BBC9B;
  text-align: center;
  margin-bottom: 25px;
  font-size: 2.2rem;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

.controls {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  align-items: center;
  flex-wrap: wrap;
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.search-box {
  flex: 1;
  padding: 10px 15px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  transition: all 0.3s;
}

.search-box:focus {
  border-color: #1BBC9B;
  outline: none;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

select {
  padding: 10px 15px;
  border-radius: 6px;
  border: 1px solid #1BBC9B;
  background-color:#1BBC9B;
  font-size: 14px;
  cursor: pointer;
  color:white;
}

.btn {
  background-color: #1BBC9B;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.btn:hover {
  background-color: #1BBC9B;
  transform: translateY(-1px);
}

.student-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.student-table th {
  background-color: #1BBC9B;
  color: white;
  padding: 15px;
  text-align: left;
  font-weight: 500;
}

.student-table td {
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.student-table tr:last-child td {
  border-bottom: none;
}

.student-table tr:hover {
  background-color: #f5f5f5;
}

.student-info {
  display: flex;
  gap: 12px;
  align-items: center;
}

.student-info img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid  #1BBC9B;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  background-color: #1BBC9B;
}

.student-info div {
  line-height: 1.4;
}

.student-info small {
  color: white;
  font-size: 0.85rem;
}

.status {
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 500;
  display: inline-block;
  font-size: 13px;
  min-width: 80px;
  text-align: center;
}

.status.active {
  background-color: #e8f5e9;
  color: #1BBC9B;
}

.status.inactive {
  background-color: #ffebee;
  color: #c62828;
}

.status.on-leave {
  background-color: #fff3e0;
  color: #ef6c00;
}

.status.mess-off {
  background-color: #f3e5f5;
  color: #7b1fa2;
}

.status.pending {
  background-color: #e3f2fd;
  color: #1565c0;
}

.action-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #666;
  padding: 5px 10px;
  border-radius: 4px;
}

.action-btn:hover {
  background-color: #f0f0f0;
  color: #1BBC9B;
}

.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
}

.modal-box {
  background: white;
  padding: 30px;
  width: 650px;
  max-width: 90%;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.modal-box h2 {
  color: #1BBC9B;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.form-columns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin: 20px 0;
}

input, select {
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  transition: all 0.3s;
}

input:focus, select:focus {
  border-color: #1BBC9B;
  outline: none;
  box-shadow: 0 0 0 2px #1BBC9B
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
}

.cancel-btn {
  padding: 10px 20px;
  background-color: white;
  color: #1BBC9B;
  border-color: #1BBC9B;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.cancel-btn:hover {
  background-color: #1BBC9B;
  color: white;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #1BBC9B;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover {
  background-color: #1BBC9B;
  transform: translateY(-1px);
}
</style>