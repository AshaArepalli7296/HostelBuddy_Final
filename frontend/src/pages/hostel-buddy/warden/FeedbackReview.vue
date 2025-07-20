<template>
  <Navbar_warden/>
  <div class="feedback-review-container">
    <!-- Title with border bottom color #1BBC9B -->
    <div class="page-header">
      <h1>Hostel Feedback</h1>
    </div>

    <!-- Search bar -->
    <div class="search-container">
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by student name or feedback..."
          @input="filterFeedback"
        />
        <span class="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </span>
      </div>
    </div>

    <!-- Main content with feedback on left and image on right -->
    <div class="content-wrapper">
      <!-- Feedback list on left -->
      <div class="feedback-list">
        <div v-if="filteredFeedback.length === 0" class="no-results">
          No feedback found matching your search criteria.
        </div>
        
        <div v-for="(item, index) in filteredFeedback" :key="index" class="feedback-item">
          <div class="student-info">
            <h3>{{ item.studentName }}</h3>
            <span class="date">{{ formatDate(item.date) }}</span>
          </div>
          <div class="feedback-content">
            <p>{{ item.content }}</p>
          </div>
          <div class="rating">
            <span>Rating: </span>
            <span class="stars">
              <span v-for="i in 5" :key="i" :class="{'filled': i <= item.rating}">★</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Image on right -->
      <div class="image-container">
        <img 
          src="@/assets/images/feedback.jpg" 
          alt="Feedback illustration" 
          class="content-image">
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Navbar_warden from '../../../components/Navbar_warden.vue';
import Footer from '../../../components/Footer.vue';

export default {
  name: 'FeedbackReview',
  components: {
    Navbar_warden,
    Footer
  },
  data() {
    return {
      searchQuery: '',
      filterOption: 'all',
      feedbackItems: [
        {
          studentName: 'John',
          content: 'The hostel facilities are excellent and the staff is very helpful.',
          date: '2023-05-15',
          rating: 4
        },
        {
          studentName: 'Jenny',
          content: 'Clean rooms and good food in the mess. Would recommend!',
          date: '2023-05-10',
          rating: 5
        },
        {
          studentName: 'Priyanka',
          content: 'WiFi connection could be improved in some areas of the hostel.',
          date: '2023-05-08',
          rating: 3
        },
      ],
      filteredFeedback: []
    };
  },
  created() {
    // Initialize filtered feedback with all items
    this.filteredFeedback = [...this.feedbackItems];
  },
  methods: {
    filterFeedback() {
      if (!this.searchQuery) {
        this.filteredFeedback = [...this.feedbackItems];
        return;
      }

      const query = this.searchQuery.toLowerCase();
      this.filteredFeedback = this.feedbackItems.filter(item => {
        if (this.filterOption === 'name') {
          return item.studentName.toLowerCase().includes(query);
        } else if (this.filterOption === 'feedback') {
          return item.content.toLowerCase().includes(query);
        } else {
          return (
            item.studentName.toLowerCase().includes(query) ||
            item.content.toLowerCase().includes(query)
          );
        }
      });
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  }
};
</script>

<style scoped>
.feedback-review-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.page-header {
  border-bottom: 3px solid #1BBC9B;
  margin-bottom: 25px;
  padding-bottom: 10px;
  width:65%;
}

.page-header h1 {
  color: #1BBC9B;
  margin: 0;
  margin-top: 20px;
  font-size: 35px;
  text-align: center;
}

.search-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 15px;
  width:50%;
}

.search-bar {
  position: relative;
  flex-grow: 1;
  min-width: 250px;
}

.search-bar input {
  width: 100%;
  padding: 10px 15px 10px 35px;
  border: 2px solid #1BBC9B;
  border-radius: 10px;
  font-size: 16px;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #777;
}
 
.content-wrapper {
  display: flex;
  gap: 30px;
} 

.feedback-list {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.image-container {
  flex: 1;
  position: sticky;
   margin-top: 0;
  align-self: flex-start;
 
}

.content-image {
  width: 600px;
  max-width: 880px;
  height:400px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-top: 0;

}

.feedback-item {
  border: 2px solid #1BBC9B;
  border-radius: 5px;
  padding: 20px;
  background-color: #f9f9f9;
}

.student-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.student-info h3 {
  margin: 0;
  color: #1BBC9B;
}

.date {
  color: #777;
  font-size: 14px;
}

.feedback-content p {
  margin: 10px 0;
  color: #555;
  line-height: 1.5;
}

.rating {
  display: flex;
  align-items: center;
  margin-top: 10px;
  color: #555;
}

.stars {
  margin-left: 5px;
}

.stars span {
  color: #ddd;
  font-size: 18px;
}

.stars .filled {
  color: #FFD700;
}

.no-results {
  text-align: center;
  padding: 20px;
  color: #777;
  font-style: italic;
}

/* Responsive adjustments */
@media (max-width: 900px) {
  .content-wrapper {
    flex-direction: column;
  }
  
  .image-container {
    order: -1;
    position: static;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .content-image {
    max-width: 300px;
  }
}

@media (max-width: 600px) {
  .search-container {
    flex-direction: column;
  }
  
  .filter-options select {
    width: 100%;
  }
}
</style>