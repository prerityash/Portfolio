/**
 * SOUMYA PRERIT - PORTFOLIO INTERACTIVITY
 * Custom cursor, mobile menu, category filtering, copy email, contact form
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 0. Custom Magnifier Cursor System ---
  const magnifierCursor = document.getElementById('magnifierCursor');

  if (magnifierCursor && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Check if mouse is over a dark section to dynamically adapt magnifier contrast
      const hoveredEl = document.elementFromPoint(mouseX, mouseY);
      if (hoveredEl && hoveredEl.closest('.section-dark, .hero-dark-side, .site-footer, .quote-ribbon, .site-header')) {
        document.body.classList.add('cursor-dark');
      } else {
        document.body.classList.remove('cursor-dark');
      }
    });

    // Smooth physics loop for the magnifying glass
    const animateMagnifier = () => {
      const speed = 0.22;
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;

      magnifierCursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      requestAnimationFrame(animateMagnifier);
    };
    requestAnimationFrame(animateMagnifier);

    // Interactive Magnification Hover Effect
    const magnifyTargets = document.querySelectorAll(
      'a, button, input, textarea, .skill-pill, .project-card, .contact-channel-card, .about-info-card, .hero-social-item, .filter-btn, .btn-copy'
    );

    magnifyTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('magnifier-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('magnifier-hover');
      });
    });

    // Click / Active State (Magnifier compression effect)
    window.addEventListener('mousedown', () => {
      document.body.classList.add('magnifier-active');
    });
    window.addEventListener('mouseup', () => {
      document.body.classList.remove('magnifier-active');
    });

    // Hide magnifier when cursor leaves viewport
    document.addEventListener('mouseleave', () => {
      magnifierCursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      magnifierCursor.style.opacity = '1';
    });
  }

  // --- 1. Mobile Menu Drawer Toggle ---
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileDrawer.classList.toggle('active');
    });

    // Close drawer when any mobile link is clicked
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.classList.remove('active');
      });
    });
  }

  // --- 2. Portfolio Category Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // --- 3. Copy Email to Clipboard ---
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyEmailText = document.getElementById('copyEmailText');

  if (copyEmailBtn && copyEmailText) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = 'prerityash@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        copyEmailText.textContent = 'Copied!';
        copyEmailBtn.style.backgroundColor = '#10B981';

        setTimeout(() => {
          copyEmailText.textContent = 'Copy';
          copyEmailBtn.style.backgroundColor = '#000000';
        }, 2500);
      } catch (err) {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        copyEmailText.textContent = 'Copied!';
        setTimeout(() => {
          copyEmailText.textContent = 'Copy';
        }, 2500);
      }
    });
  }

  // --- 4. Contact Form Submission Handler ---
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm && formFeedback && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !message) {
        formFeedback.className = 'form-feedback';
        formFeedback.style.backgroundColor = '#FEE2E2';
        formFeedback.style.color = '#991B1B';
        formFeedback.style.borderColor = '#DC2626';
        formFeedback.textContent = 'Please fill out all required fields.';
        formFeedback.classList.remove('hidden');
        return;
      }

      // Simulate sending
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';

      setTimeout(() => {
        formFeedback.className = 'form-feedback success';
        formFeedback.textContent = `Thank you, ${name}! Your message has been prepared. Opening your email client to send...`;
        formFeedback.classList.remove('hidden');

        // Mailto fallback link to automatically open email client
        const mailtoLink = `mailto:prerityash@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
        window.location.href = mailtoLink;

        // Reset form
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <span>Send Message</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        `;

        setTimeout(() => {
          formFeedback.classList.add('hidden');
        }, 6000);
      }, 700);
    });
  }

  // --- 5. Active Link Highlight on Scroll ---
  const sections = document.querySelectorAll('section[id], article[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
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
});
