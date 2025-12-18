<template>
  <div class="countdown-container">
    <div class="time-block">
      <span class="number">{{ days }}</span>
      <span class="label">Days</span>
    </div>
    <div class="separator">:</div>
    <div class="time-block">
      <span class="number">{{ hours }}</span>
      <span class="label">Hours</span>
    </div>
    <div class="separator">:</div>
    <div class="time-block">
      <span class="number">{{ minutes }}</span>
      <span class="label">Minutes</span>
    </div>
    <div class="separator">:</div>
    <div class="time-block">
      <span class="number">{{ seconds }}</span>
      <span class="label">Seconds</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps({
  targetDate: {
    type: String,
    required: true
  }
});

const timeLeft = ref(0);
let intervalId: NodeJS.Timer | null = null;

const calculateTimeLeft = () => {
  const difference = new Date(props.targetDate).getTime() - new Date().getTime();
  timeLeft.value = difference > 0 ? difference : 0;
};

onMounted(() => {
  calculateTimeLeft();
  intervalId = setInterval(calculateTimeLeft, 1000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});

// Helpers to format time
const formatNum = (num: number) => num.toString().padStart(2, '0');

const days = computed(() => formatNum(Math.floor(timeLeft.value / (1000 * 60 * 60 * 24))));
const hours = computed(() => formatNum(Math.floor((timeLeft.value / (1000 * 60 * 60)) % 24)));
const minutes = computed(() => formatNum(Math.floor((timeLeft.value / 1000 / 60) % 60)));
const seconds = computed(() => formatNum(Math.floor((timeLeft.value / 1000) % 60)));

</script>

<style scoped>
.countdown-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 3rem 0;
}

.time-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.number {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(180deg, #fff 0%, #a0a0a0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-text-secondary);
  margin-top: 0.5rem;
}

.separator {
  font-size: 3rem;
  font-weight: 300;
  color: var(--color-accent);
  padding-bottom: 2rem; /* Align with numbers better */
}

@media (max-width: 768px) {
  .countdown-container {
    gap: 0.5rem;
  }
  .number {
    font-size: 2rem;
  }
  .separator {
    font-size: 2rem;
  }
}
</style>
