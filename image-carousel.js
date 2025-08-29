// image-carousel.js
export class ImageCarousel {
  constructor(container, images, options = {}) {
    this.container = container;
    this.images = images;
    this.currentIndex = 0;
    this.options = {
      autoPlay: false,
      autoPlayInterval: 5000,
      showThumbnails: true,
      showArrows: true,
      ...options
    };
    
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
    if (this.options.autoPlay) {
      this.startAutoPlay();
    }
  }

  render() {
    this.container.innerHTML = `
      <div class="carousel-container">
        <div class="carousel-main">
          <div class="img-frame">
            <img 
              src="${this.images[this.currentIndex]}" 
              alt="Project screenshot ${this.currentIndex + 1}"
              class="carousel-image"
              loading="${this.currentIndex === 0 ? 'eager' : 'lazy'}"
              decoding="async"
            />
            <button class="expand-btn" aria-label="Expand image" title="Expand">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path fill="currentColor"
                  d="M4 10V4h6v2H6v4H4zm14 0V6h-4V4h6v6h-2zM4 14h2v4h4v2H4v-6zm12 6v-2h4v-4h2v6h-6z"/>
              </svg>
            </button>
          </div>
          
          ${this.options.showArrows ? `
            <button class="carousel-arrow carousel-arrow-prev" aria-label="Previous image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button class="carousel-arrow carousel-arrow-next" aria-label="Next image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          ` : ''}
          
          <div class="carousel-counter">
            ${this.currentIndex + 1} / ${this.images.length}
          </div>
        </div>
        
        ${this.options.showThumbnails && this.images.length > 1 ? `
          <div class="carousel-thumbnails">
            ${this.images.map((image, index) => `
              <button 
                class="carousel-thumbnail ${index === this.currentIndex ? 'active' : ''}"
                data-index="${index}"
                aria-label="Go to image ${index + 1}"
              >
                <img 
                  src="${image}" 
                  alt="Thumbnail ${index + 1}" 
                  loading="lazy"
                  decoding="async"
                />
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }

  bindEvents() {
    // Arrow navigation
    if (this.options.showArrows) {
      const prevBtn = this.container.querySelector('.carousel-arrow-prev');
      const nextBtn = this.container.querySelector('.carousel-arrow-next');
      
      if (prevBtn) prevBtn.addEventListener('click', () => this.previous());
      if (nextBtn) nextBtn.addEventListener('click', () => this.next());
    }

    // Thumbnail navigation
    if (this.options.showThumbnails) {
      const thumbnails = this.container.querySelectorAll('.carousel-thumbnail');
      thumbnails.forEach(thumb => {
        thumb.addEventListener('click', (e) => {
          const index = parseInt(e.currentTarget.dataset.index);
          this.goTo(index);
        });
      });
    }

    // Keyboard navigation
    this.container.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          this.previous();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.next();
          break;
        case 'Home':
          e.preventDefault();
          this.goTo(0);
          break;
        case 'End':
          e.preventDefault();
          this.goTo(this.images.length - 1);
          break;
      }
    });



    // Touch/swipe support
    let startX = 0;
    let endX = 0;
    
    this.container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    
    this.container.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      this.handleSwipe(startX, endX);
    });
  }

  handleSwipe(startX, endX) {
    const threshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.next();
      } else {
        this.previous();
      }
    }
  }

  goTo(index) {
    if (index < 0 || index >= this.images.length) return;
    
    this.currentIndex = index;
    this.render();
    this.bindEvents();
  }

  next() {
    const nextIndex = (this.currentIndex + 1) % this.images.length;
    this.goTo(nextIndex);
  }

  previous() {
    const prevIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
    this.goTo(prevIndex);
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, this.options.autoPlayInterval);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  destroy() {
    this.stopAutoPlay();
    this.container.innerHTML = '';
  }
}
