// Theme Management
const themeToggleBtn = document.getElementById('theme-toggle');
const rootElement = document.documentElement;

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
  rootElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
} else if (!prefersDark) {
  rootElement.setAttribute('data-theme', 'light');
  updateThemeIcon('light');
}

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = rootElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  rootElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  const icon = themeToggleBtn.querySelector('.icon');
  if (icon) {
    icon.textContent = theme === 'light' ? '☀️' : '🌙';
  }
}

// Mobile Menu Navigation
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileMenuBtn && mobileNav) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
    });
  });
}

// Download Resume Action
const downloadCvBtn = document.getElementById('download-resume-btn');
if (downloadCvBtn) {
  downloadCvBtn.addEventListener('click', () => {
    const originalText = downloadCvBtn.textContent;
    downloadCvBtn.textContent = 'Generating PDF...';
    downloadCvBtn.disabled = true;

    setTimeout(() => {
      downloadCvBtn.textContent = 'Downloaded ✓';
      // Trigger a printable view or notification
      setTimeout(() => {
        downloadCvBtn.textContent = originalText;
        downloadCvBtn.disabled = false;
        window.print();
      }, 800);
    }, 1000);
  });
}

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formFeedback = document.getElementById('form-feedback');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = 'Message Sent!';
      formFeedback.className = 'form-feedback success';
      formFeedback.textContent = 'Thank you for reaching out! I will get back to you shortly.';
      contactForm.reset();

      setTimeout(() => {
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
      }, 3500);
    }, 900);
  });
}
