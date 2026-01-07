/**
 * Awesome Claude Code Resources
 * Premium JavaScript - v2.0
 * Handles theme toggling, scroll interactions, mobile menu, and micro-animations
 */

(function() {
  'use strict';

  // ============================================
  // DOM ELEMENTS
  // ============================================
  const body = document.body;
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const scrollTopBtn = document.querySelector('.scroll-top');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const header = document.querySelector('.site-header');

  // ============================================
  // THEME MANAGEMENT
  // ============================================
  function setTheme(isLight) {
    if (isLight) {
      body.classList.add('light');
      if (themeIcon) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      }
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.remove('light');
      if (themeIcon) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
      localStorage.setItem('theme', 'dark');
    }
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme === 'light');
    } else {
      // Default to dark theme (our primary design)
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(!prefersDark);
    }
  }

  // Theme toggle click handler
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const isCurrentlyLight = body.classList.contains('light');
      setTheme(!isCurrentlyLight);
      
      // Add a subtle rotation animation on click
      if (themeIcon) {
        themeIcon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
          themeIcon.style.transform = '';
        }, 300);
      }
    });
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
      setTheme(!e.matches);
    }
  });

  // ============================================
  // SCROLL TO TOP
  // ============================================
  function toggleScrollButton() {
    const threshold = 400;
    if (scrollTopBtn) {
      if (window.scrollY > threshold) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', scrollToTop);
  }

  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================
  let lastScroll = 0;
  
  function handleHeaderScroll() {
    const currentScroll = window.scrollY;
    
    if (header) {
      // Add shadow when scrolled
      if (currentScroll > 10) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
      } else {
        header.style.boxShadow = 'none';
      }
    }
    
    lastScroll = currentScroll;
  }

  // ============================================
  // MOBILE MENU
  // ============================================
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenuBtn.classList.toggle('active');
      mobileNav.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (mobileNav.classList.contains('active')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });

    // Close menu when clicking a link
    const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        body.style.overflow = '';
      });
    });
  }

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = header ? header.offsetHeight : 0;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset - 20;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Update URL without scrolling
          history.pushState(null, null, href);
        }
      }
    });
  });

  // ============================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ============================================
  function setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('h2, table, .emoji-filter-container').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // Add animation class
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    </style>
  `);

  // ============================================
  // EXTERNAL LINK HANDLING
  // ============================================
  function setupExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
      if (!link.href.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  // ============================================
  // TABLE ENHANCEMENTS
  // ============================================
  function enhanceTables() {
    document.querySelectorAll('table').forEach(table => {
      // Wrap tables for horizontal scroll on mobile
      if (!table.parentElement.classList.contains('table-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-wrapper';
        wrapper.style.cssText = 'overflow-x: auto; -webkit-overflow-scrolling: touch;';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      }
    });
  }

  // ============================================
  // COPY TO CLIPBOARD FOR CODE BLOCKS
  // ============================================
  function setupCodeCopy() {
    document.querySelectorAll('pre').forEach(pre => {
      const copyBtn = document.createElement('button');
      copyBtn.className = 'code-copy-btn';
      copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
      copyBtn.title = 'Copy code';
      copyBtn.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 6px 10px;
        background: var(--bg-tertiary);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-sm);
        color: var(--text-secondary);
        cursor: pointer;
        opacity: 0;
        transition: all 0.2s ease;
        font-size: 12px;
      `;
      
      pre.style.position = 'relative';
      pre.appendChild(copyBtn);
      
      pre.addEventListener('mouseenter', () => {
        copyBtn.style.opacity = '1';
      });
      
      pre.addEventListener('mouseleave', () => {
        copyBtn.style.opacity = '0';
      });
      
      copyBtn.addEventListener('click', async () => {
        const code = pre.querySelector('code');
        if (code) {
          try {
            await navigator.clipboard.writeText(code.textContent);
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            copyBtn.style.color = 'var(--success)';
            setTimeout(() => {
              copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
              copyBtn.style.color = 'var(--text-secondary)';
            }, 2000);
          } catch (err) {
            console.error('Failed to copy:', err);
          }
        }
      });
    });
  }

  // ============================================
  // SCROLL EVENT HANDLER (THROTTLED)
  // ============================================
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(function() {
      toggleScrollButton();
      handleHeaderScroll();
    });
  }, { passive: true });

  // ============================================
  // KEYBOARD NAVIGATION
  // ============================================
  document.addEventListener('keydown', function(e) {
    // Press '/' to focus search (if implemented)
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      const searchBtn = document.querySelector('.search-btn');
      if (searchBtn) searchBtn.click();
    }
    
    // Press 't' to toggle theme
    if (e.key === 't' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      if (themeToggle) themeToggle.click();
    }
    
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
      mobileMenuBtn.click();
    }
  });

  // ============================================
  // INITIALIZATION
  // ============================================
  document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    toggleScrollButton();
    handleHeaderScroll();
    setupExternalLinks();
    enhanceTables();
    setupCodeCopy();
    
    // Delay intersection observer for smoother page load
    setTimeout(setupIntersectionObserver, 100);
  });

  // If DOM is already loaded
  if (document.readyState !== 'loading') {
    initTheme();
    toggleScrollButton();
    handleHeaderScroll();
    setupExternalLinks();
    enhanceTables();
    setupCodeCopy();
    setTimeout(setupIntersectionObserver, 100);
  }

})();
