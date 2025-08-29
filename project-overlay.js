// project-overlay.js
import { ImageCarousel } from './image-carousel.js?v=3';

export class ProjectOverlay {
  constructor(project, onClose) {
    this.project = project;
    this.onClose = onClose;
    this.carousel = null;
    this.focusableElements = [];
    this.firstFocusableElement = null;
    this.lastFocusableElement = null;
    
    this.init();
  }

  init() {
    this.createOverlay();
    this.bindEvents();
    this.trapFocus();
    this.lockScroll();
    
    // Focus the first focusable element
    if (this.firstFocusableElement) {
      this.firstFocusableElement.focus();
    }
  }

  createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'project-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'project-title');
    
    overlay.innerHTML = `
      <div class="overlay-backdrop"></div>
      <div class="overlay-container">
        <div class="overlay-header">
          <div class="overlay-title-section">
            <h1 id="project-title" class="overlay-title">${this.project.title}</h1>
            <div class="overlay-tags">
              ${this.project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
          </div>
          <button class="overlay-close" aria-label="Close project details">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="overlay-content">
          ${this.project.images && this.project.images.length > 0 ? `
            <div class="overlay-gallery">
              <h3>Project Screenshots</h3>
              <div class="gallery-container" id="gallery-container"></div>
            </div>
          ` : ''}
          
          <div class="overlay-main">
            <div class="overlay-description">
              ${this.project.details}
            </div>
          </div>
          
          ${this.project.downloads && this.project.downloads.length > 0 ? `
            <div class="overlay-links">
              <h3>Downloads</h3>
              <div class="link-buttons">
                ${this.project.downloads.map(download => `
                  <a href="${download.file}" download class="link-button download">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7,10 12,15 17,10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    ${download.name}
                  </a>
                `).join('')}
              </div>
            </div>
          ` : `
            <div class="overlay-links">
              <h3>Project Links</h3>
              <div class="link-buttons">
                <a href="${this.project.githubUrl || 'https://github.com/MelvinFernandez'}" target="_blank" rel="noopener" class="link-button github">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  ${this.project.githubUrl ? 'View Repository' : 'View on GitHub'}
                </a>
                <button class="link-button live-demo" disabled>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15,3 21,3 21,9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Live Demo (Coming Soon)
                </button>
              </div>
            </div>
          `}
        </div>
      </div>
    `;
    
    document.body.appendChild(overlay);
    this.overlay = overlay;
    
    // Initialize carousel if images exist
    if (this.project.images && this.project.images.length > 0) {
      const galleryContainer = overlay.querySelector('#gallery-container');
      this.carousel = new ImageCarousel(galleryContainer, this.project.images, {
        showThumbnails: true,
        showArrows: true
      });
    }
  }

  bindEvents() {
    // Close button
    const closeBtn = this.overlay.querySelector('.overlay-close');
    closeBtn.addEventListener('click', () => this.close());
    
    // Backdrop click
    const backdrop = this.overlay.querySelector('.overlay-backdrop');
    backdrop.addEventListener('click', () => this.close());
    
    // Keyboard events
    this.overlay.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
      
      // Tab key handling for focus trap
      if (e.key === 'Tab') {
        this.handleTabKey(e);
      }
    });
  }

  handleTabKey(e) {
    if (e.shiftKey) {
      if (document.activeElement === this.firstFocusableElement) {
        e.preventDefault();
        this.lastFocusableElement.focus();
      }
    } else {
      if (document.activeElement === this.lastFocusableElement) {
        e.preventDefault();
        this.firstFocusableElement.focus();
      }
    }
  }

  trapFocus() {
    // Get all focusable elements
    this.focusableElements = this.overlay.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (this.focusableElements.length > 0) {
      this.firstFocusableElement = this.focusableElements[0];
      this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];
    }
  }

  lockScroll() {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = this.getScrollbarWidth() + 'px';
  }

  unlockScroll() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  getScrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);
    
    const inner = document.createElement('div');
    outer.appendChild(inner);
    
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.parentNode.removeChild(outer);
    
    return scrollbarWidth;
  }

  close() {
    if (this.carousel) {
      this.carousel.destroy();
    }
    
    this.unlockScroll();
    
    // Add closing animation
    this.overlay.classList.add('closing');
    
    setTimeout(() => {
      if (this.overlay.parentNode) {
        this.overlay.parentNode.removeChild(this.overlay);
      }
      this.onClose();
    }, 200);
  }
}
