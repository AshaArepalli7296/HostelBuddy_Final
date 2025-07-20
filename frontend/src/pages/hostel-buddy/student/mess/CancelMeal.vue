<template>
    <Navbar_Student/>
  <div class="Theme">

  <div class="meal-cancellation-container">
    <h1>Meal Cancellation</h1>
    
    <div class="cards-wrapper">
      <!-- Left Card - Cancellation Form -->
      <div class="form-card">
        <h2>Cancel Upcoming Meals</h2>
        
        <div class="cancellation-type">
          <div class="type-options">
            <label class="type-option">
              <input 
                type="radio" 
                v-model="cancellationType" 
                value="single"
              >
              <span class="radio-checkmark"></span>
              Single Day
            </label>
            
            <label class="type-option">
              <input 
                type="radio" 
                v-model="cancellationType" 
                value="multiple"
              >
              <span class="radio-checkmark"></span>
              Multiple Days
            </label>
          </div>
        </div>
        
        <div class="date-selection">
          <!-- Single Day Selection -->
          <div v-if="cancellationType === 'single'" class="date-picker">
            <label>Select Date:</label>
            <input 
              type="date" 
              v-model="singleDate" 
              :min="today"
              :max="maxDate"
            >
          </div>
          
          <!-- Multiple Days Selection -->
          <div v-else class="multi-date-picker">
            <div class="date-range">
              <div class="date-input">
                <label>Start Date:</label>
                <input 
                  type="date" 
                  v-model="startDate" 
                  :min="today"
                  :max="endDate || maxDate"
                >
              </div>
              
              <div class="date-input">
                <label>End Date:</label>
                <input 
                  type="date" 
                  v-model="endDate" 
                  :min="startDate || today"
                  :max="maxDate"
                >
              </div>
            </div>
            
            <div class="selected-days" v-if="dateRange.length > 0">
              <span class="days-count">{{ dateRange.length }} day(s) selected:</span>
              <span class="days-list">{{ formattedDateRange }}</span>
            </div>
          </div>
          
          <div class="meal-selection">
            <h3>Select Meals to Cancel:</h3>
            <div class="meal-options">
              <label class="meal-option">
                <input 
                  type="checkbox" 
                  v-model="selectedMeals.breakfast"
                >
                <span class="checkmark"></span>
                Breakfast (7:30-9:30 AM)
              </label>
              
              <label class="meal-option">
                <input 
                  type="checkbox" 
                  v-model="selectedMeals.lunch"
                >
                <span class="checkmark"></span>
                Lunch (12:30-2:30 PM)
              </label>
              
              <label class="meal-option">
                <input 
                  type="checkbox" 
                  v-model="selectedMeals.dinner"
                >
                <span class="checkmark"></span>
                Dinner (7:30-9:30 PM)
              </label>
            </div>
          </div>
          
          <div class="reason-section">
            <label>Reason for Cancellation (Optional):</label>
            <textarea 
              v-model="cancellationReason" 
              placeholder="E.g., Going home for weekend"
              rows="3"
            ></textarea>
          </div>
          
           <div class="submit-wrapper">
    <button 
      @click="submitCancellation" 
      class="submit-btn"
      :disabled="!hasSelectedMeals || !hasValidDateSelection"
    >
      Cancel Meal
    </button>
  </div>
        </div>
      </div>
      
      <!-- Right Card - Upcoming Cancellations -->
      <div class="cancellations-card">
        <h2>Your Upcoming Cancellations</h2>
        
        <div v-if="upcomingCancellations.length > 0" class="cancellations-list">
          <div 
            v-for="(cancel, index) in upcomingCancellations" 
            :key="index" 
            class="cancellation-item"
          >
            <div class="cancel-date">
              {{ cancel.dateRange ? formatDateRange(cancel) : formatDate(cancel.date) }}
              <span v-if="cancel.dateRange" class="day-count">({{ cancel.dateRange.length }} days)</span>
            </div>
            
            <div class="cancel-meals">
              <span 
                v-if="cancel.meals.includes('breakfast')" 
                class="meal-tag breakfast"
              >
                Breakfast
              </span>
              <span 
                v-if="cancel.meals.includes('lunch')" 
                class="meal-tag lunch"
              >
                Lunch
              </span>
              <span 
                v-if="cancel.meals.includes('dinner')" 
                class="meal-tag dinner"
              >
                Dinner
              </span>
            </div>
            
            <div 
              v-if="cancel.reason" 
              class="cancel-reason"
            >
              <strong>Reason:</strong> {{ cancel.reason }}
            </div>
            
            <button 
              @click="removeCancellation(index)" 
              class="remove-btn"
            >
              Remove
            </button>
          </div>
        </div>
        
        <div v-else class="empty-message">
          <p>No upcoming meal cancellations</p>
          <img src="../assets/no-cancellations.svg" alt="No cancellations" class="empty-illustration">
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
  name: 'MealCancellation',
  components: {
    Navbar_Student,Footer
  },
  data() {
    return {
      today: new Date().toISOString().split('T')[0],
      maxDate: this.getMaxDate(),
      cancellationType: 'single', // 'single' or 'multiple'
      singleDate: new Date().toISOString().split('T')[0],
      startDate: '',
      endDate: '',
      selectedMeals: {
        breakfast: false,
        lunch: false,
        dinner: false
      },
      cancellationReason: '',
      upcomingCancellations: [
        // Sample data
        {
          date: '2023-06-10',
          meals: ['breakfast', 'lunch'],
          reason: 'Weekend trip'
        },
        {
          dateRange: this.generateDateRange('2023-06-15', '2023-06-20'),
          meals: ['dinner'],
          reason: 'Family vacation'
        }
      ]
    }
  },
  computed: {
    hasSelectedMeals() {
      return this.selectedMeals.breakfast || 
             this.selectedMeals.lunch || 
             this.selectedMeals.dinner
    },
    hasValidDateSelection() {
      if (this.cancellationType === 'single') {
        return this.singleDate !== ''
      } else {
        return this.startDate !== '' && this.endDate !== '' && this.startDate <= this.endDate
      }
    },
    dateRange() {
      if (this.cancellationType === 'multiple' && this.startDate && this.endDate) {
        return this.generateDateRange(this.startDate, this.endDate)
      }
      return []
    },
    formattedDateRange() {
      if (this.dateRange.length === 0) return ''
      if (this.dateRange.length === 1) return this.formatDate(this.dateRange[0], true)
      
      const first = this.formatDate(this.dateRange[0], true)
      const last = this.formatDate(this.dateRange[this.dateRange.length - 1], true)
      return `${first} to ${last}`
    }
  },
  methods: {
    submitCancellation() {
      const meals = []
      if (this.selectedMeals.breakfast) meals.push('breakfast')
      if (this.selectedMeals.lunch) meals.push('lunch')
      if (this.selectedMeals.dinner) meals.push('dinner')
      
      const newCancellation = {
        meals,
        reason: this.cancellationReason
      }
      
      if (this.cancellationType === 'single') {
        newCancellation.date = this.singleDate
      } else {
        newCancellation.dateRange = this.dateRange
      }
      
      this.upcomingCancellations.push(newCancellation)
      this.resetForm()
      
      // Sort by date/start date
      this.upcomingCancellations.sort((a, b) => {
        const dateA = a.date || a.dateRange[0]
        const dateB = b.date || b.dateRange[0]
        return new Date(dateA) - new Date(dateB)
      })
      
      alert('Meal cancellation submitted successfully!')
    },
    removeCancellation(index) {
      if (confirm('Are you sure you want to remove this cancellation?')) {
        this.upcomingCancellations.splice(index, 1)
        alert('Cancellation removed')
      }
    },
    resetForm() {
      this.selectedMeals = {
        breakfast: false,
        lunch: false,
        dinner: false
      }
      this.cancellationReason = ''
      this.singleDate = new Date().toISOString().split('T')[0]
      this.startDate = ''
      this.endDate = ''
    },
    formatDate(dateString, short = false) {
      const options = short 
        ? { month: 'short', day: 'numeric' }
        : { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(dateString).toLocaleDateString('en-US', options)
    },
    formatDateRange(cancellation) {
      if (cancellation.date) {
        return this.formatDate(cancellation.date)
      }
      const start = this.formatDate(cancellation.dateRange[0], true)
      const end = this.formatDate(cancellation.dateRange[cancellation.dateRange.length - 1], true)
      return `${start} to ${end}`
    },
    generateDateRange(startDate, endDate) {
      const range = []
      const current = new Date(startDate)
      const end = new Date(endDate)
      
      while (current <= end) {
        range.push(new Date(current).toISOString().split('T')[0])
        current.setDate(current.getDate() + 1)
      }
      
      return range
    },
    getMaxDate() {
      const date = new Date()
      date.setDate(date.getDate() + 60) // Allow cancellations up to 60 days in advance
      return date.toISOString().split('T')[0]
    }
  }
}
</script>

<style scoped>
.meal-cancellation-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  color: #1BBC9B;
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  border-bottom: 2px solid #1BBC9B;
  padding-bottom: 10px;
}

h2 {
  color: #1BBC9B;
  margin-bottom: 20px;
  font-size: 22px;
}

.cards-wrapper {
  display: flex;
  gap: 30px;
}

.form-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
  padding: 30px;
}

.form-card {
  flex: 1;
  width:1000px;
}

.cancellations-card {
  width: 450px;
}

.cancellation-type {
  margin-bottom: 20px;
}

.type-options {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.type-option {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  color: #555;
  font-size: 15px;
}

.type-option input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.radio-checkmark {
  position: absolute;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #f5f5f5;
  border-radius: 50%;
  border: 1px solid #ddd;
  transition: all 0.3s;
}

.type-option:hover input ~ .radio-checkmark {
  background-color: #e0f2f1;
}

.type-option input:checked ~ .radio-checkmark {
  background-color: #1BBC9B;
  border-color: #1BBC9B;
}

.radio-checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.type-option input:checked ~ .radio-checkmark:after {
  display: block;
}

.type-option .radio-checkmark:after {
  top: 5px;
  left: 5px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}

.date-selection {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.date-picker {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.date-picker label {
  font-weight: 600;
  color: #555;
  font-size: 15px;
}

.date-picker input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
}

.date-picker input:focus {
  border-color: #1BBC9B;
  outline: none;
  box-shadow: 0 0 0 2px rgba(27, 188, 155, 0.2);
}

.multi-date-picker {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.date-range {
  display: flex;
  gap: 15px;
}

.date-input {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.date-input label {
  font-weight: 600;
  color: #555;
  font-size: 15px;
}

.date-input input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
}

.date-input input:focus {
  border-color: #1BBC9B;
  outline: none;
  box-shadow: 0 0 0 2px rgba(27, 188, 155, 0.2);
}

.selected-days {
  background: #f0f8f8;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
}

.days-count {
  font-weight: 600;
  color: #1BBC9B;
  margin-right: 8px;
}

.days-list {
  color: #555;
}

.meal-selection h3 {
  color: #333;
  margin-bottom: 15px;
  font-size: 18px;
}

.meal-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.meal-option {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  color: #555;
  font-size: 15px;
}

.meal-option input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  left: 0;
  height: 22px;
  width: 22px;
  background-color: #f5f5f5;
  border-radius: 6px;
  border: 1px solid #ddd;
  transition: all 0.3s;
}

.meal-option:hover input ~ .checkmark {
  background-color: #e0f2f1;
}

.meal-option input:checked ~ .checkmark {
  background-color: #1BBC9B;
  border-color: #1BBC9B;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.meal-option input:checked ~ .checkmark:after {
  display: block;
}

.meal-option .checkmark:after {
  left: 7px;
  top: 3px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.reason-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.reason-section label {
  font-weight: 600;
  color: #555;
  font-size: 15px;
}

.reason-section textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  min-height: 80px;
  resize: vertical;
  transition: all 0.3s;
}

.reason-section textarea:focus {
  border-color: #1BBC9B;
  outline: none;
  box-shadow: 0 0 0 2px rgba(27, 188, 155, 0.2);
}

.submit-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.submit-btn {
  background: #1BBC9B;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  width: 200px;
}

.submit-btn:hover:not(:disabled) {
  background: #15967D;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(27, 188, 155, 0.3);
}

.submit-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.cancellations-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 600px;
  overflow-y: auto;
  padding-right: 10px;
}

.cancellation-item {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  position: relative;
}

.cancel-date {
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.cancel-date .day-count {
  font-size: 14px;
  color: #666;
  margin-left: 8px;
  font-weight: normal;
}

.cancel-meals {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.meal-tag {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.meal-tag.breakfast {
  background: #FFF3CD;
  color: #856404;
}

.meal-tag.lunch {
  background: #D4EDDA;
  color: #155724;
}

.meal-tag.dinner {
  background: #D1ECF1;
  color: #0C5460;
}

.cancel-reason {
  color: #666;
  font-size: 14px;
  margin-top: 8px;
}

.remove-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #DC3545;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  padding: 4px 8px;
  border-radius: 4px;
}

.remove-btn:hover {
  background: #f8d7da;
}

.empty-message {
  text-align: center;
  padding: 40px 0;
  color: #666;
}

.empty-illustration {
  width: 200px;
  margin-top: 20px;
  opacity: 0.7;
}
.Theme {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

padding: 3rem 2rem;
  background: linear-gradient(to bottom, 
    #e0f8f6 0%, 
    #f0fdfc 30%, 
    #ffffff 50%, 
    #f0fdfc 70%, 
    #e0f8f6 100%);
 position: relative;
  overflow: hidden;}

/* Responsive adjustments */
@media (max-width: 992px) {
  .cards-wrapper {
    flex-direction: column;
  }
  
  .cancellations-card {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .meal-cancellation-container {
    padding: 20px;
  }
  
  .form-card, .cancellations-card {
    padding: 20px;
  }
  
  .type-options {
    flex-direction: column;
    gap: 10px;
  }
  
  .date-range {
    flex-direction: column;
    gap: 15px;
  }
  
  .meal-options {
    gap: 15px;
  }
}
</style>