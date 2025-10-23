// Blog Page JavaScript
class BlogPage {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
    this.initializeAOS();
  }

  bindEvents() {
    // Search functionality
    const searchBox = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBox && searchBtn) {
      searchBtn.addEventListener('click', () => this.handleSearch(searchBox.value));
      searchBox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.handleSearch(searchBox.value);
        }
      });
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleNewsletter(newsletterForm);
      });
    }
  }

  initializeAOS() {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }

  handleSearch(query) {
    if (query.trim()) {
      // Simulate search - replace with actual search logic
      console.log('Searching for:', query);
      alert(`Searching for: ${query}\n\nThis would filter blog posts in a real implementation.`);
    }
  }

  handleNewsletter(form) {
    const email = form.querySelector('input[type="email"]').value;
    
    // Simulate newsletter subscription
    const btn = form.querySelector('button');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    btn.disabled = true;
    
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
      form.reset();
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 2000);
    }, 1500);
  }
}

// Initialize blog page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new BlogPage();
});