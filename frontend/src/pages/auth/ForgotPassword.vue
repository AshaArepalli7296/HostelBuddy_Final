<template>
  <div class="forgot-wrapper">
    <div class="forgot-container">
      <button class="close-button" @click="goToLogin">×</button>
      <h2 class="forgot-heading">Forgot Password</h2>

      <input
        type="text"
        placeholder="Phone number or email"
        v-model="identifier"
        class="input-field"
      />

      <button
        class="action-button"
        @click="sendOtp"
        :disabled="!identifier.trim()"
        :class="{ 'disabled-button': !identifier.trim() }"
      >
        Send OTP
      </button>

      <div class="otp-group">
        <input
          v-for="(digit, index) in otpDigits"
          :key="index"
          type="text"
          maxlength="1"
          class="otp-input"
          v-model="otpDigits[index]"
          @input="handleOtpInput(index, $event)"
          @keydown.backspace="handleBackspace(index, $event)"
          :ref="'otp' + index"
        />
      </div>

      <button class="action-button" @click="verifyOtp">Verify OTP</button>

      <input
        type="password"
        placeholder="New Password"
        v-model="newPassword"
        class="input-field"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        v-model="confirmPassword"
        class="input-field"
      />

      <button class="action-button" @click="resetPassword">Reset Password</button>

      <p class="back-login" @click="goToLogin">← Back to Login</p>

      <p
        v-if="otpMessage"
        class="message"
        :class="{
          'error-message': otpMessage.startsWith('❗'),
          'success-message': !otpMessage.startsWith('❗')
        }"
      >
        {{ otpMessage }}
      </p>
      <p
        v-if="message"
        class="message"
        :class="{
          'error-message': message.startsWith('❗'),
          'success-message': !message.startsWith('❗')
        }"
      >
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ForgotPassword",
  data() {
    return {
      identifier: "",
      otpDigits: ["", "", "", "", "", ""],
      newPassword: "",
      confirmPassword: "",
      message: "",
      otpMessage: "",
      otpVerified: false,
    };
  },
  methods: {
    async sendOtp() {
      if (!this.identifier.trim()) {
        this.message = "❗ Please enter your phone number or email.";
        this.clearMessageAfterDelay();
        return;
      }
      try {
        await axios.post("/api/v1/auth/send-otp", {
          identifier: this.identifier,
        });
        this.message = ` OTP sent to ${this.identifier}`;
      } catch (error) {
        this.message = `❗ ${error.response?.data?.message || "Failed to send OTP"}`;
      }
      this.otpVerified = false;
      this.clearMessageAfterDelay();
    },

    handleOtpInput(index, event) {
      const value = event.target.value;
      this.otpDigits[index] = value;
      if (value.length === 1 && index < this.otpDigits.length - 1) {
        const nextRef = this.$refs["otp" + (index + 1)];
        if (nextRef) nextRef.focus();
      }
    },

    handleBackspace(index, event) {
      if (event.key === "Backspace" && !this.otpDigits[index] && index > 0) {
        const prevRef = this.$refs["otp" + (index - 1)];
        if (prevRef) {
          prevRef.focus();
          this.otpDigits[index - 1] = "";
        }
      }
    },

    async verifyOtp() {
      const otp = this.otpDigits.map(d => d.trim()).join("");

      if (otp.length !== 6 || this.otpDigits.some(d => d.trim() === "")) {
        this.otpMessage = "❗ Please enter complete 6-digit OTP.";
        this.clearOtpMessageAfterDelay();
        return;
      }

      try {
        await axios.post("/api/v1/auth/verify-otp", {
          identifier: this.identifier,
          otp: otp,
        });
        this.otpVerified = true;
        this.otpMessage = "OTP verified successfully!";
      } catch (error) {
        this.otpMessage = `❗ ${error.response?.data?.message || "Invalid OTP"}`;
      }

      this.clearOtpMessageAfterDelay();
    },

    async resetPassword() {
      if (!this.otpVerified) {
        this.message = "❗ Please verify your OTP first.";
        this.clearMessageAfterDelay();
        return;
      }

      if (!this.newPassword || !this.confirmPassword) {
        this.message = "❗ Please enter and confirm new password.";
        this.clearMessageAfterDelay();
        return;
      }

      if (this.newPassword !== this.confirmPassword) {
        this.message = "❗ Passwords do not match.";
        this.clearMessageAfterDelay();
        return;
      }

      try {
        const otp = this.otpDigits.map(d => d.trim()).join("");

        await axios.post("/api/v1/auth/reset-password", {
          identifier: this.identifier,
          otp,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword,
        });

        this.message = "🎉 Password reset successful!";
        this.identifier = "";
        this.otpDigits = ["", "", "", "", "", ""];
        this.newPassword = "";
        this.confirmPassword = "";
        this.otpVerified = false;

        setTimeout(() => this.goToLogin(), 2000);
      } catch (error) {
        this.message = `❗ ${error.response?.data?.message || "Password reset failed"}`;
      }

      this.clearMessageAfterDelay();
    },

    goToLogin() {
      this.$emit("close");
    },

    clearMessageAfterDelay() {
      setTimeout(() => {
        this.message = "";
      }, 5000);
    },

    clearOtpMessageAfterDelay() {
      setTimeout(() => {
        this.otpMessage = "";
      }, 5000);
    },
  },
};
</script>


<style scoped>
.forgot-wrapper {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.forgot-container {
  padding: 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: slideFadeIn 0.4s ease;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #888;
}

@keyframes slideFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.forgot-heading {
  font-size: 22px;
  font-weight: bold;
  color: #1bbc9b;
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #1bbc9b;
}

.otp-group {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  justify-content: center;
  align-items: center;
}

.otp-input {
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 18px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  transition: border-color 0.3s ease;
}

.otp-input:focus {
  border-color: #1bbc9b;
}

.action-button {
  width: 100%;
  padding: 12px;
  background-color: #1bbc9b;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 15px;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #17a689;
}

.disabled-button {
  background-color: #ccc;
  cursor: not-allowed;
}

.back-login {
  margin-top: 20px;
  font-size: 14px;
  color: #1bbc9b;
  cursor: pointer;
  user-select: none;
  transition: color 0.3s ease;
}

.back-login:hover {
  color: #0ca488;
  text-decoration: underline;
}

.message {
  margin-top: 10px;
  font-size: 14px;
  font-weight: 500;
}

.success-message {
  color: green;
}

.error-message {
  color: #e74c3c;
}
</style>