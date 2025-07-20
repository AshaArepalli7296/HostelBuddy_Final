<template>
  <div class="hostel-occupancy-page">
    <Navbar_warden />
    <main class="main-content">
      <div class="container">
        <!-- Page Header -->
        <div class="page-header">
          <h1>Hostel Occupancy</h1>
          <div class="header-actions">
            <select v-model="selectedBuilding" class="building-select">
              <option value="all">All Buildings</option>
              <option v-for="building in buildings" :key="building" :value="building">
                {{ building }}
              </option>
            </select>
            <button @click="refreshData" class="refresh-btn">
              <i class="fas fa-sync-alt"></i> Refresh
            </button>
          </div>
        </div>

        <!-- Statistics Cards -->
        <div class="stats-cards">
          <div class="stat-card">
            <div class="stat-content">
              <h3>Total Rooms</h3>
              <p class="stat-value">{{ stats.totalRooms }}</p>
            </div>
            <div class="stat-icon">
              <i class="fas fa-door-open"></i>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-content">
              <h3>Occupied</h3>
              <p class="stat-value">{{ stats.occupiedRooms }}</p>
              <p class="stat-percent">{{ stats.occupancyRate }}%</p>
            </div>
            <div class="stat-icon">
              <i class="fas fa-bed"></i>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-content">
              <h3>Vacant</h3>
              <p class="stat-value">{{ stats.vacantRooms }}</p>
              <p class="stat-percent">{{ stats.vacancyRate }}%</p>
            </div>
            <div class="stat-icon">
              <i class="fas fa-home"></i>
            </div>
          </div>
        </div>

        <!-- Heatmap Visualization -->
        <div class="heatmap-section">
          <h2>Occupancy Heatmap</h2>
          <div class="heatmap-container">
            <div class="heatmap-legend">
              <div class="legend-item">
                <span class="legend-color vacant"></span>
                <span>Vacant (0%)</span>
              </div>
              <div class="legend-item">
                <span class="legend-color low"></span>
                <span>Low (1-33%)</span>
              </div>
              <div class="legend-item">
                <span class="legend-color medium"></span>
                <span>Medium (34-66%)</span>
              </div>
              <div class="legend-item">
                <span class="legend-color high"></span>
                <span>High (67-99%)</span>
              </div>
              <div class="legend-item">
                <span class="legend-color full"></span>
                <span>Full (100%)</span>
              </div>
            </div>
            <div class="heatmap">
              <div 
                v-for="floor in filteredFloors" 
                :key="floor.number" 
                class="floor"
              >
                <h3>Floor {{ floor.number }}</h3>
                <div class="rooms-row">
                  <div 
                    v-for="room in floor.rooms" 
                    :key="room.number"
                    class="room"
                    :class="getOccupancyClass(room)"
                    @click="showRoomDetails(room)"
                    :title="`${room.number}: ${room.occupants.length}/${room.capacity} (${Math.round((room.occupants.length / room.capacity) * 100)}%)`"
                  >
                    {{ room.number }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Vacancy List -->
        <div class="vacancy-list">
          <h2>Vacancy Status</h2>
          <table>
            <thead>
              <tr>
                <th>Room No</th>
                <th>Building</th>
                <th>Floor</th>
                <th>Capacity</th>
                <th>Occupants</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="room in filteredRooms" :key="room.id">
                <td>{{ room.number }}</td>
                <td>{{ room.building }}</td>
                <td>Floor {{ room.floor }}</td>
                <td>{{ room.capacity }}</td>
                <td>{{ room.occupants.length }}</td>
                <td>
                  <span class="status-badge" :class="getStatusClass(room)">
                    {{ getStatusText(room) }}
                  </span>
                </td>
                <td>
                  <button 
                    @click="allocateRoom(room)" 
                    class="action-btn small"
                    :disabled="room.occupants.length >= room.capacity"
                  >
                    Allocate
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
    <Footer />

    <!-- Room Details Modal -->
    <div v-if="selectedRoom" class="modal">
      <div class="modal-content">
        <span class="close" @click="selectedRoom = null">&times;</span>
        <h2>Room {{ selectedRoom.number }} Details</h2>
        <div class="room-details">
          <div class="detail-item">
            <label>Building:</label>
            <p>{{ selectedRoom.building }}</p>
          </div>
          <div class="detail-item">
            <label>Floor:</label>
            <p>Floor {{ selectedRoom.floor }}</p>
          </div>
          <div class="detail-item">
            <label>Capacity:</label>
            <p>{{ selectedRoom.capacity }}</p>
          </div>
          <div class="detail-item">
            <label>Current Occupants:</label>
            <p>{{ selectedRoom.occupants.length }}</p>
          </div>
          <div class="detail-item">
            <label>Occupancy Rate:</label>
            <p>{{ Math.round((selectedRoom.occupants.length / selectedRoom.capacity) * 100) }}%</p>
          </div>
        </div>
        <div class="occupants-list" v-if="selectedRoom.occupants.length > 0">
          <h3>Occupants:</h3>
          <ul>
            <li v-for="(occupant, index) in selectedRoom.occupants" :key="index">
              {{ occupant.name }} ({{ occupant.id }})
            </li>
          </ul>
        </div>
        <div class="modal-actions">
          <button 
            @click="allocateRoom(selectedRoom)" 
            class="action-btn primary"
            :disabled="selectedRoom.occupants.length >= selectedRoom.capacity"
          >
            Allocate Students
          </button>
          <button 
            v-if="selectedRoom.occupants.length > 0"
            @click="vacateRoom(selectedRoom)" 
            class="action-btn danger"
          >
            Vacate Room
          </button>
        </div>
      </div>
    </div>
  </div>
 
</template>

<script>
import Footer from '@/components/Footer.vue'
import Navbar_warden from '../../../components/Navbar_warden.vue'

export default {
  name: 'HostelOccupancy',
  components: {
    Navbar_warden,
    Footer
  },
  data() {
    return {
      selectedBuilding: 'all',
      buildings: ['A Block', 'B Block', 'C Block', 'D Block'],
      selectedRoom: null,
      stats: {
        totalRooms: 0,
        occupiedRooms: 0,
        occupancyRate: 0,
        vacantRooms: 0,
        vacancyRate: 0
      },
      floors: [
        {
          number: 1,
          rooms: [
            { id: 'A101', number: 'A101', building: 'A Block', floor: 1, capacity: 2, occupants: [{ id: 'S1001', name: 'Rahul Sharma' }] },
            { id: 'A102', number: 'A102', building: 'A Block', floor: 1, capacity: 2, occupants: [] },
            { id: 'A103', number: 'A103', building: 'A Block', floor: 1, capacity: 3, occupants: [{ id: 'S1002', name: 'Priya Patel' }, { id: 'S1003', name: 'Arjun Kumar' }] },
            { id: 'B101', number: 'B101', building: 'B Block', floor: 1, capacity: 2, occupants: [] },
            { id: 'B102', number: 'B102', building: 'B Block', floor: 1, capacity: 2, occupants: [{ id: 'S1004', name: 'Neha Gupta' }] }
          ]
        },
        {
          number: 2,
          rooms: [
            { id: 'A201', number: 'A201', building: 'A Block', floor: 2, capacity: 2, occupants: [] },
            { id: 'A202', number: 'A202', building: 'A Block', floor: 2, capacity: 3, occupants: [] },
            { id: 'B201', number: 'B201', building: 'B Block', floor: 2, capacity: 2, occupants: [{ id: 'S1005', name: 'Sanjay Verma' }, { id: 'S1006', name: 'Anjali Reddy' }] },
            { id: 'C201', number: 'C201', building: 'C Block', floor: 2, capacity: 2, occupants: [] }
          ]
        },
        {
          number: 3,
          rooms: [
            { id: 'A301', number: 'A301', building: 'A Block', floor: 3, capacity: 2, occupants: [] },
            { id: 'B301', number: 'B301', building: 'B Block', floor: 3, capacity: 3, occupants: [{ id: 'S1007', name: 'Vikram Singh' }] },
            { id: 'C301', number: 'C301', building: 'C Block', floor: 3, capacity: 2, occupants: [] },
            { id: 'D301', number: 'D301', building: 'D Block', floor: 3, capacity: 2, occupants: [{ id: 'S1008', name: 'Divya Iyer' }] }
          ]
        }
      ]
    }
  },
  computed: {
    filteredFloors() {
      if (this.selectedBuilding === 'all') return this.floors
      
      return this.floors.map(floor => ({
        ...floor,
        rooms: floor.rooms.filter(room => room.building === this.selectedBuilding)
      })).filter(floor => floor.rooms.length > 0)
    },
    filteredRooms() {
      let rooms = []
      this.floors.forEach(floor => {
        rooms = rooms.concat(floor.rooms)
      })
      
      if (this.selectedBuilding !== 'all') {
        rooms = rooms.filter(room => room.building === this.selectedBuilding)
      }
      
      // Sort by building and room number
      return rooms.sort((a, b) => {
        if (a.building === b.building) {
          return a.number.localeCompare(b.number)
        }
        return a.building.localeCompare(b.building)
      })
    }
  },
  methods: {
    refreshData() {
      // In a real app, this would fetch fresh data from the server
      alert('Data refreshed!')
      this.calculateStats()
    },
    calculateStats() {
      let totalRooms = 0
      let occupiedRooms = 0
      
      this.floors.forEach(floor => {
        floor.rooms.forEach(room => {
          totalRooms++
          if (room.occupants.length > 0) occupiedRooms++
        })
      })
      
      const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100)
      const vacantRooms = totalRooms - occupiedRooms
      const vacancyRate = 100 - occupancyRate
      
      this.stats = {
        totalRooms,
        occupiedRooms,
        occupancyRate,
        vacantRooms,
        vacancyRate
      }
    },
    getOccupancyClass(room) {
      const occupancyRate = room.occupants.length / room.capacity
      
      if (occupancyRate === 0) return 'vacant'
      if (occupancyRate === 1) return 'full'
      if (occupancyRate >= 0.67) return 'high'
      if (occupancyRate >= 0.34) return 'medium'
      return 'low'
    },
    getStatusClass(room) {
      if (room.occupants.length === 0) return 'vacant'
      if (room.occupants.length === room.capacity) return 'full'
      return 'partial'
    },
    getStatusText(room) {
      if (room.occupants.length === 0) return 'Vacant'
      if (room.occupants.length === room.capacity) return 'Full'
      return `${room.occupants.length}/${room.capacity} Occupied`
    },
    showRoomDetails(room) {
      this.selectedRoom = room
    },
    allocateRoom(room) {
      alert(`Allocation interface for ${room.number} will open here`)
      // In a real app, this would open a student selection dialog
    },
    vacateRoom(room) {
      if (confirm(`Are you sure you want to vacate room ${room.number}? This will remove all occupants.`)) {
        alert(`Room ${room.number} has been vacated`)
        // In a real app, this would update the room occupants
        this.calculateStats()
      }
    }
  },
  mounted() {
    this.calculateStats()
  }
}
</script>

<style scoped>
.hostel-occupancy-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.page-header h1 {
  margin: 0;
  color: #1BBC9B;
  font-size: 1.8rem;
}

.header-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.building-select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}

.refresh-btn {
  background: #1BBC9B;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.refresh-btn:hover {
  background: #16a085;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 15px;
  display: flex;
  justify-content: space-between;
  border-top: 4px solid #1BBC9B;
}

.stat-content h3 {
  margin: 0 0 5px 0;
  font-size: 1rem;
  color: #555;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
  color: #1BBC9B;
}

.stat-percent {
  margin: 5px 0 0;
  font-size: 0.9rem;
  color: #666;
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  color: #1BBC9B;
  font-size: 1.8rem;
}

.heatmap-section {
  margin-bottom: 30px;
}

.heatmap-section h2 {
  color: #1BBC9B;
  margin-bottom: 15px;
}

.heatmap-container {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
}

.heatmap-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

.legend-color.vacant {
  background-color: #e3f2fd;
  border: 1px solid #bbdefb;
}

.legend-color.low {
  background-color: #c8e6c9;
  border: 1px solid #a5d6a7;
}

.legend-color.medium {
  background-color: #fff9c4;
  border: 1px solid #fff59d;
}

.legend-color.high {
  background-color: #ffcc80;
  border: 1px solid #ffb74d;
}

.legend-color.full {
  background-color: #ef9a9a;
  border: 1px solid #e57373;
}

.heatmap {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.floor {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
}

.floor h3 {
  margin: 0 0 10px 0;
  color: #555;
}

.rooms-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.room {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: transform 0.2s;
}

.room:hover {
  transform: scale(1.1);
}

.room.vacant {
  background-color: #e3f2fd;
  border: 1px solid #bbdefb;
  color: #1976d2;
}

.room.low {
  background-color: #c8e6c9;
  border: 1px solid #a5d6a7;
  color: #2e7d32;
}

.room.medium {
  background-color: #fff9c4;
  border: 1px solid #fff59d;
  color: #f57f17;
}

.room.high {
  background-color: #ffcc80;
  border: 1px solid #ffb74d;
  color: #e65100;
}

.room.full {
  background-color: #ef9a9a;
  border: 1px solid #e57373;
  color: #c62828;
}

.vacancy-list {
  margin-top: 30px;
}

.vacancy-list h2 {
  color: #1BBC9B;
  margin-bottom: 15px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f5f5f5;
  font-weight: 600;
  color: #555;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
}

.status-badge.vacant {
  background-color: #e3f2fd;
  color: #1976d2;
}

.status-badge.partial {
  background-color: #fff3e0;
  color: #e65100;
}

.status-badge.full {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.action-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.2s;
}

.action-btn.primary {
  background-color: #1BBC9B;
  color: white;
}

.action-btn.primary:hover {
  background-color: #16a085;
}

.action-btn.danger {
  background-color: #ef9a9a;
  color: #c62828;
}

.action-btn.danger:hover {
  background-color: #e57373;
}

.action-btn.small {
  padding: 4px 8px;
  font-size: 0.8rem;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  padding: 20px;
  position: relative;
}

.close {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 1.5rem;
  cursor: pointer;
  color: #777;
}

.room-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 20px 0;
}

.detail-item {
  display: flex;
  flex-direction: column;
}

.detail-item label {
  font-weight: 500;
  color: #555;
  margin-bottom: 5px;
}

.detail-item p {
  margin: 0;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 4px;
}

.occupants-list {
  margin-top: 20px;
}

.occupants-list h3 {
  margin: 0 0 10px 0;
  color: #555;
}

.occupants-list ul {
  margin: 0;
  padding-left: 20px;
}

.occupants-list li {
  margin-bottom: 5px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-actions {
    width: 100%;
    flex-direction: column;
  }
  
  .building-select {
    width: 100%;
  }
  
  .refresh-btn {
    width: 100%;
    justify-content: center;
  }
  
  .room-details {
    grid-template-columns: 1fr;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .heatmap-legend {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .room {
    width: 40px;
    height: 40px;
    font-size: 0.8rem;
  }
  
  th, td {
    padding: 8px 10px;
    font-size: 0.85rem;
  }
}
</style>