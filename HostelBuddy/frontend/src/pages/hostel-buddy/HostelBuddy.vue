<template>
  <div class="hostel-buddy">
    <div class="hostel-buddy" :class="{'dark-theme': isDarkTheme}">
    <Navbar />
    <main>
      <section class="hero">
        <div class="hero-content">
          <h1>Smart Hostel Management System</h1>
          <p>Streamlining hostel operations for students and administrators</p><br/>
          <div class="auth-buttons">
            <router-link to="/login" class="cta-button">Get Started -></router-link>
            <!-- <router-link to="/register" class="cta-button outline">Sign Up</router-link> -->
          </div>
        </div>
      </section>
      <section class="hero-subline">
        <h2 class="subline-heading">
          <span class="highlighted-word">More</span> than just a room <br/>
          <!-- <p>discover comfort, community, and connection at HostelBuddy.</p> -->
        </h2>
        <p class="subline-description">
          Discover comfort, community, and connection at HostelBuddy
        </p>
      </section>
      <section class="features">
        <div class="feature-container">
          <div class="feature-block">
            <div class="feature-text">
              <h2 class="feature-title">Never worry about meals again<br><span>from day one</span></h2>
              <p class="feature-desc">
                Step into a hostel life where food is one less thing to think about. With curated menus, easy feedback, and flexible cancellations — mealtime is sorted so you can focus on what truly matters.
              </p>
            </div>
            <div class="feature-img">
              <img src="https://i.pinimg.com/1200x/eb/60/cd/eb60cd111623a1e3b6615164f0f25a10.jpg" alt="Mess Management" />
            </div>
          </div>

          <div class="feature-block reverse">
            <div class="feature-text">
              <h2 class="feature-title">Raise your voice, get it fixed<br><span>without the hassle</span></h2>
              <p class="feature-desc">
                Got a leaky tap or broken light? Our complaint system is quick, responsive, and photo-enabled. Report it once, track it live — we’ll handle the rest.
              </p>
            </div>
            <div class="feature-img">
              <img src="https://media.istockphoto.com/id/1502770463/photo/negative-customer-feedback-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=yetWKrzYs09jcJPmXCop4zsKqn1anjPqVCNCJ6JsXqY=" alt="Complaint System" />
            </div>
          </div>

          <div class="feature-block">
            <div class="feature-text">
              <h2 class="feature-title">Payments made simple and<br><span> stress-free</span></h2>
              <p class="feature-desc">
                Say goodbye to long queues. Pay your hostel fees online with ease, track history, and download receipts — all from the comfort of your room.
              </p>
            </div>
            <div class="feature-img">
              <img src="@/assets/images/payment.jpg" alt="Online Payments" />
            </div>
          </div>

          <div class="feature-block reverse">
            <div class="feature-text">
              <h2 class="feature-title">Stay in the know<br><span>every step</span> of the way</h2>
              <p class="feature-desc">
                From urgent notices to exciting events, announcements reach you instantly. Because being informed should be effortless.
              </p>
            </div>
            <div class="feature-img">
              <img src="C:\MyPages\src\assets\images\AnnouncementImg.png" alt="Announcements" />
            </div>
          </div>

        </div>
      </section>
      <section class="slideshow-quote">
        <h2>"In every corridor, every mess table, every shared laugh — hostel life lives on."</h2>
      </section>

      <section class="slideshow-gallery">
        <div class="slideshow-wrapper">
          <div class="slide" v-for="(image, index) in slides" :key="index" :class="{ active: currentSlide === index }">
            <img :src="image" alt="Hostel Life" />
          </div>
        </div>
      </section>

    </main>
    <Footer />
  </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'HostelBuddy',
  components: {
    Navbar,
    Footer
  },
  setup() {
    // ✅ Dark theme state
    const isDarkTheme = ref(false);

    // ✅ Slideshow images
    const slides = [
      'https://media.istockphoto.com/id/1254374019/photo/a-building-with-hostel-sign-good-place-for-college-life-students.jpg?s=612x612&w=0&k=20&c=sQNvLSvRQuwePOJwRHGI-cA0rZvk5k8eF3UEN8tzQv8=',
      'https://media.istockphoto.com/id/2153380601/photo/confident-explorer-enjoying-a-day-outdoors.jpg?s=612x612&w=0&k=20&c=36XlMKRym-RJBrR450fFiQUYA_9MJYqLEpcUHCSPkiA=',
      'https://media.istockphoto.com/id/1142901472/photo/college-freshman-teenage-girls-and-back-to-school-shopping.jpg?s=612x612&w=0&k=20&c=-wF5gAcvoadpjbq2Iu-0uOa_XaoGIyJo9CL9Do6uMVU=',
      'https://media.istockphoto.com/id/512055984/photo/two-friends-online-shopping.jpg?s=612x612&w=0&k=20&c=7BxZbRoYJOi3q7dRErFEAF7Kmo5rimuKuLV2tlzsxNI=',
      'https://media.istockphoto.com/id/2158211377/photo/traveler-gen-z-using-a-food-delivery-app-on-a-smartphone.jpg?s=612x612&w=0&k=20&c=DFQ_1ZTOpcDp7X3NUSvl-NQ_UlueKVkKUx6EY1jp77s=',
      'https://media.istockphoto.com/id/176050523/photo/homework.jpg?s=612x612&w=0&k=20&c=Y-murePNQjJYwEyqxPizEEsKZV9AdXZihvkVb0mnaoM=',
      'https://media.istockphoto.com/id/2158215085/photo/backpackers-lifestyle-in-youth-hostel.webp?a=1&b=1&s=612x612&w=0&k=20&c=DZsWURDUdcX7GGHjRudlmn9o6nExCkslKnql2SJwy84='
    ];
    const currentSlide = ref(0);

    // ✅ Slideshow function
    const startSlideshow = () => {
      setInterval(() => {
        currentSlide.value = (currentSlide.value + 1) % slides.length;
      }, 3000);
    };

    onMounted(() => {
      // ✅ Start slideshow
      startSlideshow();

      // ✅ Load saved theme preference
      const savedTheme = localStorage.getItem('darkTheme');
      if (savedTheme === 'dark') {
        isDarkTheme.value = true;
        document.documentElement.classList.add('dark-theme');
      }

      // ✅ Listen for theme toggle event from Navbar
      window.addEventListener('themeChanged', (event) => {
        isDarkTheme.value = event.detail.isDark;
      });
    });

    return {
      isDarkTheme,
      slides,
      currentSlide
    };
  }
}
</script>



<style scoped>
/* Base Styles */
.hostel-buddy {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  line-height: 1.6;
}

/* Hero Section */
.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
              url('https://i.pinimg.com/736x/86/93/5d/86935d9765e9d71b57cc19df2b8abb7d.jpg');
  background-size: cover;
  background-position: center;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 0 20px;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  animation: fadeIn 1s ease-in;
  font-weight: 700;
}
.hero-content p{
  font-size: large;
}
.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-weight: 300;
}

.hero-highlight {
  font-size: 1.8rem;
  margin-bottom: 30px;
  color: #1BBC9B;
  font-weight: 600;
}

.hero-text {
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 40px;
  line-height: 1.8;
}

.auth-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.cta-button {
  background-color: #1BBC9B;
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 1.2rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.cta-button.outline {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* Subline Section */
.hero-subline {
  background-color: #fff;
  text-align: center;
  padding: 60px 20px 40px;
}
.hero-subline {
  background: linear-gradient(to bottom, #dcf1f0, #ffffff);
  text-align: center;
  padding: 60px 20px 40px;
}
.subline-heading {
  font-size: 2.5rem;
  font-weight: 700;
  max-width: 900px;
  margin: 0 auto 10px;
  color: #111;
}

.highlighted-word {
  color: #1BBC9B;
}

.subline-description {
  font-size: 1.2rem;
  font-weight: 400;
  color: #666;
}

/* Features Section */
.features {
  padding: 80px 20px;
  background-color: #fff;
}
/* Trapezium-like effect under features section */
.features {
  padding: 80px 20px;
  background: linear-gradient(160deg, #ffffff 75%, #e9fefb 0%);
  /* clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); */
  /* Optional if you want more angled shape:
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
  */
}
.feature-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 80px;
}

.feature-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
}

.feature-block.reverse {
  flex-direction: row-reverse;
}

.feature-img {
  flex: 1;
  min-width: 300px;
}

.feature-img img {
  width: 90%;
  height: 300px;
  border-radius: 12px;
  object-fit: cover;
}

.feature-text {
  flex: 1;
  min-width: 280px;
}

.feature-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1a1c2d;
  line-height: 1.4;
}

.feature-title span {
  /* font-weight: 700;
  font-size: 2rem; */
  color: #1BBC9B;
}

.feature-desc {
  font-size: 1.1rem;
  color: #444;
  line-height: 1.8;
  margin-top: 15px;
}

.slideshow-quote {
  background-color: #f6f6f6;
  padding: 40px 20px;
  text-align: center;
}

.slideshow-quote h2 {
  font-size: 1.8rem;
  font-style: italic;
  color: #1a1c2d;
  max-width: 800px;
  margin: auto;
}

.slideshow-gallery {
  background-color: #fff;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  background: linear-gradient(to top, #f0fdfc, #ffffff);
  text-align: center;
  padding: 60px 20px 40px;
}

.slideshow-wrapper {
  position: relative;
  width: 90%;
  max-width: 800px;
  height: 400px;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.slide {
  position: absolute;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  width: 100%;
  height: 100%;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide.active {
  opacity: 1;
}

/* Dark Theme Styles */
.hostel-buddy.dark-theme {
  background-color: #1A1C2D;
  color: #e0e0e0;
}

.hostel-buddy.dark-theme .hero-subline {
  background: linear-gradient(to bottom, #2E3047, #1A1C2D);
}

.hostel-buddy.dark-theme .subline-heading,
.hostel-buddy.dark-theme .subline-description {
  color: #ffffff;
}

.hostel-buddy.dark-theme .features {
  background: linear-gradient(160deg, #1A1C2D 75%, #2E3047 0%);
}

.hostel-buddy.dark-theme .feature-title,
.hostel-buddy.dark-theme .feature-desc {
  color: #e0e0e0;
}

.hostel-buddy.dark-theme .slideshow-quote {
  background-color: #2E3047;
}

.hostel-buddy.dark-theme .slideshow-quote h2 {
  color: #ffffff;
}

.hostel-buddy.dark-theme .slideshow-gallery {
  background: linear-gradient(to top, #2E3047, #1A1C2D);
}


/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-highlight {
    font-size: 1.4rem;
  }

  .hero-text {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
  .feature-block,
  .feature-block.reverse {
    flex-direction: column;
    text-align: center;
  }

  .feature-img,
  .feature-text {
    width: 100%;
  }

  .feature-title {
    font-size: 1.7rem;
  }

  .feature-title span {
    font-size: 1.7rem;
  }
}
  .auth-buttons {
    flex-direction: column;
    gap: 15px;
  }

  .cta-button {
    width: 100%;
    max-width: 250px;
    margin: 0 auto;
  }
}
</style>