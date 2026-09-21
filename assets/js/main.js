/**
 * IRON & IVORY — MEN'S GROOMING & BEARD CARE STUDIO
 * Master JavaScript Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ------------------------------------------------------------------------
     1. THEME SWITCHER SYSTEM (LIGHT/DARK)
     ------------------------------------------------------------------------ */
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const htmlElement = document.documentElement;

  // Retrieve stored theme or default to dark/system preference
  const savedTheme = localStorage.getItem('iron_ivory_theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  const currentTheme = savedTheme ? savedTheme : (systemPrefersLight ? 'light' : 'dark');
  setTheme(currentTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeTheme = htmlElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      setTheme(activeTheme);
    });
  });

  function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('iron_ivory_theme', theme);
    
    // Update theme toggle icons
    themeToggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'light') {
          icon.className = 'bi bi-moon-stars-fill';
          btn.setAttribute('aria-label', 'Switch to Dark Mode');
        } else {
          icon.className = 'bi bi-sun-fill';
          btn.setAttribute('aria-label', 'Switch to Light Mode');
        }
      }
    });
  }

  /* ------------------------------------------------------------------------
     1.5 RTL LAYOUT SWITCHER SYSTEM
     ------------------------------------------------------------------------ */
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
  const savedDir = localStorage.getItem('iron_ivory_dir');
  const currentDir = savedDir ? savedDir : 'ltr';
  setDirection(currentDir);

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeDir = htmlElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
      setDirection(activeDir);
    });
  });

  function setDirection(dir) {
    htmlElement.setAttribute('dir', dir);
    localStorage.setItem('iron_ivory_dir', dir);

    rtlToggleBtns.forEach(btn => {
      if (dir === 'rtl') {
        btn.textContent = 'LTR';
        btn.classList.add('active');
        btn.setAttribute('aria-label', 'Switch to LTR Layout');
      } else {
        btn.textContent = 'RTL';
        btn.classList.remove('active');
        btn.setAttribute('aria-label', 'Switch to RTL Layout');
      }
    });
  }

  /* ------------------------------------------------------------------------
     2. STICKY NAVBAR & SCROLL DETECTOR
     ------------------------------------------------------------------------ */
  const navbar = document.querySelector('.studio-navbar');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('active');
    } else {
      backToTopBtn?.classList.remove('active');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------------
     3. MOBILE NAVIGATION DRAWER & TOGGLE
     ------------------------------------------------------------------------ */
  const hamburgerBtn = document.querySelector('.mobile-hamburger');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  const drawerCloseBtn = document.querySelector('.drawer-close');

  function openDrawer() {
    mobileDrawer?.classList.add('active');
    drawerOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('active');
    drawerOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburgerBtn?.addEventListener('click', openDrawer);
  drawerCloseBtn?.addEventListener('click', closeDrawer);
  drawerOverlay?.addEventListener('click', closeDrawer);

  // Mobile Accordion Dropdowns
  const mobileDropdownTriggers = document.querySelectorAll('.mobile-dropdown-toggle');
  mobileDropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = trigger.parentElement;
      const subMenu = parent.querySelector('.mobile-dropdown-menu');
      subMenu?.classList.toggle('show');
      const icon = trigger.querySelector('i');
      if (icon) {
        icon.className = subMenu?.classList.contains('show') ? 'bi bi-chevron-up' : 'bi bi-chevron-down';
      }
    });
  });

  // ESC key listener to close menus & modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeLightbox();
      closeBookingModal();
    }
  });

  /* ------------------------------------------------------------------------
     4. CATEGORY FILTER SYSTEM (SERVICES, PRODUCTS, GALLERY)
     ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const filterableItems = document.querySelectorAll('.filterable-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetFilter = btn.getAttribute('data-filter');

      filterableItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (targetFilter === 'all' || itemCategory === targetFilter) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     5. GALLERY LIGHTBOX MODAL
     ------------------------------------------------------------------------ */
  const galleryItems = document.querySelectorAll('.gallery-grid-item');
  const lightboxModal = document.querySelector('.lightbox-modal');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxCaption = document.querySelector('.lightbox-caption');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-title')?.textContent || '';
      if (img && lightboxModal && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Studio Gallery Image';
        if (lightboxCaption) lightboxCaption.textContent = title;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightboxModal && lightboxModal.classList.contains('active')) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  /* ------------------------------------------------------------------------
  // Dynamic active menu highlighting for desktop & mobile drawer
  const currentFileName = window.location.pathname.split('/').pop() || 'index.html';
  const allNavAnchors = document.querySelectorAll('.nav-menu a, .mobile-menu-list a');
  allNavAnchors.forEach(anchor => {
    const href = anchor.getAttribute('href');
    if (href) {
      const hrefFile = href.split('#')[0].split('?')[0];
      if (hrefFile === currentFileName || (currentFileName === '' && hrefFile === 'index.html')) {
        anchor.classList.add('active');
        const parentLi = anchor.closest('li');
        if (parentLi) parentLi.classList.add('active');
      }
    }
  });

  /* ------------------------------------------------------------------------
     6. BOOKING MODAL & INTERACTIVE FORMS
     ------------------------------------------------------------------------ */
  function getBookingModal() {
    return document.querySelector('.booking-modal-wrapper');
  }

  function openBookingModal(serviceName = '') {
    const bookingModal = getBookingModal();
    if (bookingModal) {
      bookingModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (serviceName) {
        const serviceSelect = bookingModal.querySelector('select[name="service"]');
        if (serviceSelect) serviceSelect.value = serviceName;
      }
    } else {
      window.location.href = 'contact.html';
    }
  }

  function closeBookingModal() {
    const bookingModal = getBookingModal();
    if (bookingModal && bookingModal.classList.contains('active')) {
      bookingModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  const bookingTriggers = document.querySelectorAll('.trigger-booking-modal');
  bookingTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || '';
      openBookingModal(service);
    });
  });

  document.addEventListener('click', (e) => {
    if (e.target.matches('.booking-modal-close') || e.target.closest('.booking-modal-close')) {
      closeBookingModal();
    }
    const bookingModal = getBookingModal();
    if (e.target === bookingModal) {
      closeBookingModal();
    }
  });

  // Form Submission Validation
  const forms = document.querySelectorAll('.studio-interactive-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const requiredInputs = form.querySelectorAll('[required]');
      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#e74c3c';
        } else {
          input.style.borderColor = 'var(--border-color)';
        }
      });

      const feedback = form.querySelector('.form-feedback-alert');
      if (isValid) {
        if (feedback) {
          feedback.style.display = 'block';
          feedback.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i> Thank you! Your appointment request has been submitted successfully. Our concierge will contact you shortly.';
          feedback.style.color = 'var(--accent-gold)';
        }
        form.reset();
        setTimeout(() => {
          if (bookingModal?.classList.contains('active')) {
            closeBookingModal();
          }
        }, 3500);
      } else {
        if (feedback) {
          feedback.style.display = 'block';
          feedback.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i> Please complete all required fields before submitting.';
          feedback.style.color = '#e74c3c';
        }
      }
    });
  });

  console.log('IRON & IVORY — Master Scripts Initialized.');
});
