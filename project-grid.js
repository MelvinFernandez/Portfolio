// project-grid.js
import { projects } from './projects-data.js?v=2';
import { openProject } from './use-project-overlay.js?v=2';

export class ProjectGrid {
  constructor(container) {
    console.log('ProjectGrid constructor called with container:', container);
    this.container = container;
    this.init();
  }

  init() {
    console.log('ProjectGrid init() called');
    this.render();
    this.bindEvents();
  }

  render() {
    console.log('ProjectGrid render() called, projects:', projects);
    console.log('Container element:', this.container);
    const html = projects.map(project => this.renderProjectCard(project)).join('');
    console.log('Generated HTML:', html);
    this.container.innerHTML = html;
    console.log('HTML inserted into container');
  }

  renderProjectCard(project) {
    return `
      <article class="project-card" data-slug="${project.slug}">
        <div>
          <h3>${project.title}</h3>
          <p class="desc">${project.summary}</p>
        </div>
        <div class="tags">
          ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </article>
    `;
  }

  bindEvents() {
    const projectCards = this.container.querySelectorAll('.project-card');
    console.log('bindEvents called, found project cards:', projectCards.length);
    
    projectCards.forEach((card, index) => {
      console.log(`Processing card ${index}:`, card.innerHTML);
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const slug = card.dataset.slug;
        if (slug) {
          openProject(slug);
        }
      });

      // Add hover effects
      card.addEventListener('mouseenter', () => {
        card.classList.add('hover');
      });

      card.addEventListener('mouseleave', () => {
        card.classList.remove('hover');
      });

      // Keyboard support
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const slug = card.dataset.slug;
          if (slug) {
            openProject(slug);
          }
        }
      });

      // Make cards focusable
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      
      // Safely get the title text
      const titleElement = card.querySelector('h3');
      if (titleElement) {
        card.setAttribute('aria-label', `View details for ${titleElement.textContent}`);
      } else {
        console.warn('h3 element not found in project card:', card);
        card.setAttribute('aria-label', 'View project details');
      }
    });
  }

  refresh() {
    this.render();
    this.bindEvents();
  }
}
