<template>
  <div class="help-page">
    <div class="help-container">
      
      <div class="help-header">
        <h1>Need a Hand? <span class="emoji"></span></h1>
        <p>Find answers to your questions, contact our support team, or submit a query. We're here to help!</p>
      </div>

      
      <div class="search-section">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search questions by keywords like 'leave', 'mess', etc."
          >
          <button @click="searchFAQs"> Search</button>
        </div>
      </div>

      
      <div class="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div class="faq-tabs">
          <button 
            v-for="tab in tabs" 
            :key="tab" 
            @click="currentTab = tab"
            :class="{ active: currentTab === tab }"
          >
            {{ tab }}
          </button>
        </div>

        <div class="faq-questions">
          <div 
            v-for="(question, index) in filteredQuestions" 
            :key="index" 
            class="faq-item"
            @click="toggleAnswer(index)"
          >
            <div class="question">
              <span>{{ question.q }}</span>
              <span class="toggle-icon">{{ activeQuestion === index ? '−' : '+' }}</span>
            </div>
            <div v-if="activeQuestion === index" class="answer">
              {{ question.a }}
            </div>
          </div>
        </div>
      </div>

      
      <div class="quick-access">
        <h2>Quick Access</h2>
        <div class="quick-links">
          <router-link to="/track-complaint" class="quick-link">
            <span class="icon"></span> Track Complaint
          </router-link>
          <router-link to="/fee-management" class="quick-link">
            <span class="icon"></span> Fee Structure
          </router-link>
          <router-link to="/profile" class="quick-link">
            <span class="icon"></span> Update My Profile
          </router-link>
          <router-link to="/rules" class="quick-link">
            <span class="icon"></span> View Rules & Guidelines
          </router-link>
        </div>
      </div>

      
      <div class="query-section">
        <h2>Submit a Query</h2>
        <form @submit.prevent="submitQuery" class="query-form">
          <div class="form-row">
            <div class="form-group">
              <label>Name</label>
              <input type="text" v-model="form.name" required>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="form.email" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Role</label>
              <select v-model="form.role" required>
                <option value="">Select your role</option>
                <option value="student">Student</option>
                <option value="warden">Warden</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div class="form-group">
              <label>Topic</label>
              <select v-model="form.topic" required>
                <option value="">Select a topic</option>
                <option value="complaint">Complaint</option>
                <option value="room">Room Allocation</option>
                <option value="fees">Fee Payments</option>
                <option value="mess">Mess & Meals</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Message</label>
            <textarea 
              v-model="form.message" 
              placeholder="Describe your issue or question here..." 
              required
            ></textarea>
            <div class="char-count">{{ form.message.length }}/500</div>
          </div>

          <div class="form-group">
            <label>Attach a file (optional)</label>
            <input 
              type="file" 
              @change="handleFileUpload" 
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            >
            <small>Max file size: 2MB, Supports PDF, DOC, PNG, JPG.</small>
          </div>

          <div class="captcha">
            <label>
              <input type="checkbox" v-model="form.captcha" required>
              I am not a robot
            </label>
          </div>
          <div class="submit-btn-container">
            <button type="submit" class="submit-btn">Submit Query</button>
          </div>

          
          
        </form>
      </div>

      
      <div class="contact-section">
        <h2>Contact Information</h2>
        <div class="contact-grid">
          <div class="contact-card">
            <h3>Phone Support</h3>
            <p>Hostel Officer: +1 (123) 456-7890</p>
            <p>IT Desk: +1 (123) 456-7891</p>
          </div>

          <div class="contact-card">
            <h3>Email</h3>
            <p>support@hostelbuddy.com</p>
          </div>

          <div class="contact-card">
            <h3>Office Timings</h3>
            <p>Monday - Saturday</p>
            <p>9:00 AM - 6:00 PM</p>
          </div>

          <div class="contact-card">
            <h3>Location</h3>
            <div class="map-placeholder">
             
              <img src="https://maps.googleapis.com/maps/api/staticmap?center=Hostel+Office&zoom=15&size=300x150&maptype=roadmap&markers=color:green%7CHostel+Office&key=YOUR_API_KEY" alt="Hostel Office Location">
            </div>
          </div>
        </div>
      </div>

      
      <div class="resources-section">
        <h2>Support Resources</h2>
        <div class="resources-grid">
          <a href="/hostel-handbook.pdf" download class="resource-card">
            <span class="icon">📘</span>
            <span>Download Hostel Handbook (PDF)</span>
          </a>
          <a href="https://youtu.be/example" target="_blank" class="resource-card">
            <span class="icon">🎬</span>
            <span>Video Tutorial: How to Use HostelBuddy</span>
          </a>
        </div>
      </div>
    </div>

   
    <div class="chatbot-widget" @click="toggleChatbot">
      <span class="chatbot-icon">🤖</span>
      <div v-if="showChatbot" class="chatbot-container">
        <div class="chatbot-header">
          <h3>HostelBuddy Assistant</h3>
          <button @click.stop="toggleChatbot">×</button>
        </div>
        <div class="chatbot-messages">
          <div v-for="(msg, index) in chatbotMessages" :key="index" :class="msg.type">
            {{ msg.text }}
          </div>
        </div>
        <div class="chatbot-quick-replies">
          <button v-for="(reply, index) in quickReplies" :key="index" @click="sendQuickReply(reply)">
            {{ reply }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'


const tabs = ['General', 'Room Allocation', 'Fee Payments', 'Mess & Meals', 'Complaints']
const currentTab = ref('General')
const activeQuestion = ref(null)
const searchQuery = ref('')

const faqQuestions = {
  'General': [
    { q: 'How do I raise a complaint?', a: 'You can submit a complaint through the Complaints section in your dashboard or visit the hostel office.' },
    { q: 'How can I track my complaint status?', a: 'Go to the Track Complaint section where you can see all your submitted complaints and their status.' }
  ],
  'Room Allocation': [
    { q: 'When will I get my room allocation?', a: 'Room allocations are typically done at the beginning of each semester. You will receive an email notification.' },
    { q: 'Can I request a room change?', a: 'Yes, you can submit a room change request through the Room Info section, subject to availability.' }
  ],
  'Fee Payments': [
    { q: 'What payment methods are accepted?', a: 'We accept online payments via credit/debit cards, net banking, and UPI. Cash payments can be made at the hostel office.' },
    { q: 'Is there a late fee for delayed payments?', a: 'Yes, a late fee of ₹50 per day will be charged after the due date.' }
  ],
  'Mess & Meals': [
    { q: 'How do I opt out of mess meals?', a: 'You can submit a mess cancellation request at least 3 days in advance through the Mess section.' },
    { q: 'What are the mess timings?', a: 'Breakfast: 7:30-9:30 AM, Lunch: 12:30-2:30 PM, Dinner: 7:30-9:30 PM' }
  ],
  'Complaints': [
    { q: 'How long does it take to resolve a complaint?', a: 'Most complaints are resolved within 3-5 working days depending on the nature of the complaint.' },
    { q: 'Can I attach photos to my complaint?', a: 'Yes, you can upload supporting documents or images when submitting a complaint.' }
  ]
}


const form = ref({
  name: '',
  email: '',
  role: '',
  topic: '',
  message: '',
  file: null,
  captcha: false
})


const showChatbot = ref(false)
const chatbotMessages = ref([
  { type: 'bot', text: 'Hi there! How can I help you today?' }
])
const quickReplies = ref([
  'How to raise a complaint?',
  'Where to check room allotment?',
  'Mess cancel steps'
])

const filteredQuestions = computed(() => {
  if (!searchQuery.value) return faqQuestions[currentTab.value]
  
  return faqQuestions[currentTab.value].filter(question => 
    question.q.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    question.a.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})


const toggleAnswer = (index) => {
  activeQuestion.value = activeQuestion.value === index ? null : index
}

const searchFAQs = () => {
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file && file.size <= 2 * 1024 * 1024) { 
    form.value.file = file
  } else {
    alert('File size must be less than 2MB')
    event.target.value = ''
  }
}

const submitQuery = () => {

  alert('Your query has been submitted successfully!')
  form.value = {
    name: '',
    email: '',
    role: '',
    topic: '',
    message: '',
    file: null,
    captcha: false
  }
}

const toggleChatbot = () => {
  showChatbot.value = !showChatbot.value
}

const sendQuickReply = (reply) => {
  chatbotMessages.value.push({ type: 'user', text: reply })
  
  
  setTimeout(() => {
    let response = ''
    if (reply.includes('complaint')) {
      response = 'You can submit complaints through the Complaints section in your dashboard. Would you like me to take you there?'
    } else if (reply.includes('room')) {
      response = 'Room allocations can be checked in the Room Info section. The status is updated in real-time.'
    } else if (reply.includes('mess')) {
      response = 'Mess cancellation requests must be submitted at least 3 days in advance through the Mess section.'
    } else {
      response = 'I can help with common questions about complaints, room allocation, and mess services. What do you need help with?'
    }
    
    chatbotMessages.value.push({ type: 'bot', text: response })
  }, 500)
}
</script>

<style scoped>
.help-page {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding: 2rem;
  color: #333;
}

.help-container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.help-header {
  text-align: center;
  margin-bottom: 2rem;
}

.help-header h1 {
  font-size: 2.5rem;
  color: #1BBC9B;
  margin-bottom: 0.5rem;
}

.help-header p {
  font-size: 1.1rem;
  color: #555;
}

.search-section {
  margin-bottom: 2rem;
}

.search-box {
  display: flex;
  max-width: 600px;
  margin: 0 auto;
}

.search-box input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px 0 0 8px;
  font-size: 1rem;
}

.search-box button {
  padding: 0 1.5rem;
  background: #1BBC9B;
  color: white;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
}

.faq-section {
  margin-bottom: 3rem;
}

.faq-section h2 {
  color: #1BBC9B;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.faq-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.faq-tabs button {
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #1BBC9B;
  border: none;
  border-radius: 6px;
  color: #1BBC9B;
  cursor: pointer;
  transition: all 0.2s;
}

.faq-tabs button:hover {
  background: #e8f9f5
}

.faq-tabs button.active {
  background: #1BBC9B;
  color: white;
  font-weight: 500;
}

.faq-questions {
  border: 1.5px solid #1BBC9B;
  border-radius: 8px;
  overflow: hidden;
}

.faq-item {
  border-bottom: 1px solid #1bbcb9;
  cursor: pointer;
  transition: background 0.2s;
}

.faq-item:hover {
  background: #f9f9f9;
}

.faq-item:last-child {
  border-bottom: none;
}

.question {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toggle-icon {
  font-weight: bold;
  font-size: 1.2rem;
  color: #1BBC9B;
}

.answer {
  padding: 1rem;
  background: #f9f9f9;
  color: #333;
  border-top: 1px solid #eee;
}

.quick-access {
  margin-bottom: 3rem;
}

.quick-access h2 {
  color: #1BBC9B;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.quick-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: #f5f7fa;
  border-radius: 8px;
  color: #333;
  text-decoration: none;
  transition: all 0.2s;
}

.quick-link:hover {
  background: #e0e8f0;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.icon {
  font-size: 1.2rem;
}

.query-section {
  margin-bottom: 3rem;
}

.query-section h2 {
  color: #1BBC9B;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.query-form {
  background: white;
  padding: 2.5rem;
  border-radius: 8px;
  border: 1px solid #eee;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
}

.form-group {
  flex: 1;
  margin-bottom: 1rem;
  padding: 0.75rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  color: #333;
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

.char-count {
  text-align: right;
  font-size: 0.8rem;
  color: #777;
  margin-top: 0.25rem;
}

.captcha {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.captcha label {
  color: #555;
}
.submit-btn-container {
  text-align: center;
  margin: 1rem 0;
}
.submit-btn {
  width: 20%;
  min-width: 100px;
  padding: 0.5rem;
  background: #1BBC9B;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
  text-align: center;
  display: inline-block;
}

.submit-btn:hover {
  background: #16a085;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.contact-section {
  margin-bottom: 3rem;
}

.contact-section h2 {
  color: #1BBC9B;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.contact-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #eee;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.contact-card h3 {
  color: #1BBC9B;
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.contact-card p {
  margin: 0.5rem 0;
  color: #555;
}

.map-placeholder {
  height: 150px;
  background: #f5f7fa;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.map-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.resources-section {
  margin-bottom: 2rem;
}

.resources-section h2 {
  color: #1BBC9B;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.resource-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  color: #333;
  text-decoration: none;
  transition: all 0.2s;
  border: 1px solid #eee;
}

.resource-card:hover {
  background: #f5f7fa;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}


.chatbot-widget {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
}

.chatbot-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: #1BBC9B;
  color: white;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.chatbot-container {
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 300px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  border: 1px solid #ddd;
}

.chatbot-header {
  padding: 1rem;
  background: #1BBC9B;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chatbot-header h3 {
  margin: 0;
  color: white;
  font-size: 1rem;
}

.chatbot-header button {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
}

.chatbot-messages {
  padding: 1rem;
  max-height: 300px;
  overflow-y: auto;
}

.chatbot-messages .bot {
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background: #f5f7fa;
  border-radius: 6px;
  color: #333;
}

.chatbot-messages .user {
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background: #1BBC9B;
  border-radius: 6px;
  color: white;
  text-align: right;
}

.chatbot-quick-replies {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.chatbot-quick-replies button {
  padding: 0.5rem;
  background: #f5f7fa;
  border: none;
  border-radius: 6px;
  color: #333;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
}

.chatbot-quick-replies button:hover {
  background: #e0e8f0;
}

@media (max-width: 768px) {
  .help-container {
    padding: 1rem;
  }
  
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .quick-links {
    grid-template-columns: 1fr;
  }
  
  .chatbot-widget {
    bottom: 1rem;
    right: 1rem;
  }
  
  .chatbot-container {
    width: calc(100vw - 2rem);
    right: -1rem;
  }
}
</style>