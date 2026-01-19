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
      
      // First: fit the height of the dark green screen
      const scaleFactor = availableHeight / BASE_HEIGHT;
      
      // Calculate new dimensions maintaining aspect ratio
      const newWidth = BASE_WIDTH * scaleFactor;
      const newHeight = BASE_HEIGHT * scaleFactor;
      
      // Dark blue will show on sides if newWidth < availableWidth (content is narrower)
      // Dark blue won't show if newWidth >= availableWidth (content fills or exceeds width)
      
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
