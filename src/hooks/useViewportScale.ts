import { useState, useEffect } from 'react';

// Base dimensions (iPhone 16)
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;
const ASPECT_RATIO = BASE_WIDTH / BASE_HEIGHT; // ≈ 0.461

export function useViewportScale() {
  const [scale, setScale] = useState(1);
  const [dimensions, setDimensions] = useState({ width: BASE_WIDTH, height: BASE_HEIGHT });

  useEffect(() => {
    const updateScale = () => {
      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Account for App component padding (p-1 = 4px on each side = 8px total)
      const appPadding = 8;
      const availableWidth = viewportWidth - appPadding;
      const availableHeight = viewportHeight - appPadding;
      
      // Calculate scale based on both width and height constraints
      const scaleByWidth = availableWidth / BASE_WIDTH;
      const scaleByHeight = availableHeight / BASE_HEIGHT;
      
      // Use the smaller scale to ensure everything fits
      const scaleFactor = Math.min(scaleByWidth, scaleByHeight);
      
      // Calculate new dimensions maintaining aspect ratio
      const newWidth = BASE_WIDTH * scaleFactor;
      const newHeight = BASE_HEIGHT * scaleFactor;
      
      setScale(scaleFactor);
      setDimensions({ width: newWidth, height: newHeight });
    };

    // Initial calculation
    updateScale();

    // Update on resize
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return { scale, dimensions };
}
