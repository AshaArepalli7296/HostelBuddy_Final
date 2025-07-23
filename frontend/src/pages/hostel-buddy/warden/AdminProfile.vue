<template>
  <div class="admin-profile">
    <Navbar_warden />
    <main>
      <div class="profile-container">
        <!-- Header -->
        <div class="profile-header">
          <div class="avatar-container">
            <img :src="warden.avatar || defaultAvatar" alt="Warden Avatar" class="avatar" />
            <label class="avatar-edit-btn">
              <i class="fas fa-camera"></i>
              <input type="file" accept="image/*" @change="onAvatarSelect" hidden />
            </label>
          </div>
          <div class="profile-info">
            <h1>{{ warden.name }}</h1>
            <p class="role">Hostel Warden</p>
            <p class="joined-date">Warden since {{ warden.joinedDate }}</p>
          </div>
          <button @click="editMode = !editMode" class="edit-profile-btn">
            {{ editMode ? 'Cancel' : 'Edit Profile' }}
          </button>
        </div>

        <!-- Personal & Professional Details -->
        <div class="profile-content">
          <div class="profile-section">
            <div class="section-header">
              <h2><i class="fas fa-user-circle"></i> Personal Details</h2>
              <button v-if="editMode" @click="saveProfile" class="save-btn">Save Changes</button>
            </div>
            <div class="details-grid">
              <div class="detail-item">
                <label>Full Name</label>
                <input v-if="editMode" v-model="warden.name" />
                <p v-else>{{ warden.name }}</p>
              </div>
              <div class="detail-item">
                <label>Email</label>
                <input v-if="editMode" v-model="warden.email" />
                <p v-else>{{ warden.email }}</p>
              </div>
              <div class="detail-item">
                <label>Phone</label>
                <input v-if="editMode" v-model="warden.phone" />
                <p v-else>{{ warden.phone }}</p>
              </div>
              <div class="detail-item">
                <label>Address</label>
                <textarea v-if="editMode" v-model="warden.address"></textarea>
                <p v-else>{{ warden.address }}</p>
              </div>
            </div>
          </div>

          <div class="profile-section">
            <h2><i class="fas fa-briefcase"></i> Professional Details</h2>
            <div class="details-grid">
              <div class="detail-item">
                <label>Warden ID</label>
                <p>{{ warden.wardenId }}</p>
              </div>
              <div class="detail-item">
                <label>Hostel</label>
                <p>{{ warden.hostelName }}</p>
              </div>
              <div class="detail-item">
                <label>Department</label>
                <p>{{ warden.department }}</p>
              </div>
              <div class="detail-item">
                <label>Years of Service</label>
                <p>{{ warden.yearsOfService }}</p>
              </div>
            </div>
          </div>

          <div class="profile-section">
            <h2><i class="fas fa-shield-alt"></i> Account Security</h2>
            <div class="security-actions">
              <button @click="showChangePassword = true" class="security-btn">
                <i class="fas fa-key"></i> Change Password
              </button>
              <button @click="showTwoFactorModal = true" class="security-btn">
                <i class="fas fa-lock"></i> Two-Factor Authentication
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />

    <!-- Change Password Modal -->
    <div v-if="showChangePassword" class="modal">
      <div class="modal-content">
        <span class="close" @click="showChangePassword = false">&times;</span>
        <h2>Change Password</h2>
        <div class="form-group"><label>Current Password</label><input v-model="password.current" type="password" /></div>
        <div class="form-group"><label>New Password</label><input v-model="password.new" type="password" /></div>
        <div class="form-group"><label>Confirm New Password</label><input v-model="password.confirm" type="password" /></div>
        <button @click="updatePassword" class="submit-btn">Update Password</button>
      </div>
    </div>

    <!-- 2FA Modal -->
    <div v-if="showTwoFactorModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showTwoFactorModal = false">&times;</span>
        <h2>Two-Factor Authentication</h2>
        <div class="two-factor-content">
          <p>Or enter this secret key manually:</p>
          <div class="secret-key">JBSWY3DPEHPK3PXP</div>
          <div class="form-group">
            <label>Verification Code</label>
            <input v-model="twoFactorCode" type="text" placeholder="Enter 6-digit code" />
          </div>
          <button @click="enableTwoFactor" class="submit-btn">Enable 2FA</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Navbar_warden from '@/components/Navbar_warden.vue'

export default {
  name: 'AdminProfile',
  components: { Navbar_warden, Footer },
  data() {
    return {
      editMode: false,
      showChangePassword: false,
      showTwoFactorModal: false,
      twoFactorCode: '',
      password: {
        current: '',
        new: '',
        confirm: ''
      },
      defaultAvatar: '/images/default-avatar.png',
      newAvatarFile: null,
      warden: {
        id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        wardenId: '',
        hostelName: '',
        department: '',
        yearsOfService: '',
        joinedDate: '',
        avatar: ''
      }
    }
  },
  mounted() {
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      const user = JSON.parse(userProfile);
      this.warden = {
        id: user._id,
        name: user.fullName,
        email: user.email,
        phone: user.contact,
        address: user.address,
        wardenId: user.fieldId,
        avatar: user.imageUrl,
        hostelName: user.hostelName || 'Not Assigned',
        department: user.department || 'Not Assigned',
        yearsOfService: user.yearsOfService || 'N/A',
        joinedDate: user.joinedDate || 'N/A'
      };
    }
  },
  methods: {
    onAvatarSelect(event) {
      const file = event.target.files[0];
      if (file) {
        this.newAvatarFile = file;
        this.warden.avatar = URL.createObjectURL(file);
      }
    },
    async saveProfile() {
      try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('fullName', this.warden.name);
        formData.append('email', this.warden.email);
        formData.append('contact', this.warden.phone);
        formData.append('address', this.warden.address);

        if (this.newAvatarFile) {
          formData.append('avatar', this.newAvatarFile);
        }

        const response = await fetch(`/api/v1/auth/update/${this.warden.id}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message);

        localStorage.setItem('userProfile', JSON.stringify(data.data.user));
        alert('Profile updated successfully!');
        window.location.reload();
      } catch (err) {
        console.error('Profile update failed:', err);
        alert('Something went wrong. Try again.');
      }
    },
    updatePassword() {
      if (this.password.new !== this.password.confirm) {
        alert("New passwords don't match!");
        return;
      }
      console.log('Updating password...');
      this.showChangePassword = false;
      this.password = { current: '', new: '', confirm: '' };
      alert('Password updated successfully!');
    },
    enableTwoFactor() {
      if (this.twoFactorCode.length !== 6) {
        alert('Please enter a valid 6-digit code');
        return;
      }
      console.log('2FA enabled with:', this.twoFactorCode);
      this.showTwoFactorModal = false;
      this.twoFactorCode = '';
      alert('Two-Factor Authentication enabled!');
    }
  }
}
</script>
<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

/* All your CSS remains unchanged (as posted) */

.student-profile {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.profile-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1.5rem;
}
.back-nav {
  margin-bottom: 1rem;
  text-align: center;
}
.back-link {
  display: inline-flex;
  align-items: center;
  background: none;
  border: none;
  color: #1BBC9B;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}
.back-link:hover {
  background-color: #e6fffa;
}
.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.avatar-container {
  position: relative;
  width: 120px;
  height: 120px;
}
.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #1BBC9B;
}
.avatar-edit-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #1BBC9B;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-edit-btn:hover {
  background: #16a085;
}
.profile-info {
  flex: 1;
}
.profile-info h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #1BBC9B;
}
.role {
  margin: 0.25rem 0;
  font-weight: 500;
  color: #555;
}
.edit-profile-btn {
  background: #1BBC9B;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}
.edit-profile-btn:hover {
  background: #16a085;
}
.edit-name-input {
  font-size: 1.8rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}
.profile-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}
.profile-section {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.section-header h2 {
  margin: 0;
  font-size: 1.4rem;
  color: #1BBC9B;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.save-btn {
  background: #1BBC9B;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}
.save-btn:hover {
  background: #16a085;
}
.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}
.detail-item label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}
.detail-item p {
  margin: 0;
  padding: 0.75rem;
  background: #f9f9f9;
  border-radius: 4px;
}
.detail-item input,
.detail-item textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
}
.detail-item textarea {
  min-height: 100px;
}
.Theme {
  background: linear-gradient(to bottom, #e0f8f6 0%, #f0fdfc 30%, #ffffff 50%, #f0fdfc 70%, #e0f8f6 100%);
}
@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  .avatar-container {
    margin: 0 auto;
  }
  .profile-info {
    text-align: center;
  }
}
</style>
<style scoped>
.admin-profile {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.profile-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1.5rem;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.avatar-container {
  position: relative;
  width: 120px;
  height: 120px;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #1BBC9B;
}

.avatar-edit-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #1BBC9B;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-edit-btn:hover {
  background: #16a085;
}

.profile-info {
  flex: 1;
}

.profile-info h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #1BBC9B;
}

.role {
  margin: 0.25rem 0;
  font-weight: 500;
  color: #555;
}

.joined-date {
  margin: 0;
  color: #777;
  font-size: 0.9rem;
}

.edit-profile-btn {
  background: #1BBC9B;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.edit-profile-btn:hover {
  background: #16a085;
}

.profile-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 1.5rem;
}

.profile-section {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

.profile-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  margin: 0;
  font-size: 1.4rem;
  color: #1BBC9B;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.save-btn {
  background: #1BBC9B;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.save-btn:hover {
  background: #16a085;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.detail-item {
  margin-bottom: 1rem;
}

.detail-item label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.detail-item p {
  margin: 0;
  padding: 0.75rem;
  background: #f9f9f9;
  border-radius: 4px;
}

.detail-item input,
.detail-item textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
}

.detail-item textarea {
  min-height: 100px;
}

.security-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.security-btn {
  flex: 1;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
}

.security-btn:hover {
  border-color: #1BBC9B;
  color: #1BBC9B;
}

.security-btn i {
  font-size: 1.2rem;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  padding: 1.5rem;
  position: relative;
}

.close {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  font-size: 1.5rem;
  cursor: pointer;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
}

.submit-btn {
  background: #1BBC9B;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  width: 100%;
}

.submit-btn:hover {
  background: #16a085;
}

.two-factor-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
}

.qr-code {
  text-align: center;
}

.qr-code img {
  width: 200px;
  height: 200px;
  margin-bottom: 0.5rem;
}

.qr-code p {
  margin: 0;
  color: #666;
}

.secret-key {
  font-family: monospace;
  background: #f5f5f5;
  padding: 0.75rem;
  border-radius: 4px;
  margin: 0.5rem 0;
  text-align: center;
  font-weight: bold;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .avatar-container {
    margin: 0 auto;
  }
  
  .profile-info {
    text-align: center;
  }
  
  .security-actions {
    flex-direction: column;
  }
  
  .two-factor-content {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .details-grid {
    grid-template-columns: 1fr;
  }
}
</style>