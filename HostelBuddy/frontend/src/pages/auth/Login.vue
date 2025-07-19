<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h2>Welcome Back</h2>
        <p>Sign in to your account</p>
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

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="form.email" required>
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" v-model="form.password" required>
        </div>

        <div class="options">
          <label>
            <input type="checkbox" v-model="form.rememberMe"> Remember me
          </label>
          <a @click="$router.push('/forgot-password')">Forgot password?</a>
        </div>

        <button type="submit" class="submit-btn">
          <span v-if="!loading">Sign In</span>
          <span v-else class="spinner"></span>
        </button>

        <p class="register-link">
          Don't have an account? <a @click="$router.push('/register')">Sign Up</a>
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
        email: '',
        password: '',
        rememberMe: false
      },
      loading: false
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      
      try {
        const payload = {
          ...this.form,
          role: this.role
        };

        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'Login failed');

        // Verify role matches
        if (data.role !== this.role) {
          throw new Error(`Please login as ${data.role}`);
        }

        // Store user data
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token);

        // Redirect
        this.$router.push(`/${this.role}-dashboard`);
      } catch (error) {
        alert(error.message);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
/* Same base styles as Register.vue */
.options {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  font-size: 14px;
}

.options a {
  color: #44d4c5;
  cursor: pointer;
}

.register-link {
  text-align: center;
  margin-top: 25px;
  color: #666;
}

.register-link a {
  color: #44d4c5;
  cursor: pointer;
  font-weight: 500;
}

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