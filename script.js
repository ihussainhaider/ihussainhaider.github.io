// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Initialize AOS
AOS.init({
  duration: 800,
  once: true,
  offset: 100
});

// Project modal functionality
document.querySelectorAll('.project-btn').forEach(button => {
  button.addEventListener('click', function() {
    const projectTitle = this.closest('.project-card').querySelector('h3').textContent;
    const projectDescription = this.closest('.project-card').querySelector('p').textContent;
    
    // Create modal for project details
    showProjectModal(projectTitle, projectDescription);
  });
});

// Function to show project modal
function showProjectModal(title, description) {
  // Create modal element
  const modal = document.createElement('div');
  modal.className = 'project-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    backdrop-filter: blur(5px);
  `;
  
  modal.innerHTML = `
    <div style="background: white; padding: 2rem; border-radius: 12px; max-width: 500px; width: 90%; position: relative;">
      <button class="modal-close" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #666;">&times;</button>
      <h3 style="color: #1e293b; margin-bottom: 1rem;">${title}</h3>
      <p style="color: #64748b; line-height: 1.6;">${description}</p>
      <p style="color: #94a3b8; margin-top: 1rem; font-style: italic;">More details and code samples coming soon!</p>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Close modal functionality
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
}

// Back to Top Functionality
class BackToTop {
  constructor() {
    this.button = null;
    this.init();
  }

  init() {
    this.createButton();
    this.bindEvents();
  }

  createButton() {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '<i class="fas fa-chevron-up"></i>';
    button.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(button);
    this.button = button;
  }

  bindEvents() {
    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    window.addEventListener('scroll', () => {
      this.toggleVisibility();
    });
  }

  toggleVisibility() {
    if (window.scrollY > 300) {
      this.button.classList.add('show');
    } else {
      this.button.classList.remove('show');
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new BackToTop();
});


// Google Analytics tracking
function trackEvent(category, action, label) {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: category,
      event_label: label
    });
  }
}

// Track social media clicks
document.querySelectorAll('.social-links a, .footer-socials a').forEach(link => {
  link.addEventListener('click', function(e) {
    const platform = this.href.includes('github') ? 'GitHub' :
                    this.href.includes('linkedin') ? 'LinkedIn' :
                    this.href.includes('youtube') ? 'YouTube' :
                    this.href.includes('instagram') ? 'Instagram' :
                    this.href.includes('tiktok') ? 'TikTok' : 'Other';
    trackEvent('Social Media', 'Click', platform);
  });
});

// Track CV download
const cvBtn = document.querySelector('.btn-secondary');
if (cvBtn) {
  cvBtn.addEventListener('click', function() {
    trackEvent('Engagement', 'Download', 'CV');
  });
}

// Track certification views
document.querySelectorAll('.certification-item').forEach(item => {
  item.addEventListener('click', function() {
    const certification = this.querySelector('span').textContent;
    trackEvent('Certifications', 'View', certification);
  });
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Animate progress bars on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll('.level-progress');
        progressBars.forEach(bar => {
          bar.style.animation = 'slideIn 1.5s ease-out';
        });
      }
    });
  }, { threshold: 0.5 });
  
  const languagesSection = document.getElementById('languages');
  if (languagesSection) {
    observer.observe(languagesSection);
  }
});

// Active section highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Contact Form Handling
class ContactForm {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.init();
  }

  init() {
    if (this.form) {
      this.bindEvents();
    }
  }

  bindEvents() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // Real-time validation on input change
    this.form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });
      
      // Clear validation when user starts typing
      input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(239, 68, 68)') {
          input.style.borderColor = '';
        }
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    if (value === '') {
      field.style.borderColor = '';
      return;
    }

    const isValid = field.checkValidity();
    field.style.borderColor = isValid ? '#10b981' : '#ef4444';
  }

  async handleSubmit() {
    const submitBtn = this.form.querySelector('.form-submit');
    const formData = new FormData(this.form);

    if (!this.isFormValid()) {
      this.showMessage('Please fill all required fields correctly.', 'error');
      return;
    }

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Sending...';

    try {
      await this.sendFormData(formData);
      this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
      this.form.reset();
      
      // Reset all field borders
      this.form.querySelectorAll('input, textarea').forEach(field => {
        field.style.borderColor = '';
      });
      
    } catch (error) {
      console.error('Form submission error:', error);
      this.showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
      // Reset button state
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
  }

  isFormValid() {
    let isValid = true;
    
    this.form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim() || !field.checkValidity()) {
        isValid = false;
        field.style.borderColor = '#ef4444';
        
        // Add a small shake animation for invalid fields
        field.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
          field.style.animation = '';
        }, 500);
      }
    });
    
    return isValid;
  }

  async sendFormData(formData) {
    const response = await fetch('https://formspree.io/f/myznabaa', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  showMessage(message, type) {
    // Remove existing message
    const existingMessage = this.form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.cssText = `
      padding: 1rem 1.5rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      text-align: center;
      font-weight: 500;
      animation: slideDown 0.3s ease-out;
    `;
    
    if (type === 'success') {
      messageDiv.style.background = '#10b981';
      messageDiv.style.color = 'white';
    } else {
      messageDiv.style.background = '#ef4444';
      messageDiv.style.color = 'white';
    }
    
    messageDiv.textContent = message;
    this.form.insertBefore(messageDiv, this.form.firstChild);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 5000);
  }
}

// Add shake animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ContactForm();
});