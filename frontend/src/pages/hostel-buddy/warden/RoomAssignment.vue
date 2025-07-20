<template>
  <div class="room-assignment-page">
    <Navbar_warden />
    <main class="main-content">
      <div class="room-assignment-container">
        <h1>Room Allocation</h1>
        
        <div class="controls">
          <button @click="autoAllocate" class="btn primary">
            <i class="fas fa-magic"></i> Auto Allocate
          </button>
          <button @click="manualAllocate" class="btn secondary">
            <i class="fas fa-user-edit"></i> Manual Allocate
          </button>
        </div>

        <div class="room-list">
          <div v-for="room in rooms" :key="room.id" class="room-card">
            <div class="room-header">
              <h3>{{ room.name }}</h3>
              <span class="status-badge" :class="getRoomStatus(room)">
                {{ getRoomStatusText(room) }}
              </span>
            </div>
            <p><strong>Capacity:</strong> {{ room.capacity }}</p>
            <p><strong>Occupants:</strong> {{ room.occupants.length }}</p>
            <div class="room-actions">
              <button @click="viewRoom(room)" class="btn small">
                <i class="fas fa-info-circle"></i> Details
              </button>
              <button 
                @click="allocateToRoom(room)" 
                class="btn small primary"
                :disabled="room.occupants.length >= room.capacity"
              >
                <i class="fas fa-user-plus"></i> Assign
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>

import Footer from '@/components/Footer.vue'
import Navbar_warden from '../../../components/Navbar_warden.vue'


export default {
  name: 'RoomAssignment',
  components: {
    Navbar_warden,
    Footer
  },
  data() {
    return {
      rooms: [
        { id: 1, name: 'A-101', building: 'A Block', capacity: 2, occupants: ['Student A'] },
        { id: 2, name: 'B-102', building: 'B Block', capacity: 3, occupants: [] },
        { id: 3, name: 'C-103', building: 'C Block', capacity: 2, occupants: ['Student B', 'Student C'] },
        { id: 4, name: 'D-201', building: 'D Block', capacity: 2, occupants: ['Student D'] }
      ]
    }
  },
  methods: {
    getRoomStatus(room) {
      if (room.occupants.length === 0) return 'vacant'
      if (room.occupants.length >= room.capacity) return 'full'
      return 'partial'
    },
    getRoomStatusText(room) {
      const status = this.getRoomStatus(room)
      return {
        vacant: 'Vacant',
        full: 'Full',
        partial: `${room.occupants.length}/${room.capacity} Occupied`
      }[status]
    },
    autoAllocate() {
      // Implement auto allocation logic
      alert('Auto allocation feature will be implemented here')
    },
    manualAllocate() {
      // Implement manual allocation logic
      alert('Manual allocation feature will be implemented here')
    },
    viewRoom(room) {
      alert(`Viewing details for ${room.name}\nBuilding: ${room.building}\nOccupants: ${room.occupants.join(', ') || 'None'}`)
    },
    allocateToRoom(room) {
      alert(`Allocation interface for ${room.name} will open here`)
    }
  }
}
</script>

<style scoped>
.room-assignment-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
}

.room-assignment-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h1 {
  color: #1BBC9B;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn.primary {
  background-color: #1BBC9B;
  color: white;
}

.btn.primary:hover {
  background-color: #16a085;
}

.btn.secondary {
  background-color: #f0f0f0;
  color: #333;
}

.btn.secondary:hover {
  background-color: #e0e0e0;
}

.btn.small {
  padding: 6px 12px;
  font-size: 14px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.room-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.room-card {
  border: 1px solid #e0e0e0;
  padding: 15px;
  border-radius: 8px;
  transition: transform 0.2s;
}

.room-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.room-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.room-header h3 {
  margin: 0;
  color: #333;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
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

.room-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
  }
  
  .room-list {
    grid-template-columns: 1fr;
  }
}
</style>