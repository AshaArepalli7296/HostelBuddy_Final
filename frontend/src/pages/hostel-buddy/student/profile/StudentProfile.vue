<template>
  <Navbar_Student />
  <div class="Theme">
    <div class="student-profile">
      <main>
        <div class="profile-container">
          <div class="profile-header">
            <div class="avatar-container">
              <img :src="profile.imageUrl || defaultProfilePic" alt="Profile Picture" class="avatar">
              <button @click="triggerFileInput" class="avatar-edit-btn">
                <i class="fas fa-camera"></i>
              </button>
              <input type="file" ref="fileInput" @change="handleImageUpload" accept="image/*" style="display: none" />
            </div>
            <div class="profile-info">
              <div v-if="editMode">
                <input type="text" v-model="profile.name" class="edit-name-input" />
              </div>
              <div v-else>
                <h1>{{ profile.name }}</h1>
              </div>
              <p class="role">Student</p>
            </div>
            <button @click="toggleEditMode" class="edit-profile-btn">
              {{ editMode ? 'Cancel' : 'Edit Profile' }}
            </button>
          </div>

          <div class="profile-content">
            <div class="profile-section">
              <div class="section-header">
                <h2><i class="fas fa-user-circle"></i> Personal Details</h2>
                <button v-if="editMode" @click="saveProfile" class="save-btn">Save Changes</button>
              </div>

              <div class="details-grid">
                <div class="detail-item">
                  <label>Date of Birth</label>
                  <input v-if="editMode" v-model="profile.dob" type="date">
                  <p v-else>{{ profile.dob }}</p>
                </div>

                <div class="detail-item">
                  <label>Email</label>
                  <input v-if="editMode" v-model="profile.email" type="email">
                  <p v-else>{{ profile.email }}</p>
                </div>

                <div class="detail-item">
                  <label>Phone</label>
                  <input v-if="editMode" v-model="profile.phone" type="tel">
                  <p v-else>{{ profile.phone }}</p>
                </div>

                <div class="detail-item">
                  <label>Address</label>
                  <textarea v-if="editMode" v-model="profile.address"></textarea>
                  <p v-else>{{ profile.address }}</p>
                </div>
              </div>
            </div>
            <div class="back-nav">
              <button @click="goToDashboard" class="back-link">
                ← Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  <Footer />
</template>

<script>
import Navbar_Student from '../../../../components/Navbar_Student.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'StudentProfile',
  components: {
    Navbar_Student,
    Footer
  },
  data() {
    return {
      editMode: false,
      defaultProfilePic: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      profile: {
        id: '',
        name: '',
        dob: '',
        email: '',
        phone: '',
        address: '',
        imageUrl: ''
      },
      originalProfile: {}
    };
  },
  mounted() {
    const savedProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (savedProfile) {
      this.profile.id = savedProfile._id;
      this.profile.name = savedProfile.fullName || savedProfile.name || '';
      this.profile.email = savedProfile.email || '';
      this.profile.phone = savedProfile.contact || savedProfile.phone || '';
      this.profile.dob = savedProfile.dob || '';
      this.profile.address = savedProfile.address || '';
      this.profile.imageUrl = savedProfile.imageUrl || '';
    }
  },
  methods: {
    toggleEditMode() {
      if (!this.editMode) {
        this.originalProfile = JSON.parse(JSON.stringify(this.profile));
      }
      this.editMode = !this.editMode;
    },
async saveProfile() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/v1/auth/update/${this.profile.id}`, {
      method: 'PATCH', // ✅ fix: PATCH instead of PUT
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: this.profile.name,
        email: this.profile.email,
        contact: this.profile.phone,
        dob: this.profile.dob,
        address: this.profile.address,
        imageUrl: this.profile.imageUrl
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    localStorage.setItem('userProfile', JSON.stringify(data.data.user));
    this.profile.imageUrl = data.data.user.imageUrl;
    this.editMode = false;
    alert('Profile updated successfully!');
  } catch (err) {
    console.error('Save error:', err);
    alert('Profile update failed. Try again.');
  }
}
,
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('image', file);

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/v1/auth/users/${this.profile.id}/avatar`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message);

        this.profile.imageUrl = data.data.imageUrl;
        localStorage.setItem('userProfile', JSON.stringify(data.data.user));
        alert('Photo updated successfully!');
      } catch (err) {
        console.error('Image upload failed:', err);
        alert('Image upload failed. Please try again.');
      }
    },
    goToDashboard() {
      this.$router.push({ name: 'StudentDashboard' });
    }
  }
};
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