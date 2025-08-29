// main.js
import { ProjectGrid } from './project-grid.js?v=4';
import { projectOverlayManager } from './use-project-overlay.js?v=4';

console.log('main.js loaded successfully');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing...');
  
  try {
    // Always initialize project overlay manager (works on all pages)
    projectOverlayManager.init();
    console.log('Project overlay manager initialized');
    
    // Check if the projects grid element exists (only on projects page)
    const gridElement = document.getElementById('projects-grid');
    console.log('Projects grid element:', gridElement);
    
    if (gridElement) {
      // Initialize project grid only if element exists
      const projectsGrid = new ProjectGrid(gridElement);
      console.log('ProjectGrid initialized successfully');
      console.log('Portfolio projects page initialized with overlay system');
    } else {
      console.log('Portfolio page initialized with overlay system (no projects grid)');
    }
  } catch (error) {
    console.error('Error initializing project components:', error);
  }
});

// Removed redundant visibility change handler - overlay manager handles hash changes directly
