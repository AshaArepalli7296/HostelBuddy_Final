<template>
  <div class="login-wrapper">
    <div class="login-card">
      <div class="login-box">
        <h2 class="title">Sign In</h2>
        <div class="role-selection">
          <button :class="{ active: role === 'Student' }" @click="selectRole('Student')">Student</button>
          <button :class="{ active: role === 'Warden' }" @click="selectRole('Warden')">Warden</button>
        </div>
        <form @submit.prevent="handleLogin">
          <input type="text" placeholder="Email or Phone" v-model="email" required />
          <input type="password" placeholder="Password" v-model="password" required />
          <div class="options">
            <label><input type="checkbox" v-model="remember" /> Remember me</label>
            <a @click.prevent="goToForgot">Forgot password?</a>
          </div>
          <button type="submit" class="btn">Sign In</button>
        </form>
      </div>

      <div class="welcome-box">
        <h3>{{ welcomeTitle }}</h3>
        <p>{{ welcomeText }}</p>
        <button class="btn transparent" @click="goToRegister">Sign Up</button>
      </div>
    </div>

    <transition name="modal-fade">
      <div v-if="showForgotModal" class="modal-overlay">
        <ForgotPassword @close="showForgotModal = false" />
      </div>
    </transition>
  </div>
</template>

<script>
import ForgotPassword from './ForgotPassword.vue';

export default {
  name: 'Login',
  components: {
    ForgotPassword
  },
  data() {
    return {
      email: '',
      password: '',
      remember: false,
      role: 'Student',
      showForgotModal: false
    };
  },
  computed: {
    welcomeTitle() {
      return this.role === 'Student' ? 'Welcome, Friend!' : 'Welcome, Warden!';
    },
    welcomeText() {
      return this.role === 'Student'
        ? 'Continue your journey with Hostel Buddy.'
        : 'Manage your hostel with ease and control.';
    }
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch('/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.email.trim(),
            password: this.password
          }),
          credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Login failed. Please try again.');
        }

        const user = data.data.user; // ✅ Use correct path for role and user object

        // ✅ Save token and full user profile
        localStorage.setItem('token', data.token);
        localStorage.setItem('userProfile', JSON.stringify(user));

        // ✅ Role-based routing
        if (user.role === 'student') {
          this.$router.push('/student-dashboard');
        } else if (user.role === 'warden') {
          this.$router.push('/warden-dashboard');
        } else {
          alert('Role not recognized. Please contact admin.');
        }

      } catch (error) {
        console.error('Login Error:', error);
        alert(error.message || 'User not found. Please sign up first.');
      }
    },
    selectRole(role) {
      this.role = role;
    },
    goToRegister() {
      this.$router.push('/register');
    },
    goToForgot() {
      this.showForgotModal = true;
    }
  }
};
</script>


<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 2rem;
  background: linear-gradient(to bottom, #e0f8f6 0%, #f0fdfc 30%, #ffffff 50%, #f0fdfc 70%, #e0f8f6 100%);
  position: relative;
  overflow: hidden;
}

.login-card {
  display: flex;
  width: 820px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  position: relative;
  z-index: 1;
}

.login-box {
  width: 55%;
  padding: 40px;
  background: white;
  animation: fadeInUp 1s ease;
}

.welcome-box {
  width: 45%;
  padding: 40px;
  background: #1bbc9b;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  animation: fadeInUp 1s ease;
}

.welcome-box h3 {
  font-size: 22px;
  margin-bottom: 10px;
}

.welcome-box p {
  font-size: 14px;
  margin-bottom: 20px;
}

.title {
  text-align: center;
  color: #1bbc9b;
  font-size: 24px;
  margin-bottom: 20px;
}

.role-selection {
  display: flex;
  margin-bottom: 20px;
  background: #f0f0f0;
  border-radius: 9999px;
  overflow: hidden;
}

.role-selection button {
  flex: 1;
  padding: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: bold;
  color: #333;
}

.role-selection button.active {
  background: #1bbc9b;
  color: white;
}

input {
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: all 0.5s ease;
}

input:focus {
  border-color: #1bbc9b;
  box-shadow: 0 0 0 3px rgba(27, 188, 155, 0.2);
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 13px;
  margin-bottom: 15px;
}

.options label {
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0;
  cursor: pointer;
}

.options input[type="checkbox"] {
  margin: 0;
}

.options a {
  color: #1bbc9b;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.options a:hover {
  color: #0ca488;
}

.btn {
  width: 100%;
  padding: 12px;
  background: #1bbc9b;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 12px;
  transition: all 0.4s ease;
}

.btn:hover {
  background: #0ca488;
  transform: translateY(-2px);
}

.btn.transparent {
  background: transparent;
  border: 2px solid white;
}

.btn.transparent:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>