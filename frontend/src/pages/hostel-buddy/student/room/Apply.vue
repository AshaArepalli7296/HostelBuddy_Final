<template>
  <Navbar_student/>
  <div class="room-application-container">
    

    <!-- Title -->
    <h1 class="application-title">Room Application</h1>

    <!-- Form -->
    <form @submit.prevent="submitApplication" class="application-form">
      <!-- Row 1 -->
      <div class="form-row">
        <div class="form-group">
          <label for="preferred-building">Preferred Building:</label>
          <select id="preferred-building" v-model="form.preferredBuilding" required>
            <option value="">Select Building</option>
            <option value="A">Building A</option>
            <option value="B">Building B</option>
            <option value="C">Building C</option>
          </select>
        </div>

        <div class="form-group">
          <label for="room-type">Room Type:</label>
          <select id="room-type" v-model="form.roomType" required>
            <option value="">Select Room Type</option>
            <option value="single">Single Occupancy</option>
            <option value="double">Double Occupancy</option>
            <option value="shared">Shared (4 person)</option>
          </select>
        </div>
      </div>

      <!-- Row 2 -->
      <div class="form-row">
        <div class="form-group">
          <label for="preferred-mates">Preferred Roommates (if any):</label>
          <input
            type="text"
            id="preferred-mates"
            v-model="form.preferredMates"
            placeholder="Enter student IDs separated by commas"
          />
        </div>

        <div class="form-group">
          <label for="special-requirements">Special Requirements:</label>
          <textarea
            id="special-requirements"
            v-model="form.specialRequirements"
            placeholder="Any medical conditions or special needs"
          ></textarea>
        </div>
      </div>

      <!-- Checkbox -->
      <div class="form-row">
        <div class="form-group full-width checkbox-wrapper">
          <label class="checkbox-label">
            <input
              type="checkbox"
              id="terms-agreement"
              v-model="form.termsAgreed"
              required
            />
            <span>I agree to the hostel rules and regulations</span>
          </label>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="form-actions">
        <button type="submit" class="submit-btn">Submit Application</button>
      </div>
      <!-- Back Navigation -->
    <div class="back-nav">
      <button @click="goBack" class="back-link">
        ← Back to Dashboard
      </button>
    </div>
    </form>
  </div>
  <Footer/>
</template>

<script>
import Navbar_student from '../../../../components/Navbar_student.vue';
import Footer from '@/components/Footer.vue'

export default {
  name: 'RoomApplication',
   components: {
    Navbar_student,
    Footer
  },
  data() {
    return {
      form: {
        preferredBuilding: '',
        roomType: '',
        preferredMates: '',
        specialRequirements: '',
        termsAgreed: false,
      },
    };
  },
  methods: {
    goBack() {
      this.$router.push({name: 'StudentDashboard'} );
    },
    submitApplication() {
      console.log('Application submitted:', this.form);
      alert('Application submitted successfully!');
      this.$router.push({ name: 'StudentDashboard' });
    },
  },
};
</script>

<style scoped>
.room-application-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  width: 1000px;
}

.back-nav {
  margin-bottom: 20px;
  text-align: center;
}

.back-link {
  display: inline-flex;
  align-items: center;
  background: none;
  border: none;
  color: #1bbc9b;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.back-link:hover {
  background-color: #e6fffb;
}

.application-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 26px;
}

.application-form {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.form-row {
  display: flex;
  gap: 24px;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.form-group {
  flex: 0 0 48%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group.full-width {
  flex: 0 0 100%;
}

.form-group label {
  font-weight: 600;
  color: #333;
}

.form-group select,
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  font-family: inherit;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.checkbox-wrapper {
  margin-top: -10px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  font-size: 15px;
  color: #444;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.submit-btn {
  background-color: #1bbc9b;
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.submit-btn:hover {
  background-color: #17a689;
}
</style>