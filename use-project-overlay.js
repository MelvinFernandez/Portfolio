// use-project-overlay.js
import { ProjectOverlay } from './project-overlay.js?v=3';
import { getProjectBySlug } from './projects-data.js?v=3';

export class ProjectOverlayManager {
  constructor() {
    this.currentOverlay = null;
    this.isInitialized = false;
    
    // Don't auto-initialize in constructor to prevent double initialization
  }

  init() {
    if (this.isInitialized) {
      console.log('ProjectOverlayManager already initialized, skipping...');
      return;
    }
    
    console.log('Initializing ProjectOverlayManager...');
    
    // Listen for hash changes
    window.addEventListener('hashchange', this.handleHashChange.bind(this));
    window.addEventListener('popstate', this.handlePopState.bind(this));
    
    // Check initial hash on page load
    this.checkInitialHash();
    
    this.isInitialized = true;
    console.log('ProjectOverlayManager initialized successfully');
  }

  checkInitialHash() {
    const hash = window.location.hash;
    if (hash.startsWith('#project/')) {
      const slug = hash.replace('#project/', '');
      this.open(slug);
    }
  }

  handleHashChange() {
    const hash = window.location.hash;
    if (hash.startsWith('#project/')) {
      const slug = hash.replace('#project/', '');
      if (!this.currentOverlay || this.currentOverlay.project.slug !== slug) {
        this.open(slug);
      }
    } else {
      this.close();
    }
  }

  handlePopState() {
    const hash = window.location.hash;
    if (!hash.startsWith('#project/')) {
      this.close();
    }
  }

  open(slug) {
    console.log(`Opening project overlay for slug: ${slug}`);
    
    const project = getProjectBySlug(slug);
    if (!project) {
      console.warn(`Project with slug "${slug}" not found`);
      return;
    }

    // Close existing overlay if any
    if (this.currentOverlay) {
      console.log('Closing existing overlay');
      this.currentOverlay.close();
    }

    // Create new overlay
    console.log('Creating new overlay');
    this.currentOverlay = new ProjectOverlay(project, () => {
      this.currentOverlay = null;
    });

    // Update URL
    if (window.location.hash !== `#project/${slug}`) {
      window.history.pushState({ slug }, '', `#project/${slug}`);
    }
  }

  close() {
    if (this.currentOverlay) {
      this.currentOverlay.close();
      this.currentOverlay = null;
    }

    // Update URL
    if (window.location.hash.startsWith('#project/')) {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.hash = '';
      }
    }
  }

  isOpen() {
    return this.currentOverlay !== null;
  }

  getCurrentProject() {
    return this.currentOverlay ? this.currentOverlay.project : null;
  }
}

// Create global instance
export const projectOverlayManager = new ProjectOverlayManager();

// Export convenience functions
export const openProject = (slug) => projectOverlayManager.open(slug);
export const closeProject = () => projectOverlayManager.close();
export const isProjectOpen = () => projectOverlayManager.isOpen();
