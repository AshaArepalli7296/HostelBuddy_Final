<template>
  <div class="register-wrapper">
    <transition name="slow-fade" mode="out-in">
      <div key="register" class="register-card">
        <div class="side-panel">
          <h2>{{ welcomeTitle }}</h2>
          <p>{{ welcomeText }}</p>
          <button class="btn transparent" @click="goToLogin">Sign In</button>
        </div>

        <div class="form-container">
          <h2 class="title">Sign Up</h2>
          <div class="role-selection">
            <button type="button" :class="{ active: form.role === 'student' }" @click="form.role = 'student'">Student</button>
            <button type="button" :class="{ active: form.role === 'warden' }" @click="form.role = 'warden'">Warden</button>
          </div>

          <form @submit.prevent="handleRegister">
            <div class="input-group">
              <input type="text" placeholder="Full Name" v-model="form.fullName" required :class="{ 'input-error': errors.fullName }" />
              <span v-if="errors.fullName" class="error-message">{{ errors.fullName }}</span>
            </div>

            <div class="input-group">
              <input type="email" placeholder="Email" v-model="form.email" required :class="{ 'input-error': errors.email }" />
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>

            <div class="input-group">
              <input type="text" placeholder="Field ID" v-model="form.fieldId" required :class="{ 'input-error': errors.fieldId }" />
              <span v-if="errors.fieldId" class="error-message">{{ errors.fieldId }}</span>
            </div>

            <div class="input-group">
              <input type="tel" placeholder="Contact Number" v-model="form.contact" required :class="{ 'input-error': errors.contact }" />
              <span v-if="errors.contact" class="error-message">{{ errors.contact }}</span>
            </div>

            <div class="input-group">
              <input type="date" v-model="form.dob" />
            </div>

            <div class="input-group">
              <textarea placeholder="Address" v-model="form.address"></textarea>
            </div>

            <div class="input-group password-container">
              <input type="password" placeholder="Password" v-model="form.password" required @input="checkPasswordStrength" :class="{ 'input-error': errors.password }" />
              <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
              <div class="password-strength" v-if="form.password">
                <div class="strength-bar" :class="passwordStrengthClass"></div>
                <span>{{ passwordStrengthText }}</span>
              </div>
            </div>

            <div class="input-group password-container">
              <input type="password" placeholder="Confirm Password" v-model="form.confirmPassword" required :class="{ 'input-error': errors.confirmPassword }" />
              <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
            </div>

            <button type="submit" class="btn" :disabled="isSubmitting">
              {{ isSubmitting ? 'Registering...' : 'Sign Up' }}
            </button>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      form: {
        fullName: '',
        email: '',
        fieldId: '',
        contact: '',
        dob: '',
        address: '',
        password: '',
        confirmPassword: '',
        role: 'student'
      },
      errors: {},
      isSubmitting: false,
      passwordStrength: 0
    }
  },
  computed: {
    welcomeTitle() {
      return this.form.role === 'student' ? 'Welcome New Student!' : 'Warden Registration'
    },
    welcomeText() {
      return this.form.role === 'student'
        ? 'Join our hostel community and enjoy seamless management.'
        : 'Register as warden to manage hostel operations.'
    },
    passwordStrengthClass() {
      return {
        weak: this.passwordStrength <= 2,
        medium: this.passwordStrength === 3,
        strong: this.passwordStrength >= 4
      }
    },
    passwordStrengthText() {
      if (this.passwordStrength <= 2) return 'Weak password'
      if (this.passwordStrength === 3) return 'Medium strength'
      return 'Strong password'
    }
  },
  methods: {
    goToLogin() {
      this.$router.push('/login')
    },
    checkPasswordStrength() {
      let strength = 0
      if (this.form.password.length >= 8) strength++
      if (/\d/.test(this.form.password)) strength++
      if (/[A-Z]/.test(this.form.password)) strength++
      if (/[^A-Za-z0-9]/.test(this.form.password)) strength++
      this.passwordStrength = strength
    },
    validateForm() {
      this.errors = {}
      let valid = true

      if (!this.form.fullName.trim()) {
        this.errors.fullName = 'Full name is required'
        valid = false
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!this.form.email || !emailRegex.test(this.form.email)) {
        this.errors.email = 'Valid email is required'
        valid = false
      }

      if (!this.form.fieldId.trim()) {
        this.errors.fieldId = 'Field ID is required'
        valid = false
      }

      const contactRegex = /^[0-9]{10}$/
      if (!contactRegex.test(this.form.contact)) {
        this.errors.contact = 'Valid 10-digit contact required'
        valid = false
      }

      if (this.form.password.length < 8) {
        this.errors.password = 'Password must be at least 8 characters'
        valid = false
      }

      if (this.form.password !== this.form.confirmPassword) {
        this.errors.confirmPassword = 'Passwords do not match'
        valid = false
      }

      return valid
    },
    async handleRegister() {
      if (!this.validateForm()) return
      this.isSubmitting = true

      try {
        const response = await fetch('/api/v1/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form),
          credentials: 'include'
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message || 'Registration failed')

        // Save token and user profile
        localStorage.setItem('token', data.token)
        localStorage.setItem('userProfile', JSON.stringify(data.data.user))

        // Redirect based on role
        this.$router.push(`/${this.form.role}-dashboard`)
      } catch (err) {
        alert(err.message || 'Registration failed. Please try again.')
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>


<style scoped>
.register-wrapper {
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
  overflow: hidden;
}

.register-card {
  display: flex;
  width: 900px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  background: white;
  overflow: hidden;
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
}

.side-panel {
  width: 45%;
  background: linear-gradient(to right, #1bbc9b, #0ca488);
  color: white;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  animation: fadeInLeft 1s ease;
}

.side-panel h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.side-panel p {
  font-size: 14px;
  margin-bottom: 30px;
}

.form-container {
  width: 55%;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: fadeInRight 1s ease;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #1bbc9b;
  text-align: center;
  margin-bottom: 20px;
}

.role-selection {
  display: flex;
  margin: 15px 0;
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

.input-group {
  position: relative;
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #1bbc9b;
  box-shadow: 0 0 0 3px rgba(27, 188, 155, 0.2);
}

.input-error {
  border-color: #ff3860 !important;
}

.error-message {
  color: #ff3860;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

.password-container {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  user-select: none;
}

.password-strength {
  margin-top: 8px;
}

.strength-bar {
  height: 4px;
  border-radius: 2px;
  margin-bottom: 4px;
  transition: all 0.3s ease;
}

.strength-bar.weak {
  background: #ff3860;
  width: 33%;
}

.strength-bar.medium {
  background: #ffb800;
  width: 66%;
}

.strength-bar.strong {
  background: #1bbc9b;
  width: 100%;
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
  margin-top: 10px;
  transition: all 0.3s ease;
}

.btn:hover {
  background: #0ca488;
  transform: translateY(-2px);
}

.btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
  transform: none !important;
}

.btn.transparent {
  background: transparent;
  border: 2px solid white;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
}

.btn.transparent:hover {
  background: rgba(255,255,255,0.15);
  transform: translateY(-2px);
}

/* Animations */
.slow-fade-enter-active {
  transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.slow-fade-leave-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.slow-fade-enter-from,
.slow-fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>