/**
 * Modern Animations and Transitions
 * For Shopify theme modernization
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Feather icons
  if (typeof feather !== 'undefined') {
    feather.replace();
  }
  
  // Initialize animations
  initAnimations();
  
  // Initialize hover effects
  initHoverEffects();
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize cart drawer
  initCartDrawer();
});

/**
 * Initialize scroll-based animations
 */
function initAnimations() {
  const animateSections = document.querySelectorAll('.animate-section');
  const staggeredItems = document.querySelectorAll('.staggered-item');
  const scrollFadeElements = document.querySelectorAll('.scroll-fade-in');
  const scrollSlideElements = document.querySelectorAll('.scroll-slide-up');
  const textRevealElements = document.querySelectorAll('.text-reveal');
  
  // Intersection Observer for section animations
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  // Intersection Observer for staggered item animations
  const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        itemObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Intersection Observer for scroll fade animations
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Observe elements
  animateSections.forEach(section => {
    sectionObserver.observe(section);
  });
  
  staggeredItems.forEach(item => {
    itemObserver.observe(item);
  });
  
  scrollFadeElements.forEach(element => {
    fadeObserver.observe(element);
  });
  
  scrollSlideElements.forEach(element => {
    fadeObserver.observe(element);
  });
  
  textRevealElements.forEach(element => {
    fadeObserver.observe(element);
  });
}

/**
 * Initialize hover effects
 */
function initHoverEffects() {
  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('.button--animated');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    });
  });
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.header__icon--menu');
  const menuDrawer = document.querySelector('.menu-drawer');
  const menuOverlay = document.querySelector('.menu-drawer-overlay');
  const closeButton = document.querySelector('.menu-drawer__close-button');
  const subMenuToggles = document.querySelectorAll('.menu-drawer__menu-item[aria-controls]');
  
  if (!menuToggle || !menuDrawer) return;
  
  // Create overlay if it doesn't exist
  if (!menuOverlay) {
    const overlay = document.createElement('div');
    overlay.classList.add('menu-drawer-overlay');
    document.body.appendChild(overlay);
  }
  
  // Toggle menu
  menuToggle.addEventListener('click', function() {
    toggleMenu();
  });
  
  // Close menu with close button
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      toggleMenu(false);
    });
  }
  
  // Close menu with overlay
  document.querySelector('.menu-drawer-overlay').addEventListener('click', function() {
    toggleMenu(false);
  });
  
  // Toggle submenus
  subMenuToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const submenuId = this.getAttribute('aria-controls');
      const submenu = document.getElementById(submenuId);
      
      if (submenu) {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        submenu.classList.toggle('active');
      }
    });
  });
  
  // Toggle menu function
  function toggleMenu(open = true) {
    if (open === true) {
      menuDrawer.classList.add('active');
      document.querySelector('.menu-drawer-overlay').classList.add('active');
      document.body.classList.add('overflow-hidden');
      menuToggle.setAttribute('aria-expanded', 'true');
    } else {
      menuDrawer.classList.remove('active');
      document.querySelector('.menu-drawer-overlay').classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  }
  
  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      toggleMenu(false);
    }
  });
}

/**
 * Initialize cart drawer functionality
 */
function initCartDrawer() {
  const cartToggle = document.querySelector('.header__icon--cart');
  const cartDrawer = document.querySelector('.cart-drawer');
  const cartOverlay = document.querySelector('.cart-drawer-overlay');
  const closeButton = document.querySelector('.cart-drawer__close');
  
  if (!cartToggle || !cartDrawer) return;
  
  // Create overlay if it doesn't exist
  if (!cartOverlay) {
    const overlay = document.createElement('div');
    overlay.classList.add('cart-drawer-overlay');
    document.body.appendChild(overlay);
  }
  
  // Toggle cart
  cartToggle.addEventListener('click', function(e) {
    e.preventDefault();
    toggleCart();
  });
  
  // Close cart with close button
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      toggleCart(false);
    });
  }
  
  // Close cart with overlay
  document.querySelector('.cart-drawer-overlay').addEventListener('click', function() {
    toggleCart(false);
  });
  
  // Toggle cart function
  function toggleCart(open = true) {
    if (open === true) {
      cartDrawer.classList.add('active');
      document.querySelector('.cart-drawer-overlay').classList.add('active');
      document.body.classList.add('overflow-hidden');
    } else {
      cartDrawer.classList.remove('active');
      document.querySelector('.cart-drawer-overlay').classList.remove('active');
      document.body.classList.remove('overflow-hidden');
    }
  }
  
  // Close cart on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      toggleCart(false);
    }
  });
}

/**
 * Page transition effect
 */
function initPageTransitions() {
  document.body.classList.add('page-transition-active');
  
  window.addEventListener('beforeunload', function() {
    document.body.classList.add('page-transition-exit');
  });
}

/**
 * Add smooth scroll behavior
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Initialize on page load
initSmoothScroll();
initPageTransitions();