<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h2>Create Your Account</h2>
        <p>Join HostelBuddy as</p>
        <div class="role-tabs">
          <button 
            :class="{ active: role === 'student' }" 
            @click="role = 'student'"
          >
            <i class="fas fa-user-graduate"></i> Student
          </button>
          <button 
            :class="{ active: role === 'warden' }" 
            @click="role = 'warden'"
          >
            <i class="fas fa-user-shield"></i> Warden
          </button>
        </div>
      </div>

      <form @submit.prevent="handleRegister">
        <!-- Common Fields -->
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" v-model="form.fullName" required>
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="form.email" required>
        </div>

        <!-- Student Specific -->
        <div v-if="role === 'student'" class="student-fields">
          <div class="form-group">
            <label>Roll Number</label>
            <input type="text" v-model="form.rollNumber" required>
          </div>
          <div class="form-group">
            <label>Department</label>
            <select v-model="form.department" required>
              <option value="">Select Department</option>
              <option value="cse">Computer Science</option>
              <option value="ece">Electronics</option>
              <option value="mech">Mechanical</option>
            </select>
          </div>
          <!-- ✅ New Student Contact Number -->
          <div class="form-group">
            <label>Contact Number</label>
            <input type="tel" v-model="form.studentContactNumber" required placeholder="10-digit number">
          </div>
        </div>

        <!-- Warden Specific -->
        <div v-else class="warden-fields">
          <div class="form-group">
            <label>Staff ID</label>
            <input type="text" v-model="form.staffId" required>
          </div>
          <div class="form-group">
            <label>Contact Number</label>
            <input type="tel" v-model="form.contactNumber" required placeholder="10-digit number">
          </div>
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" v-model="form.password" required>
        </div>

        <div class="form-group">
          <label>Confirm Password</label>
          <input type="password" v-model="form.confirmPassword" required>
        </div>

        <button type="submit" class="submit-btn">
          <span v-if="!loading">Sign Up</span>
          <span v-else class="spinner"></span>
        </button>

        <p class="login-link">
          Already have an account? <a @click="$router.push('/login')">Sign In</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: 'student',
      form: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        // Student
        rollNumber: '',
        department: '',
        studentContactNumber: '',
        // Warden
        staffId: '',
        contactNumber: ''
      },
      loading: false
    };
  },
  methods: {
    validatePhone(phone) {
      // ✅ Ensures only 10 digits
      const phoneRegex = /^[0-9]{10}$/;
      return phoneRegex.test(phone);
    },
    async handleRegister() {
      if (this.form.password !== this.form.confirmPassword) {
        alert("Passwords don't match!");
        return;
      }

      // ✅ Validate contact number for student
      if (this.role === 'student' && !this.validatePhone(this.form.studentContactNumber)) {
        alert("Please enter a valid 10-digit student contact number!");
        return;
      }

      // ✅ Validate contact number for warden
      if (this.role === 'warden' && !this.validatePhone(this.form.contactNumber)) {
        alert("Please enter a valid 10-digit warden contact number!");
        return;
      }

      this.loading = true;

      try {
        const payload = {
          ...this.form,
          role: this.role
        };

        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'Registration failed');

        // Redirect based on role
        this.$router.push(`/${this.role}-dashboard`);
      } catch (error) {
        alert(error.message);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>


<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0fdfc 0%, #e0f8f6 100%);
}

.auth-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 450px;
  padding: 40px;
}

.auth-header {
  text-align: center;
  margin-bottom: 30px;
}

.auth-header h2 {
  color: #2c2c2c;
  margin-bottom: 8px;
}

.auth-header p {
  color: #666;
  margin-bottom: 20px;
}

.role-tabs {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
}

.role-tabs button {
  flex: 1;
  padding: 12px;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.role-tabs button.active {
  background: #44d4c5;
  color: white;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border 0.3s;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #44d4c5;
  outline: none;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: #44d4c5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 10px;
}

.submit-btn:hover {
  background: #3ac2b3;
}

.login-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.login-link a {
  color: #44d4c5;
  cursor: pointer;
  font-weight: 500;
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255,255,255,.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>