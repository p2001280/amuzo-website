<template>
  <div class="landing-page">
    <header class="header">
      <div class="lux-container header-content">
        <img :src="Logo" alt="Logo" class="logo" />
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
Il y a longtemps, je pensais que le tissu révélait d’où tu étais issu. Puis, j'ai vu la mode comme une issue. Comme un moyen de m’exprimer, comme un moyen de mettre en avant ceux opprimés. Luxe et streetwear peuvent cohabiter. La mode se doit d’être réhabilité. Trouvez-vous chez AMŪZŌ ! un tout : pour tous.        </p>
        <form class="newsletter-form" @submit.prevent="submitForm">
          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            class="newsletter-input"
            v-model="email"
            required
            :disabled="isLoading"
          />
          <button type="submit" class="lux-button" :disabled="isLoading">
            {{ isLoading ? 'Sending...' : 'Notify Me' }}
          </button>
        </form>
        <p v-if="submitted" class="success-message">You are on the list.</p>
        <p v-if="errorMsg" class="error-message">{{ errorMsg }}</p>
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
import Logo from "../assets/images/white_logo.png";

const email = ref('');
const submitted = ref(false);
const isLoading = ref(false);
const errorMsg = ref('');

const submitForm = async () => {
  if (!email.value) return;
  isLoading.value = true;
  errorMsg.value = '';

  try {
    await $fetch('/api/subscribe', {
      method: 'POST',
      body: { email: email.value }
    });
    
    submitted.value = true;
    email.value = '';
    setTimeout(() => {
      submitted.value = false;
    }, 5000);
  } catch (error: any) {
    console.error('Submission failed', error);
    errorMsg.value = error.statusMessage || 'An error occurred. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

useHead({
  title: 'AMUZO | Coming Soon',
  meta: [
    { name: 'description', content: 'Luxury Streetwear. Collection 001 Dropping Soon.' }
  ],
  link: [
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" }
  ]
});
</script>

<style scoped>
/* GLOBAL */
.landing-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #000;
  color: #fff;
  font-family: 'Inter', 'Helvetica Neue', sans-serif;
  letter-spacing: 0.02em;
  scroll-behavior: smooth;
}

/* HEADER */
.header {
  position: absolute;
  top: 2rem;
  left: 0;
  width: 100%;
  z-index: 20;
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  max-width: 200px; /* Augmente la taille du logo */
  height: auto;
  margin-top: 1rem;
  opacity: 1;
  transform: none;
}

/* HERO */
.hero {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1596706062103-3ad63a3393ab?q=80&w=2000&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  z-index: 1;
  backdrop-filter: blur(2px);
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 650px;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

/* TITLES */
.hero-subtitle {
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 1rem;
  font-weight: 300;
  animation: subtleUp 1.2s ease forwards;
  opacity: 0;
  animation-delay: 0.2s;
}

.hero-title {
  font-size: 3.8rem;
  font-weight: 300;
  letter-spacing: 0.04em;
  margin-bottom: 2rem;
  line-height: 1.05;
  animation: subtleUp 1.4s ease forwards;
  opacity: 0;
  animation-delay: 0.4s;
}
/* COUNTDOWN TIMER */
.countdown-wrapper {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  font-family: 'Space Mono', monospace !important;
  color: #fff;
  animation: subtleUp 1.5s ease forwards;
  opacity: 0;
  animation-delay: 0.6s;
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
  padding: 1.5rem 1rem;
  border-radius: 12px;
  min-width: 90px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.countdown-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
  background: rgba(255, 255, 255, 0.06);
}

.countdown-number {
  font-size: 1.8rem; /* Réduit la taille des chiffres */
  font-weight: 700;
  color: #fff;
  text-shadow: 0 0 8px rgba(102, 255, 204, 0.5);
  background: linear-gradient(135deg, rgba(102, 255, 204, 0.8), rgba(0, 204, 255, 0.6));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.countdown-label {
  font-size: 0.6rem; /* Réduit la taille du texte des labels */
  letter-spacing: 0.1em;
  color: rgba(102, 255, 204, 0.7);
  text-transform: uppercase;
  margin-top: 0.3rem;
}


/* Animation pour le compte à rebours */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.countdown-item {
  animation: pulse 2s infinite;
}


/* TEXT */
.hero-text {
  font-size: 0.95rem; /* Légèrement plus grand pour la lisibilité */
  color: rgba(255, 255, 255, 0.75); /* Plus brillant pour le texte important */
  margin-bottom: 2.5rem;
  max-width: 600px; /* Élargi pour le texte long */
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8; /* Espacement des lignes élégant */
  font-weight: 300;
  font-style: italic; /* Style citation/manifeste */
  animation: subtleUp 1.6s ease forwards;
  opacity: 0;
  animation-delay: 0.8s;
}

/* FORM */
.newsletter-form {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  animation: subtleUp 1.8s ease forwards;
  opacity: 0;
  animation-delay: 1s;
}

.newsletter-input {
  flex: 1;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem;
  color: #fff;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  transition: border-color 0.3s ease, background 0.3s ease;
  background: rgba(255, 255, 255, 0.03);
}

.newsletter-input:focus {
  border-color: #fff;
  background: rgba(255, 255, 255, 0.05);
}

.lux-button {
  background: #fff;
  color: #000;
  padding: 1rem 2rem;
  border: none;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: opacity 0.3s ease, transform 0.2s ease;
}

.lux-button:hover {
  opacity: 0.85;
  transform: translateY(-2px);
}

.success-message {
  margin-top: 1.2rem;
  color: var(--color-text-primary);
  font-size: 0.85rem;
  opacity: 0.8;
  letter-spacing: 0.1em;
}

.error-message {
  margin-top: 1.2rem;
  color: #ff6b6b;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
}

/* FOOTER */
.footer {
  padding: 2rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(4px);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.75rem;
}

.social-links a {
  color: rgba(255, 255, 255, 0.45);
  text-decoration: none;
  transition: opacity 0.3s ease;
  margin-left: 1rem;
}

.social-links a:hover {
  opacity: 0.75;
}

@media (max-width: 768px) {
  .header {
    position: relative; 
    top: auto;
    padding-top: 0.5rem;
    margin-bottom: -1rem;
  }

  .logo {
    max-width: 120px;
    margin-top: 0;
  }

  .hero {
    min-height: auto;
    padding: 1rem 0;
    align-items: flex-start; /* Aligner en haut pour gagner de la place */
  }
  
  .hero-content {
     padding-top: 1rem;
     min-height: auto; /* Supprime la hauteur minimale forcée */
     justify-content: flex-start;
  }

  .hero-subtitle {
    margin-bottom: 0.5rem;
    font-size: 0.65rem;
  }

  .hero-title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .hero-text {
    font-size: 0.85rem;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }

  .countdown-wrapper {
    margin: 1rem 0;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .countdown-item {
    padding: 0.5rem;
    min-width: 55px;
  }

  .countdown-number {
    font-size: 1.25rem;
  }
  
  .countdown-label {
    font-size: 0.5rem;
  }

  .newsletter-form {
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 2rem;
  }
  
  .newsletter-input {
    padding: 0.75rem;
  }

  .lux-button {
    width: 100%;
    padding: 0.75rem;
  }

  .footer-content {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .footer {
    padding: 1rem 0;
  }
}

@keyframes fadeIn {
  to { opacity: 1; }
}

@keyframes fadeDown {
  to { opacity: 1; transform: translateY(0); }
}

@keyframes subtleUp {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>