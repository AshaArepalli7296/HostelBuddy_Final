<template>
  <Navbar_Student/>
  <div class="mess-menu-container">
    <h1>Mess Menu</h1>
    
    <div class="menu-controls">
      <div class="time-period-selector">
        <button 
          @click="setTimePeriod('week')" 
          :class="{ active: timePeriod === 'week' }"
        >
          Weekly View
        </button>
        <button 
          @click="setTimePeriod('day')" 
          :class="{ active: timePeriod === 'day' }"
        >
          Daily View
        </button>
      </div>
      
      <div class="date-navigation">
        <button @click="previousPeriod" class="nav-btn">
          &lt;
        </button>
        <div class="current-period">
          {{ currentPeriodDisplay }}
        </div>
        <button @click="nextPeriod" class="nav-btn">
          &gt;
        </button>
      </div>
    </div>

    <div class="menu-display">
      <!-- Weekly View -->
      <div v-if="timePeriod === 'week'" class="weekly-menu">
        <div 
          v-for="day in weeklyMenu" 
          :key="day.date" 
          class="day-card"
          :class="{ 'today': day.isToday }"
        >
          <div class="day-header">
            <div class="day-name">{{ day.dayName }}</div>
            <div class="date">{{ day.date }}</div>
          </div>
          
          <div class="meal-section">
            <h3>Breakfast</h3>
            <ul>
              <li v-for="(item, index) in day.breakfast" :key="index">{{ item }}</li>
            </ul>
          </div>
          
          <div class="meal-section">
            <h3>Lunch</h3>
            <ul>
              <li v-for="(item, index) in day.lunch" :key="index">{{ item }}</li>
            </ul>
          </div>
          
          <div class="meal-section">
            <h3>Dinner</h3>
            <ul>
              <li v-for="(item, index) in day.dinner" :key="index">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Daily View -->
      <div v-else class="daily-menu">
        <div class="selected-day" :class="{ 'today': selectedDay.isToday }">
          <div class="day-header">
            <h2>{{ selectedDay.dayName }}</h2>
            <div class="date">{{ selectedDay.date }}</div>
          </div>
          
          <div class="meal-sections">
            <div class="meal-section expanded">
              <h3>Breakfast <span class="time">7:30 AM - 9:30 AM</span></h3>
              <ul>
                <li v-for="(item, index) in selectedDay.breakfast" :key="index">{{ item }}</li>
              </ul>
            </div>
            
            <div class="meal-section expanded">
              <h3>Lunch <span class="time">12:30 PM - 2:30 PM</span></h3>
              <ul>
                <li v-for="(item, index) in selectedDay.lunch" :key="index">{{ item }}</li>
              </ul>
            </div>
            
            <div class="meal-section expanded">
              <h3>Dinner <span class="time">7:30 PM - 9:30 PM</span></h3>
              <ul>
                <li v-for="(item, index) in selectedDay.dinner" :key="index">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Navbar_Student from '../../../../components/Navbar_Student.vue'
import Footer from '../../../../components/Footer.vue'

export default {
  name: 'MessMenu',
  components: {
    Navbar_Student,
    Footer
  },
  data() {
    return {
      timePeriod: 'week', // 'week' or 'day'
      currentWeekStart: this.getCurrentWeekStart(),
      selectedDate: new Date(),
      menuData: this.generateSampleMenuData()
    }
  },
  computed: {
    currentPeriodDisplay() {
      if (this.timePeriod === 'week') {
        const start = new Date(this.currentWeekStart)
        const end = new Date(start)
        end.setDate(start.getDate() + 6)
        return `${this.formatDate(start)} - ${this.formatDate(end)}`
      } else {
        return this.formatDate(this.selectedDate)
      }
    },
    weeklyMenu() {
      const week = []
      const currentDate = new Date(this.currentWeekStart)
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate)
        date.setDate(currentDate.getDate() + i)
        
        const dateStr = this.formatDate(date)
        const today = new Date()
        const isToday = date.getDate() === today.getDate() && 
                       date.getMonth() === today.getMonth() && 
                       date.getFullYear() === today.getFullYear()
        
        week.push({
          ...this.menuData[dateStr],
          dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
          date: this.formatDate(date, true),
          isToday
        })
      }
      
      return week
    },
    selectedDay() {
      const dateStr = this.formatDate(this.selectedDate)
      const today = new Date()
      const isToday = this.selectedDate.getDate() === today.getDate() && 
                     this.selectedDate.getMonth() === today.getMonth() && 
                     this.selectedDate.getFullYear() === today.getFullYear()
      
      return {
        ...this.menuData[dateStr],
        dayName: this.selectedDate.toLocaleDateString('en-US', { weekday: 'long' }),
        date: this.formatDate(this.selectedDate, true),
        isToday
      }
    }
  },
  methods: {
    setTimePeriod(period) {
      this.timePeriod = period
    },
    previousPeriod() {
      if (this.timePeriod === 'week') {
        const newDate = new Date(this.currentWeekStart)
        newDate.setDate(newDate.getDate() - 7)
        this.currentWeekStart = newDate
      } else {
        const newDate = new Date(this.selectedDate)
        newDate.setDate(newDate.getDate() - 1)
        this.selectedDate = newDate
      }
    },
    nextPeriod() {
      if (this.timePeriod === 'week') {
        const newDate = new Date(this.currentWeekStart)
        newDate.setDate(newDate.getDate() + 7)
        this.currentWeekStart = newDate
      } else {
        const newDate = new Date(this.selectedDate)
        newDate.setDate(newDate.getDate() + 1)
        this.selectedDate = newDate
      }
    },
    getCurrentWeekStart() {
      const today = new Date()
      const day = today.getDay()
      const diff = today.getDate() - day + (day === 0 ? -6 : 1) // Adjust for Sunday
      return new Date(today.setDate(diff))
    },
    formatDate(date, short = false) {
      const options = short 
        ? { month: 'short', day: 'numeric' }
        : { year: 'numeric', month: 'short', day: 'numeric' }
      return date.toLocaleDateString('en-US', options)
    },
    generateSampleMenuData() {
      // This would normally come from an API
      const menu = {}
      const today = new Date()
      
      for (let i = -7; i < 14; i++) {
        const date = new Date(today)
        date.setDate(date.getDate() + i)
        const dateStr = this.formatDate(date)
        
        // Sample menu items - in a real app this would come from your database
        const breakfast = [
          'Poha with peanuts',
          'Bread toast with butter',
          'Boiled eggs',
          'Tea/Coffee'
        ]
        
        const lunch = [
          'Jeera rice',
          'Dal tadka',
          'Paneer butter masala',
          'Raita',
          'Salad'
        ]
        
        const dinner = [
          'Chapati',
          'Mix veg curry',
          'Dal fry',
          'Rice',
          'Pickle'
        ]
        
        // Rotate menu items slightly for variety
        if (i % 3 === 1) {
          lunch[1] = 'Dal makhani'
          lunch[2] = 'Aloo gobi'
        } else if (i % 3 === 2) {
          lunch[1] = 'Chana masala'
          lunch[2] = 'Bhindi sabzi'
        }
        
        menu[dateStr] = {
          breakfast,
          lunch,
          dinner
        }
      }
      
      return menu
    }
  }
}
</script>

<style scoped>
.mess-menu-container {
  width: 100%;
  margin: 0 auto;
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
/* h3{
  text-align: center;
  
} */

h1 {
  color: #1BBC9B;
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  border-bottom: 2px solid #1BBC9B;
  padding-bottom: 10px;
}

.menu-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 15px;
}

.time-period-selector {
  display: flex;
  gap: 10px;
}

.time-period-selector button {
  background: #f0f0f0;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.time-period-selector button.active {
  background: #1BBC9B;
  color: white;
}

.date-navigation {
  display: flex;
  align-items: center;
  gap: 15px;
}

.current-period {
  font-weight: 600;
  color: #333;
  min-width: 200px;
  /* text-align: center; */
}

.nav-btn {
  background: #1BBC9B;
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.nav-btn:hover {
  background: #15967D;
  transform: scale(1.1);
}

.weekly-menu {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  width: 100%;
}

.day-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 20px;
  transition: all 0.3s;
  width: 100%;
}

.day-card.today {
  border: 2px solid #1BBC9B;
  box-shadow: 0 4px 15px rgba(27, 188, 155, 0.2);
}

.day-header {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.day-name {
  font-weight: 600;
  color: #333;
  font-size: 18px;
}

.date {
  color: #666;
  font-size: 14px;
}

.meal-section {
  margin-bottom: 15px;
  padding-left: 40px;
}

.meal-section h3 {
  color: #1BBC9B;
  font-size: 16px;
  margin-bottom: 8px;
}

.meal-section ul {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

.meal-section li {
  padding: 5px 0;
  color: #555;
  border-bottom: 1px dashed #eee;
}

/* Daily View Styles */
.daily-menu {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 25px;
}

.selected-day {
  transition: all 0.3s;
}

.selected-day.today {
  border: 2px solid #1BBC9B;
  border-radius: 10px;
}

.selected-day .day-header {
  text-align: center;
  margin-bottom: 25px;
}

.selected-day .day-header h2 {
  color: #1BBC9B;
  margin-bottom: 5px;
}

.selected-day .day-header .date {
  font-size: 16px;
  color: #666;
}

.meal-sections {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.meal-section.expanded {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
}

.meal-section.expanded h3 {
  color: #1BBC9B;
  font-size: 18px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
}

.meal-section.expanded .time {
  font-size: 14px;
  color: #666;
  font-weight: normal;
}

.meal-section.expanded li {
  padding: 8px 0;
  font-size: 15px;
}

@media (max-width: 992px) {
  .weekly-menu {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1200px) {
  .weekly-menu {
    grid-template-columns: repeat(3, minmax(350px, 1fr));
  }
}

@media (max-width: 1199px) and (min-width: 992px) {
  .weekly-menu {
    grid-template-columns: repeat(3, minmax(300px, 1fr));
  }
}
@media (max-width: 767px) {
  .weekly-menu {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 991px) and (min-width: 768px) {
  .weekly-menu {
    grid-template-columns: repeat(2, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .mess-menu-container {
    padding: 20px;
  }
  
  .menu-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .time-period-selector {
    justify-content: center;
  }
  
  .weekly-menu {
    grid-template-columns: 1fr;
  }
  
  .day-card {
    padding: 15px;
  }
  
  .daily-menu {
    padding: 20px;
  }
}
</style>