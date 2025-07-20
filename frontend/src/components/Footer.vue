<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-section">
        <h3>Hostel Buddy</h3>
        <p>Your perfect hostel companion for finding accommodations, roommates, and services.</p>
      </div>

      <div class="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li><router-link to="/hostel-buddy">Home</router-link></li>
          <li><router-link to="/hostel-buddy/rooms">Rooms</router-link></li>
          <li><router-link to="/hostel-buddy/about">About</router-link></li>
          <li><router-link to="/hostel-buddy/contact">Contact</router-link></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>Contact Us</h4>
        <p>Email: info@hostelbuddy.com</p>
        <p>Phone: +91 9876543210</p>
        <div class="social-icons">
          <a href="#"><font-awesome-icon :icon="['fab', 'instagram']" /></a>
          <a href="#"><font-awesome-icon :icon="['fab', 'linkedin']" /></a>
          <a href="#"><font-awesome-icon :icon="['fab', 'facebook']" /></a>
          <a href="#"><font-awesome-icon :icon="['fab', 'youtube']" /></a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2025 Hostel Buddy. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faInstagram, faLinkedin, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faInstagram, faLinkedin, faFacebook, faYoutube)
</script>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 60px 0 0;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
}

.footer-section h3 {
  color: #1BBC9B;
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.footer-section h4 {
  color: #1BBC9B;
  font-size: 1.3rem;
  margin-bottom: 20px;
}

.footer-section p {
  margin-bottom: 15px;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 10px;
}

.footer-section a {
  color: #ecf0f1;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: #1BBC9B;
}

.social-icons {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.social-icons a {
  color: #ecf0f1;
  font-size: 1.5rem;
  transition: color 0.3s ease;
}

.social-icons a:hover {
  color: #1BBC9B;
}

.footer-bottom {
  background-color: #1a252f;
  text-align: center;
  padding: 20px 0;
  margin-top: 60px;
}

.footer-bottom p {
  margin: 0;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .footer-section {
    text-align: center;
  }

  .social-icons {
    justify-content: center;
  }
}
</style>