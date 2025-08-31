let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

(function () {
  const STORAGE_KEY = 'theme'; 
  const selectEl = document.getElementById('theme-select');
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const root = document.documentElement;

  function getSavedMode() {
    return localStorage.getItem(STORAGE_KEY) || 'system';
  }

  function setSavedMode(mode) {
    localStorage.setItem(STORAGE_KEY, mode);
  }

  function applyTheme(mode) {
    if (mode === 'light') {
      root.classList.remove('dark');
    } else if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      
      root.classList.toggle('dark', media.matches);
    }
  }

  
  const initial = getSavedMode();
  applyTheme(initial);

 
  if (selectEl) {
    selectEl.value = initial;
    selectEl.addEventListener('change', () => {
      const mode = selectEl.value; 
      setSavedMode(mode);
      applyTheme(mode);
    });
  }

  media.addEventListener('change', () => {
    if (getSavedMode() === 'system') applyTheme('system');
  });
})();
