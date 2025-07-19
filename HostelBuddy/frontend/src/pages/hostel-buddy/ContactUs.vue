<template>
  <div class="contact-page" :class="{'dark-theme': isDarkTheme}">
    <Navbar />
    <main>
      <!-- Hero Section -->
      <section class="contact-hero" >
        <div class="hero-content">
          <h1>Contact HostelBuddy</h1>
          <p>We're here to help you with any questions or issues</p>
        </div>
      </section>

      <!-- Contact Cards Grid -->
      <div class="contact-grid">
        <!-- Hostel Administration -->
        <div class="contact-section">
          <h2 class="section-title">
            <i class="fas fa-building"></i> Hostel Administration
          </h2>
          <div class="contact-cards">
            <div class="contact-card">
              <div class="card-icon warden">
                <i class="fas fa-user-shield"></i>
              </div>
              <h3>Warden Office</h3>
              <p>For room allocations, complaints, and hostel rules</p>
              <div class="contact-methods">
                <div class="method">
                  <i class="fas fa-phone"></i>
                  <span>+91 9876543210</span>
                </div>
                <div class="method">
                  <i class="fas fa-envelope"></i>
                  <a href="mailto:warden@hostelbuddy.edu">warden@hostelbuddy.edu</a>
                </div>
                <div class="method">
                  <i class="fas fa-clock"></i>
                  <span>Mon-Fri, 9AM-5PM</span>
                </div>
              </div>
            </div>

            <div class="contact-card">
              <div class="card-icon caretaker">
                <i class="fas fa-user-headset"></i>
              </div>
              <h3>Caretaker/Manager</h3>
              <p>For daily issues and maintenance requests</p>
              <div class="contact-methods">
                <div class="method">
                  <i class="fas fa-phone"></i>
                  <span>+91 8765432109</span>
                </div>
                <div class="method">
                  <i class="fas fa-envelope"></i>
                  <a href="mailto:caretaker@hostelbuddy.edu">caretaker@hostelbuddy.edu</a>
                </div>
              </div>
            </div>

            <div class="contact-card emergency">
              <div class="card-icon emergency">
                <i class="fas fa-exclamation-triangle"></i>
              </div>
              <h3>Emergency Contact</h3>
              <p>24/7 support for urgent situations</p>
              <div class="contact-methods">
                <div class="method">
                  <i class="fas fa-phone"></i>
                  <span>+91 9998887776</span>
                </div>
                <div class="method">
                  <i class="fas fa-bell"></i>
                  <span>Available 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Technical Support -->
        <div class="contact-section">
          <h2 class="section-title">
            <i class="fas fa-laptop-code"></i> Technical Support
          </h2>
          <div class="contact-cards">
            <div class="contact-card">
              <div class="card-icon support">
                <i class="fas fa-headset"></i>
              </div>
              <h3>Customer Support</h3>
              <p>For app login issues or feature questions</p>
              <div class="contact-methods">
                <div class="method">
                  <i class="fas fa-envelope"></i>
                  <a href="mailto:support@hostelbuddy.com">support@hostelbuddy.com</a>
                </div>
                <div class="method">
                  <i class="fas fa-comment-dots"></i>
                  <span>Live Chat (9AM-9PM)</span>
                </div>
              </div>
            </div>

            <div class="contact-card">
              <div class="card-icon dev">
                <i class="fas fa-code"></i>
              </div>
              <h3>Development Team</h3>
              <p>Report bugs or suggest improvements</p>
              <div class="contact-methods">
                <div class="method">
                  <i class="fas fa-envelope"></i>
                  <a href="mailto:dev@hostelbuddy.com">dev@hostelbuddy.com</a>
                </div>
                <div class="method">
                  <i class="fab fa-github"></i>
                  <a href="https://github.com/hostelbuddy/issues" target="_blank">GitHub Issues</a>
                </div>
              </div>
            </div>

            <div class="contact-card">
              <div class="card-icon social">
                <i class="fas fa-hashtag"></i>
              </div>
              <h3>Social Media</h3>
              <p>Connect with us on these platforms</p>
              <div class="contact-methods social-links">
                <a href="#" class="social whatsapp">
                  <i class="fab fa-whatsapp"></i> WhatsApp Group
                </a>
                <a href="#" class="social twitter">
                  <i class="fab fa-twitter"></i> @HostelBuddyHelp
                </a>
                <a href="#" class="social instagram">
                  <i class="fab fa-instagram"></i> @HostelBuddyOfficial
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="contact-form-section">
        <h2><i class="fas fa-paper-plane"></i> Send Us a Message</h2>
        <form @submit.prevent="submitForm" class="contact-form">
          <div class="form-group">
            <label for="name">Your Name</label>
            <input type="text" id="name" v-model="form.name" required>
          </div>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" v-model="form.email" required>
          </div>
          <div class="form-group">
            <label for="category">Contact Regarding</label>
            <select id="category" v-model="form.category" required>
              <option value="">Select a category</option>
              <option value="hostel">Hostel Administration</option>
              <option value="technical">Technical Support</option>
              <option value="feedback">Feedback/Suggestions</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="form-group">
            <label for="message">Your Message</label>
            <textarea id="message" v-model="form.message" rows="5" required></textarea>
          </div>
          <button type="submit" class="submit-btn">
            <i class="fas fa-paper-plane"></i> Send Message
          </button>
        </form>
      </div>

      <!-- FAQ Section -->
      <div class="faq-section">
        <h2><i class="fas fa-question-circle"></i> Frequently Asked Questions</h2>
        <div class="faq-list">
          <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
            <button class="faq-question" @click="toggleFaq(index)">
              {{ faq.question }}
              <i class="fas" :class="{'fa-chevron-down': !faq.open, 'fa-chevron-up': faq.open}"></i>
            </button>
            <div class="faq-answer" v-show="faq.open">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'ContactPage',
  components: {
    Navbar,
    Footer
  },
  setup() {
    // ✅ Dark theme state
    const isDarkTheme = ref(false);

    // ✅ Contact form data
    const form = ref({
      name: '',
      email: '',
      category: '',
      message: ''
    });

    // ✅ FAQ list
    const faqs = ref([
      {
        question: "How quickly will I get a response from the warden office?",
        answer: "Typically within 24-48 hours during working days. For urgent matters, please call the emergency contact.",
        open: false
      },
      {
        question: "What information should I include when reporting a technical issue?",
        answer: "Please include your device type, browser/app version, screenshots if possible, and steps to reproduce the issue.",
        open: false
      },
      {
        question: "Can I visit the warden without an appointment?",
        answer: "Walk-in hours are from 2-4PM on weekdays. For other times, please email to schedule a meeting.",
        open: false
      },
      {
        question: "How do I join the WhatsApp group?",
        answer: "Click the link provided in the social media section or contact customer support for an invite.",
        open: false
      }
    ]);

    // ✅ Form submit
    const submitForm = () => {
      console.log("Form submitted:", form.value);
      alert("Thank you for your message! We'll get back to you soon.");
      form.value = {
        name: '',
        email: '',
        category: '',
        message: ''
      };
    };

    // ✅ Toggle FAQ
    const toggleFaq = (index) => {
      faqs.value[index].open = !faqs.value[index].open;
    };

    onMounted(() => {
      // ✅ Load saved theme
      const savedTheme = localStorage.getItem('darkTheme');
      if (savedTheme === 'dark') {
        isDarkTheme.value = true;
        document.documentElement.classList.add('dark-theme');
      }

      // ✅ Listen for Navbar theme toggle
      window.addEventListener('themeChanged', (event) => {
        isDarkTheme.value = event.detail.isDark;
      });
    });

    return {
      isDarkTheme,
      form,
      faqs,
      submitForm,
      toggleFaq
    };
  }
};
</script>


<style scoped>
/* Add these dark theme styles at the end of your existing styles */

/* Dark Theme Styles */
.contact-page.dark-theme {
  background-color: #1A1C2D;
  color: #e0e0e0;
}

.contact-page.dark-theme main {
  background: 
    linear-gradient(to bottom, rgba(27, 188, 155, 0.1), transparent 100%),
    linear-gradient(to top, rgba(27, 188, 155, 0.1), transparent 100%),
    #1A1C2D;
}

.contact-page.dark-theme .contact-hero {
  background: linear-gradient(135deg, rgba(27, 188, 155, 0.8), rgba(22, 160, 133, 0.8)),
              url('@/assets/images/payments.jpg');
}

.contact-page.dark-theme .contact-card {
  background-color: #2E3047;
  color: #e0e0e0;
}

.contact-page.dark-theme .contact-card h3 {
  color: #ffffff;
}

.contact-page.dark-theme .contact-card p {
  color: #b0b0b0;
}

.contact-page.dark-theme .method {
  color: #d0d0d0;
}

.contact-page.dark-theme .method a {
  color: #d0d0d0;
}

.contact-page.dark-theme .method a:hover {
  color: #44d4c5;
}

.contact-page.dark-theme .contact-form {
  background-color: #2E3047;
}

.contact-page.dark-theme .form-group label {
  color: #d0d0d0;
}

.contact-page.dark-theme .form-group input,
.contact-page.dark-theme .form-group select,
.contact-page.dark-theme .form-group textarea {
  background-color: #3a3d5a;
  border-color: #444;
  color: #ffffff;
}

.contact-page.dark-theme .faq-list {
  background-color: #2E3047;
}

.contact-page.dark-theme .faq-question {
  color: #ffffff;
  background-color: #2E3047;
}

.contact-page.dark-theme .faq-question:hover {
  background-color: #3a3d5a;
}

.contact-page.dark-theme .faq-answer {
  color: #b0b0b0;
}

.contact-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Hero Section */
.contact-hero {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
              url('@/assets/images/contact-hero.jpg');
  background-size: cover;
  background-position: center;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.hero-content p {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* Contact Grid */
.contact-grid {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1.5rem;
}

.contact-section {
  margin-bottom: 3rem;
}

.section-title {
  color: #1BBC9B;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.contact-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.contact-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 1.5rem;
  transition: transform 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-5px);
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.card-icon.warden {
  background: #e3f2fd;
  color: #1976d2;
}

.card-icon.caretaker {
  background: #e8f5e9;
  color: #2e7d32;
}

.card-icon.emergency {
  background: #ffebee;
  color: #d32f2f;
}

.card-icon.support {
  background: #fff3e0;
  color: #e65100;
}

.card-icon.dev {
  background: #e1f5fe;
  color: #0288d1;
}

.card-icon.social {
  background: #f3e5f5;
  color: #7b1fa2;
}

.contact-card h3 {
  margin-top: 0;
  color: #1a1a1a;
  font-size: 1.3rem;
}

.contact-card p {
  color: #666;
  margin: 0.5rem 0 1.5rem;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.method {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #444;
}

.method i {
  width: 20px;
  text-align: center;
  color: #1BBC9B;
}

.method a {
  color: #444;
  text-decoration: none;
  transition: color 0.2s;
}

.method a:hover {
  color: #1BBC9B;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.social {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 4px;
  text-decoration: none;
  color: white;
  font-weight: 500;
}

.social i {
  width: 20px;
  text-align: center;
}

.social.whatsapp {
  background: #25D366;
}

.social.twitter {
  background: #1DA1F2;
}

.social.instagram {
  background: linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D);
}

.contact-card.emergency {
  border-top: 4px solid #d32f2f;
}

/* Contact Form */
.contact-form-section {
  max-width: 800px;
  margin: 3rem auto;
  padding: 0 1.5rem;
}

.contact-form-section h2 {
  color: #1BBC9B;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.contact-form {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
}

.form-group textarea {
  resize: vertical;
  min-height: 150px;
}

.submit-btn {
  background: #1BBC9B;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #16a085;
}

/* FAQ Section */
.faq-section {
  max-width: 800px;
  margin: 3rem auto;
  padding: 0 1.5rem;
}

.faq-section h2 {
  color: #1BBC9B;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.faq-list {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
}

.faq-item {
  border-bottom: 1px solid #eee;
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-question {
  width: 100%;
  padding: 1.25rem 1.5rem;
  text-align: left;
  background: none;
  border: none;
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s;
}

.faq-question:hover {
  background: #f9f9f9;
}

.faq-question i {
  color: #1BBC9B;
  transition: transform 0.3s;
}

.faq-answer {
  padding: 0 1.5rem 1.5rem;
  color: #666;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .hero-content p {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .contact-cards {
    grid-template-columns: 1fr;
  }
  
  .contact-form-section, .faq-section {
    padding: 0 1rem;
  }
}

.contact-hero {
  background: linear-gradient(135deg, rgba(27, 188, 155, 0.8), rgba(22, 160, 133, 0.8)),
              url('@/assets/images/contact-hero.jpg');
  background-size: cover;
  background-position: center;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

/* ✅ Full background with double linear gradients */
.contact-page main {
  position: relative;
  background: 
    linear-gradient(to bottom, rgba(27, 188, 155, 0.1), transparent 100%),
    linear-gradient(to top, rgba(27, 188, 155, 0.1), transparent 100%),
    #ffffff; /* base background */
  padding-bottom: 50px;
  overflow: hidden;
}

/* ✅ Left diamond */
.contact-page main::before {
  content: "";
  position: absolute;
  left: -50px; /* slightly outside for subtle look */
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #1BBC9B, #16a085);
  opacity: 0.15;
  z-index: 0;
}

/* ✅ Right diamond */
.contact-page main::after {
  content: "";
  position: absolute;
  right: -50px; /* slightly outside for balance */
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #1BBC9B, #16a085);
  opacity: 0.15;
  z-index: 0;
}

/* ✅ Keep content above */
.contact-page main > * {
  position: relative;
  z-index: 1;
}

</style>