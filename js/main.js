// Main JavaScript file
console.log('WTF Kind of Day - Site loaded');

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const email = this.querySelector('input[type="email"]').value;
    
    if (email) {
      btn.textContent = '✓ Subscribed!';
      btn.disabled = true;
      setTimeout(() => {
        this.reset();
        btn.textContent = 'Subscribe to the Chaos →';
        btn.disabled = false;
      }, 3000);
    }
  });
}
