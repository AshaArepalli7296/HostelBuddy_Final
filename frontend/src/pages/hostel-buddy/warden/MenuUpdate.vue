<template>
  <Navbar_warden/>
  <h2>Mess Menu Update</h2>
  <div class="main-wrapper">
    <!-- Left: Menu Cards -->
    <div class="container">
      <div class="day-card" v-for="(menu, day) in weeklyMenu" :key="day">
        <h3>{{ day }}</h3>
        <p><strong>Breakfast:</strong> {{ menu.breakfast }}</p>
        <p><strong>Lunch:</strong> {{ menu.lunch }}</p>
        <p><strong>Dinner:</strong> {{ menu.dinner }}</p>

        <button class="open-btn" @click="toggleForm(day)">
          {{ editingDay === day ? 'Cancel' : 'Update Menu' }}
        </button>
      </div>
    </div>

    <!-- Right: Update Form (only visible when a day is selected) -->
    <div v-if="editingDay" class="update-form">
      <h3>Update Menu for {{ editingDay }}</h3>

      <input v-model="form.breakfast" placeholder="Enter breakfast" />
      <input v-model="form.lunch" placeholder="Enter lunch" />
      <input v-model="form.dinner" placeholder="Enter dinner" />

      <button class="submit-btn" @click="updateMenu">Submit</button>
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
  },
  data() {
    return {
      editingDay: "", // currently editing day
      weeklyMenu: {
        Monday: { breakfast: "Idli", lunch: "Rice & Dal", dinner: "Dosa" },
        Tuesday: { breakfast: "Paratha", lunch: "Pulao", dinner: "Chapati" },
        Wednesday: { breakfast: "Paratha", lunch: "Rice", dinner: "Upma" },
        Thursday: { breakfast: "Maggi", lunch: "Veg Biryani", dinner: "Pasta" },
        Friday: { breakfast: "Aloo Puri", lunch: "Dal Makhani", dinner: "Onion Dosa" },
        Saturday: { breakfast: "Bread Butter", lunch: "Curd Rice", dinner: "Maggi" },
        Sunday: { breakfast: "Poori", lunch: "Paneer Rice", dinner: "Chole" },
      },
      form: {
        breakfast: "",
        lunch: "",
        dinner: "",
      },
    };
  },
  methods: {
    toggleForm(day) {
      if (this.editingDay === day) {
        // Close the form
        this.editingDay = "";
        this.form = { breakfast: "", lunch: "", dinner: "" };
      } else {
        // Open form for selected day
        this.editingDay = day;
        this.form = { ...this.weeklyMenu[day] };
      }
    },
    updateMenu() {
      if (!this.editingDay) return;
      this.weeklyMenu[this.editingDay] = { ...this.form };
      alert(`Menu updated for ${this.editingDay}`);
      this.editingDay = "";
      this.form = { breakfast: "", lunch: "", dinner: "" };
    },
  },
};
</script>

<style scoped>
.main-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
  font-family: Arial;
}
 
.container {
  width: 60%;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-left: 40px;
}
/* Header */
h2 {
  text-align: center;
  color:  #1BBC9B;
  padding: 12px;
  margin-bottom:10px auto;
  font-size: 38PX;
  width: 45%;
  padding-bottom: 10px;
  border-bottom: 4px solid #1BBC9B;
  padding-left: 40px;
  margin-left: 40px;
}

.day-card {
  flex: 1 1 45%;
  background: white;
  padding: 15px;
  border-radius: 6px;
  border: 2px solid #1BBC9B;
  min-width: 200px;
  max-width: 300px;
}
 
.open-btn {
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #1BBC9B;
  color: white;
  border-radius: 6px;
  border: none;
  cursor: pointer; 
  font-size: 16px;
}
 
.update-form {
  width: 35%;
  background-color: white;
  padding: 20px 30px;
  border-radius: 10px;
  border: 2px solid #1BBC9B;
  align-self: flex-start;
  margin-right: 50px;
}
 
input {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
 
.submit-btn {
  width: 100px;
  height: 40px;
  padding: 10px;
  margin-top: 10px;
  background-color: #1BBC9B;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 17px;
}
</style>