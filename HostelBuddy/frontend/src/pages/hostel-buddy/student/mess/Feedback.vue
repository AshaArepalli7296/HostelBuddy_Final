<template>
  <Navbar_Student/>
<div class="Theme">
  <div class="feedback-container">
    <div class="cards-wrapper">
      <!-- Left Card - Feedback Form -->
      <div class="form-card">
        <h1 class="center-heading">Mess Feedback</h1>
        
        <div class="date-selection">
          <label>Select Date:</label>
          <input 
            type="date" 
            v-model="feedbackDate" 
            :max="today"
          >
        </div>
        
        <div class="meal-feedback">
          <div class="meal-section">
            <h3>Breakfast</h3>
            <div class="rating-section">
              <div class="rating-category">
                <span>Taste:</span>
                <div class="star-rating">
                  <span 
                    v-for="star in 5" 
                    :key="'breakfast-taste-'+star" 
                    @click="ratings.breakfast.taste = star"
                    :class="{ 'filled': star <= ratings.breakfast.taste }"
                  >★</span>
                </div>
              </div>
              <div class="rating-category">
                <span>Hygiene:</span>
                <div class="star-rating">
                  <span 
                    v-for="star in 5" 
                    :key="'breakfast-hygiene-'+star" 
                    @click="ratings.breakfast.hygiene = star"
                    :class="{ 'filled': star <= ratings.breakfast.hygiene }"
                  >★</span>
                </div>
              </div>
            </div>
            <textarea 
              v-model="comments.breakfast" 
              placeholder="Any comments about breakfast?"
              rows="2"
            ></textarea>
          </div>
          
          <div class="meal-section">
            <h3>Lunch</h3>
            <div class="rating-section">
              <div class="rating-category">
                <span>Taste:</span>
                <div class="star-rating">
                  <span 
                    v-for="star in 5" 
                    :key="'lunch-taste-'+star" 
                    @click="ratings.lunch.taste = star"
                    :class="{ 'filled': star <= ratings.lunch.taste }"
                  >★</span>
                </div>
              </div>
              <div class="rating-category">
                <span>Hygiene:</span>
                <div class="star-rating">
                  <span 
                    v-for="star in 5" 
                    :key="'lunch-hygiene-'+star" 
                    @click="ratings.lunch.hygiene = star"
                    :class="{ 'filled': star <= ratings.lunch.hygiene }"
                  >★</span>
                </div>
              </div>
            </div>
            <textarea 
              v-model="comments.lunch" 
              placeholder="Any comments about lunch?"
              rows="2"
            ></textarea>
          </div>
          
          <div class="meal-section">
            <h3>Dinner</h3>
            <div class="rating-section">
              <div class="rating-category">
                <span>Taste:</span>
                <div class="star-rating">
                  <span 
                    v-for="star in 5" 
                    :key="'dinner-taste-'+star" 
                    @click="ratings.dinner.taste = star"
                    :class="{ 'filled': star <= ratings.dinner.taste }"
                  >★</span>
                </div>
              </div>
              <div class="rating-category">
                <span>Hygiene:</span>
                <div class="star-rating">
                  <span 
                    v-for="star in 5" 
                    :key="'dinner-hygiene-'+star" 
                    @click="ratings.dinner.hygiene = star"
                    :class="{ 'filled': star <= ratings.dinner.hygiene }"
                  >★</span>
                </div>
              </div>
            </div>
            <textarea 
              v-model="comments.dinner" 
              placeholder="Any comments about dinner?"
              rows="2"
            ></textarea>
          </div>
        </div>
        
        <div class="submit-wrapper">
          <button @click="submitFeedback" class="submit-btn">
            Submit Feedback
          </button>
        </div>
      </div>
      
      <!-- Right Card - Photo Gallery -->
      <div class="gallery-card">
        <div class="scattered-images">
          <div 
            class="scattered-item" 
            v-for="(image, index) in scatteredImages" 
            :key="index"
            :style="{
              top: image.top,
              left: image.left,
              transform: `rotate(${image.rotate}deg)`
            }"
          >
            <img :src="image.url" :alt="image.text" class="scattered-img">
            <span class="scattered-text">{{ image.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  <Footer/>
</template>

<script>
// Import all images at the top
import food1 from '@/assets/images/food1.jpeg';
import food2 from '@/assets/images/food2.jpeg';
import food3 from '@/assets/images/food3.jpeg';
import food4 from '@/assets/images/food4.jpeg';
import food5 from '@/assets/images/food5.jpeg';
import food6 from '@/assets/images/food6.jpg';
import Navbar_Student from '../../../../components/Navbar_Student.vue';
import Footer from '../../../../components/Footer.vue';

export default {
  name: 'MessFeedback',
  components: {
    Navbar_Student,
    Footer
  },
  data() {
    return {
      today: new Date().toISOString().split('T')[0],
      feedbackDate: new Date().toISOString().split('T')[0],
      ratings: {
        breakfast: { taste: 0, hygiene: 0 },
        lunch: { taste: 0, hygiene: 0 },
        dinner: { taste: 0, hygiene: 0 }
      },
      comments: {
        breakfast: '',
        lunch: '',
        dinner: ''
      },
      scatteredImages: [
        { url: food1, text: 'Biriyani', top: '10%', left: '15%', rotate: -5 },
        { url: food2, text: 'Egg', top: '30%', left: '70%', rotate: 3 },
        { url: food3, text: 'Salad', top: '50%', left: '20%', rotate: 2 },
        { url: food4, text: 'Dosa', top: '20%', left: '50%', rotate: -2 },
        { url: food5, text: 'Pulihora', top: '60%', left: '60%', rotate: 4 },
        { url: food6, text: 'Upma', top: '70%', left: '30%', rotate: -3 }
      ]
    }
  },
  methods: {
    submitFeedback() {
      const feedback = {
        date: this.feedbackDate,
        ratings: this.ratings,
        comments: this.comments
      };
      
      console.log('Feedback submitted:', feedback);
      alert('Thank you for your feedback!');
      
      // Reset form
      this.ratings = {
        breakfast: { taste: 0, hygiene: 0 },
        lunch: { taste: 0, hygiene: 0 },
        dinner: { taste: 0, hygiene: 0 }
      };
      this.comments = {
        breakfast: '',
        lunch: '',
        dinner: ''
      };
    }
  }
}
</script>

<style scoped>
.feedback-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.center-heading {
  color: #1BBC9B;
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  border-bottom: 2px solid #1BBC9B;
  padding-bottom: 10px;
}

.cards-wrapper {
  display: flex;
  gap: 30px;
}

.form-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
  padding: 30px;
}

.form-card {
  flex: 1;
  width:700px;
}

.gallery-card {
  width: 450px;
  position: relative;
  min-height: 600px;
}

.scattered-images {
  position: relative;
  width: 100%;
  height: 100%;
}

.scattered-item {
  position: absolute;
  width: 120px;
  height: 120px;
  background: #f9f9f9;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s;
}

.scattered-item:hover {
  transform: scale(1.05) rotate(0deg) !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 10;
}

.scattered-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 5px;
  display: block;
}

.scattered-text {
  font-size: 14px;
  color: #555;
  text-align: center;
}

.date-selection {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 25px;
}

.date-selection label {
  font-weight: 600;
  color: #555;
  font-size: 15px;
}

.date-selection input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
}

.date-selection input:focus {
  border-color: #1BBC9B;
  outline: none;
  box-shadow: 0 0 0 2px rgba(27, 188, 155, 0.2);
}

.meal-feedback {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.meal-section {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}

.meal-section h3 {
  color: #1BBC9B;
  margin-bottom: 15px;
}

.rating-section {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.rating-category {
  display: flex;
  align-items: center;
  gap: 10px;
}

.rating-category span {
  font-weight: 600;
  color: #555;
  font-size: 14px;
}

.star-rating {
  display: inline-block;
  font-size: 24px;
}

.star-rating span {
  color: #ccc;
  cursor: pointer;
  transition: color 0.2s;
}

.star-rating span.filled {
  color: #ffc107;
}

.star-rating span:hover {
  color: #ffc107;
}

.meal-section textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  transition: all 0.3s;
}

.meal-section textarea:focus {
  border-color: #1BBC9B;
  outline: none;
  box-shadow: 0 0 0 2px rgba(27, 188, 155, 0.2);
}

.submit-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 25px;
}

.submit-btn {
  background: #1BBC9B;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  width: 200px;
}

.submit-btn:hover {
  background: #15967D;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(27, 188, 155, 0.3);
}
.Theme { background: linear-gradient(to bottom, 
    #e0f8f6 0%, 
    #f0fdfc 30%, 
    #ffffff 50%, 
    #f0fdfc 70%, 
    #e0f8f6 100%);

}

@media (max-width: 992px) {
  .cards-wrapper {
    flex-direction: column;
  }
  
  .gallery-card {
    width: 100%;
    min-height: 400px;
  }
}

@media (max-width: 768px) {
  .feedback-container {
    padding: 20px;
  }
  
  .form-card, .gallery-card {
    padding: 20px;
  }
  
  .rating-section {
    flex-direction: column;
    gap: 10px;
  }
  
  .scattered-item {
    width: 100px;
    height: 100px;
  }
  
  .scattered-img {
    width: 60px;
    height: 60px;
  }
}
</style>