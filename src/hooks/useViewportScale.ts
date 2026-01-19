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
      // Get viewport height, leaving some padding (e.g., 20px on top and bottom)
      const viewportHeight = window.innerHeight;
      const padding = 40; // Total padding (top + bottom)
      const availableHeight = viewportHeight - padding;
      
      // Calculate scale based on available height
      const scaleFactor = availableHeight / BASE_HEIGHT;
      
      // Calculate new dimensions maintaining aspect ratio
      const newHeight = availableHeight;
      const newWidth = newHeight * ASPECT_RATIO;
      
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
