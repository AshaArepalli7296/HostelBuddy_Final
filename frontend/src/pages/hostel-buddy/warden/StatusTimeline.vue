<template>
 
  <div class="timeline">
    <h3>Status Progress</h3>
    <div class="steps">
      <div 
        v-for="step in steps" 
        :key="step.id"
        class="step"
        :class="{
          'active': step.name === currentStatus,
          'completed': isCompleted(step)
        }"
      >
        <div class="step-marker">
          <span v-if="isCompleted(step)">✓</span>
          <span v-else>{{ step.id }}</span>
        </div>
        <div class="step-content">
          <h4>{{ step.name }}</h4>
          <p>{{ step.description }}</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: 'StatusTimeline',
  props: {
    steps: {
      type: Array,
      required: true
    },
    currentStatus: {
      type: String,
      required: true
    }
  },
  methods: {
    isCompleted(step) {
      const currentIndex = this.steps.findIndex(s => s.name === this.currentStatus)
      return step.id < this.steps[currentIndex]?.id
    }
  }
}
</script>

<style scoped>
.timeline {
  margin: 30px 0;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step {
  display: flex;
  gap: 15px;
  position: relative;
}

.step::before {
  content: "";
  position: absolute;
  left: 12px;
  top: 25px;
  bottom: -20px;
  width: 2px;
  background: #ddd;
}

.step:last-child::before {
  display: none;
}

.step-marker {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 1;
}

.step.active .step-marker {
  background: #1BBC9B;
  color: white;
}

.step.completed .step-marker {
  background: #16a085;
  color: white;
}

.step-content {
  padding-top: 2px;
}

.step-content h4 {
  margin: 0 0 5px 0;
  font-size: 1rem;
}

.step-content p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}
</style>