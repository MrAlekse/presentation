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

// --- Theme manager ---
(function () {
  const STORAGE_KEY = 'theme'; // 'light' | 'dark' | 'system'
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
      // system
      root.classList.toggle('dark', media.matches);
    }
  }

  // Initialize
  const initial = getSavedMode();
  applyTheme(initial);

  // Set select UI if present
  if (selectEl) {
    selectEl.value = initial;
    selectEl.addEventListener('change', () => {
      const mode = selectEl.value; // 'light' | 'dark' | 'system'
      setSavedMode(mode);
      applyTheme(mode);
    });
  }

  // React to system changes only when in "system" mode
  media.addEventListener('change', () => {
    if (getSavedMode() === 'system') applyTheme('system');
  });
})();
