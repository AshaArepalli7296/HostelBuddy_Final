<template>
  <Navbar_warden/>
  <div class="hostel-configurator">
    <header>
      <h1>Hostel Settings</h1>
    </header>

    <div class="settings-container">
      <div class="settings-row">
        
        <section class="settings-section">
          <div class="section-header">
            <h2>Leave and Timings</h2>
          </div>
          <p>Set rules for student leave requests and hostel timings.</p>
          
          <div class="settings-grid">
            <div class="setting-item">
              <label>Default Leave Duration (days/month)</label>
              <input type="number" v-model="leaveSettings.maxDays" min="1" max="31">
            </div>
            
            <div class="setting-item">
              <label>Leave Approval Cut-off Time</label>
              <input type="time" v-model="leaveSettings.cutoffTime">
            </div>
            
            <div class="setting-item toggle-group">
              <label>Late Entry Alerts</label>
              <label class="toggle-switch">
                <input type="checkbox" v-model="leaveSettings.lateAlertsEnabled">
                <span class="slider"></span>
              </label>
            </div>
            
            <div class="setting-item" v-if="leaveSettings.lateAlertsEnabled">
              <label>Grace Period (minutes)</label>
              <input type="number" v-model="leaveSettings.gracePeriod" min="0" max="120">
            </div>
          </div>
        </section>

        
        <section class="settings-section">
          <div class="section-header">
            <h2>Room Allocation</h2>
          </div>
          <p>Configure how rooms are assigned to students.</p>
          
          <div class="settings-grid">
            <div class="setting-item">
              <label>Allocation Method</label>
              <select v-model="roomSettings.allocationMethod">
                <option value="auto">Automatic</option>
                <option value="manual">Manual</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            
            <div class="setting-item toggle-group">
              <label>Allow Room Change Requests</label>
              <label class="toggle-switch">
                <input type="checkbox" v-model="roomSettings.allowChanges">
                <span class="slider"></span>
              </label>
            </div>
            
            <div class="setting-item toggle-group">
              <label>Enable Waitlist for Full Rooms</label>
              <label class="toggle-switch">
                <input type="checkbox" v-model="roomSettings.enableWaitlist">
                <span class="slider"></span>
              </label>
            </div>
          </div>
        </section>
      </div>

      <div class="settings-row">
       
        <section class="settings-section">
          <div class="section-header">
            <h2>Quiet Hours</h2>
          </div>
          <p>Define periods for silence in common areas and floors.</p>
          
          <div class="settings-grid">
            <div class="setting-item">
              <label>Start Time</label>
              <input type="time" v-model="quietHours.startTime">
            </div>
            
            <div class="setting-item">
              <label>End Time</label>
              <input type="time" v-model="quietHours.endTime">
            </div>
            
            <div class="setting-item toggle-group">
              <label>Enforce on Weekends</label>
              <label class="toggle-switch">
                <input type="checkbox" v-model="quietHours.enforceWeekends">
                <span class="slider"></span>
              </label>
            </div>
            
            <div class="setting-item toggle-group">
              <label>Special Hours During Exams</label>
              <label class="toggle-switch">
                <input type="checkbox" v-model="quietHours.examHours">
                <span class="slider"></span>
              </label>
            </div>
          </div>
        </section>

        
        <section class="settings-section">
          <div class="section-header">
            <h2>Policies Editor</h2>
          </div>
          <p>Update and publish hostel rules and regulations.</p>
          
          <div class="current-policies">
            <h3>Current Policies</h3>
            <ul>
              <li>No guests allowed after 10 PM.</li>
              <li>Maintain cleanliness in common areas.</li>
              <li>Ragging is strictly prohibited.</li>
            </ul>
          </div>
          
          <div class="settings-grid">
            <div class="setting-item toggle-group">
              <label>Enable Biometric Access</label>
              <label class="toggle-switch">
                <input type="checkbox" v-model="securitySettings.biometricAccess">
                <span class="slider"></span>
              </label>
            </div>
            
            <div class="setting-item toggle-group">
              <label>24/7 CCTV Monitoring</label>
              <label class="toggle-switch">
                <input type="checkbox" v-model="securitySettings.cctvMonitoring">
                <span class="slider"></span>
              </label>
            </div>
            
            <div class="setting-item">
              <label>Emergency Contact Number</label>
              <input type="tel" v-model="securitySettings.emergencyContact">
            </div>
          </div>
        </section>
      </div>
      
      <div class="action-buttons">
        <button @click="saveSettings" class="save-btn">Save All Settings</button>
        <button @click="resetToDefault" class="reset-btn">Reset to Default</button>
        <button @click="downloadPDF" class="download-btn">Download PDF</button>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Navbar_warden from '../../../components/Navbar_warden.vue';
import Footer from '../../../components/Footer.vue';

export default {
  name: 'HostelConfigurator',
   components:{
    Navbar_warden,Footer
  },
  data() {
    return {
      leaveSettings: {
        maxDays: 5,
        cutoffTime: "15:00",
        lateAlertsEnabled: true,
        gracePeriod: 15
      },
      roomSettings: {
        allocationMethod: "auto",
        allowChanges: true,
        enableWaitlist: true
      },
      quietHours: {
        startTime: "22:00",
        endTime: "06:00",
        enforceWeekends: true,
        examHours: true
      },
      securitySettings: {
        biometricAccess: false,
        cctvMonitoring: true,
        emergencyContact: "+91 1234567890"
      }
    }
  },
  methods: {
    saveSettings() {
      
      console.log("Settings saved:", {
        leaveSettings: this.leaveSettings,
        roomSettings: this.roomSettings,
        quietHours: this.quietHours,
        securitySettings: this.securitySettings
      });
      alert("Settings updated successfully!");
    },
    resetToDefault() {
      
      this.leaveSettings = {
        maxDays: 5,
        cutoffTime: "15:00",
        lateAlertsEnabled: true,
        gracePeriod: 15
      };
      this.roomSettings = {
        allocationMethod: "auto",
        allowChanges: true,
        enableWaitlist: true
      };
      this.quietHours = {
        startTime: "22:00",
        endTime: "06:00",
        enforceWeekends: true,
        examHours: true
      };
      this.securitySettings = {
        biometricAccess: false,
        cctvMonitoring: true,
        emergencyContact: "+91 1234567890"
      };
    },
    downloadPDF() {
      
      console.log("Downloading PDF...");
    }
  }
}
</script>

<style scoped>
.hostel-configurator {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

header {
  margin-bottom: 2rem;
  text-align: center;
}
.settings-row {
  display: flex;
  gap: 2rem;
}

.settings-row > .settings-section {
  flex: 1;
}

@media (max-width: 768px) {
  .settings-row {
    flex-direction: column;
  }
}

h1 {
  color: #1BBC9B;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.settings-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.settings-section {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.section-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

h2 {
  color: #1BBC9B;
  font-size: 1.8rem;
  margin: 0;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.setting-item {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

input[type="number"],
input[type="time"],
input[type="tel"],
select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.toggle-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #1BBC9B;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.current-policies {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.current-policies h3 {
  margin-top: 0;
  color: #555;
}

.current-policies ul {
  padding-left: 1.5rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.save-btn {
  background-color: #1BBC9B;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.save-btn:hover {
  background-color: #16a085;
}

.reset-btn {
  background-color:white;
  color: #1BBC9B;
  border: 1px solid #1BBC9B;;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.reset-btn:hover {
  background-color:#1BBC9B;
  color:white;
}

.download-btn {
  background-color:#1BBC9B;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.download-btn:hover {
  background-color: #1BBC9B;
}

@media (max-width: 768px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>