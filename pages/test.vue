<template>
  <div class="landing-page">
    <header class="header">
      <div class="lux-container header-content">
        <h1 class="logo">AMUZO</h1>
      </div>
    </header>

    <main class="hero">
      <div class="hero-overlay"></div>
      <div class="lux-container hero-content">
        <h2 class="hero-subtitle">The New Era of Streetwear</h2>
        <h1 class="hero-title">Collection 001</h1>
        
        <ClientOnly>
          <CountdownTimer target-date="2025-12-31T23:59:59" />
        </ClientOnly>

        <p class="hero-text">
          Exclusive drop. Limited quantities. Be the first to know.
        </p>

        <form class="newsletter-form" @submit.prevent="submitForm">
          <input 
            type="email" 
            placeholder="ENTER YOUR EMAIL" 
            class="newsletter-input" 
            v-model="email"
            required
          />
          <button type="submit" class="lux-button">Notify Me</button>
        </form>
        
        <p v-if="submitted" class="success-message">You are on the list.</p>
      </div>
    </main>

    <footer class="footer">
      <div class="lux-container footer-content">
        <p>&copy; 2025 AMUZO. All Rights Reserved.</p>
        <div class="social-links">
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const submitted = ref(false);

const submitForm = () => {
  // Simulate API call
  console.log('Submitted email:', email.value);
  submitted.value = true;
  email.value = '';
  setTimeout(() => {
    submitted.value = false;
  }, 5000);
};

useHead({
  title: 'AMUZO | Coming Soon',
  meta: [
    { name: 'description', content: 'Luxury Streetwear. Collection 001 Dropping Soon.' }
  ]
});
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 2rem 0;
  z-index: 10;
}

.logo {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.3em;
}

.hero {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1596706062103-3ad63a3393ab?q=80&w=2787&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7); /* Dark overlay */
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: 0.875rem;
  letter-spacing: 0.4em;
  color: var(--color-accent);
  margin-bottom: 1rem;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: 4rem;
  margin-bottom: 1rem;
  line-height: 1.1;
}

.hero-text {
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
  max-width: 400px;
}

.newsletter-form {
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
}

.newsletter-input {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem;
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.3s ease;
}

.newsletter-input:focus {
  border-color: var(--color-accent);
}

.success-message {
  margin-top: 1rem;
  color: var(--color-accent);
  font-size: 0.875rem;
  letter-spacing: 0.1em;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 2rem 0;
  z-index: 10;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.social-links {
  display: flex;
  gap: 2rem;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .newsletter-form {
    flex-direction: column;
  }

  .footer-content {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
