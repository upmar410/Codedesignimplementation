import { motion } from 'motion/react';

export default function CartoonBlueFlame() {
  // Smooth ease-in-out for organic motion
  const smoothEase = "easeInOut";
  
  // Outer flame - squash and stretch with subtle sway
  const outerFlameVariants = {
    animate: {
      scaleY: [1, 1.08, 1, 0.96, 1, 1.05, 1],
      scaleX: [1, 0.96, 1, 1.04, 1, 0.98, 1],
      x: [0, -1, 1, -1.5, 0.5, -0.5, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: smoothEase,
      }
    }
  };

  // Layer 2 - slight delay (40ms)
  const layer2Variants = {
    animate: {
      scaleY: [1, 1.1, 1, 0.94, 1, 1.06, 1],
      scaleX: [1, 0.95, 1, 1.05, 1, 0.97, 1],
      x: [0, -1.2, 1.2, -1.8, 0.8, -0.8, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: smoothEase,
        delay: 0.04,
      }
    }
  };

  // Layer 3 - slight delay (50ms)
  const layer3Variants = {
    animate: {
      scaleY: [1, 1.12, 1, 0.92, 1, 1.08, 1],
      scaleX: [1, 0.94, 1, 1.06, 1, 0.96, 1],
      x: [0, -1.5, 1.5, -2, 1, -1, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: smoothEase,
        delay: 0.05,
      }
    }
  };

  // Inner core - more delay (60ms)
  const coreVariants = {
    animate: {
      scaleY: [1, 1.15, 1, 0.9, 1, 1.1, 1],
      scaleX: [1, 0.92, 1, 1.08, 1, 0.95, 1],
      x: [0, -2, 2, -2, 1.5, -1.5, 0],
      opacity: [0.9, 0.95, 1, 0.92, 0.96, 0.93, 0.9],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: smoothEase,
        delay: 0.06,
      }
    }
  };

  // Embers - fade out and scale down, randomized timing
  const ember1Variants = {
    animate: {
      y: [0, -20, -45, -75],
      x: [0, -2, 1, -1],
      opacity: [0, 0.8, 0.4, 0],
      scale: [0.8, 1, 0.6, 0.2],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: smoothEase,
        delay: 0,
      }
    }
  };

  const ember2Variants = {
    animate: {
      y: [0, -15, -40, -70],
      x: [0, 3, -2, 2],
      opacity: [0, 0.7, 0.35, 0],
      scale: [0.6, 0.9, 0.5, 0.15],
      transition: {
        duration: 2.8,
        repeat: Infinity,
        ease: smoothEase,
        delay: 0.8,
      }
    }
  };

  const ember3Variants = {
    animate: {
      y: [0, -18, -42, -72],
      x: [0, -1, 2, -2],
      opacity: [0, 0.75, 0.38, 0],
      scale: [0.7, 1.1, 0.55, 0.18],
      transition: {
        duration: 2.6,
        repeat: Infinity,
        ease: smoothEase,
        delay: 1.6,
      }
    }
  };

  return (
    <div className="relative w-[100px] h-[140px] flex items-end justify-center">
      {/* Outer glow - soft light cyan */}
      <div 
        className="absolute bottom-0 w-[90px] h-[110px] bg-[#5ce1ff] opacity-30 rounded-full blur-[25px]"
        style={{ transformOrigin: 'bottom center' }}
      />

      {/* Embers */}
      <motion.div
        className="absolute bottom-[60px] left-[35px] w-[8px] h-[8px] bg-[#00d4ff] rounded-full blur-[1px]"
        variants={ember1Variants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-[60px] left-[60px] w-[6px] h-[6px] bg-[#5ce1ff] rounded-full blur-[1px]"
        variants={ember2Variants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-[60px] left-[48px] w-[7px] h-[7px] bg-[#00d4ff] rounded-full blur-[1px]"
        variants={ember3Variants}
        animate="animate"
      />

      {/* Layer 1 - Outer flame - Deep Teal with teardrop shape */}
      <motion.div
        className="absolute bottom-0 w-[70px] h-[100px] bg-[#0c5f6b]"
        style={{ 
          borderRadius: '48% 52% 48% 52% / 58% 58% 42% 42%',
          clipPath: 'polygon(35% 5%, 50% 0%, 65% 5%, 78% 15%, 85% 30%, 88% 45%, 90% 60%, 88% 75%, 82% 88%, 70% 96%, 50% 100%, 30% 96%, 18% 88%, 12% 75%, 10% 60%, 12% 45%, 15% 30%, 22% 15%)',
          transformOrigin: 'bottom center',
        }}
        variants={outerFlameVariants}
        animate="animate"
      />

      {/* Layer 2 - Dark Cyan */}
      <motion.div
        className="absolute bottom-0 w-[58px] h-[82px] bg-[#0891b2]"
        style={{ 
          borderRadius: '48% 52% 48% 52% / 60% 60% 40% 40%',
          clipPath: 'polygon(38% 8%, 50% 2%, 62% 8%, 75% 18%, 82% 32%, 85% 48%, 82% 64%, 75% 78%, 62% 90%, 50% 96%, 38% 90%, 25% 78%, 18% 64%, 15% 48%, 18% 32%, 25% 18%)',
          transformOrigin: 'bottom center',
          filter: 'blur(1px)',
        }}
        variants={layer2Variants}
        animate="animate"
      />

      {/* Layer 3 - Bright Aqua */}
      <motion.div
        className="absolute bottom-[5px] w-[44px] h-[65px] bg-[#00d4ff]"
        style={{ 
          borderRadius: '48% 52% 48% 52% / 65% 65% 35% 35%',
          clipPath: 'polygon(40% 10%, 50% 4%, 60% 10%, 72% 22%, 78% 38%, 78% 54%, 72% 70%, 60% 85%, 50% 92%, 40% 85%, 28% 70%, 22% 54%, 22% 38%, 28% 22%)',
          transformOrigin: 'bottom center',
          filter: 'blur(2px)',
        }}
        variants={layer3Variants}
        animate="animate"
      />

      {/* Layer 4 - Mid Aqua */}
      <motion.div
        className="absolute bottom-[10px] w-[30px] h-[48px] bg-[#5ce1ff]"
        style={{ 
          borderRadius: '48% 52% 48% 52% / 68% 68% 32% 32%',
          clipPath: 'polygon(42% 12%, 50% 5%, 58% 12%, 70% 25%, 75% 42%, 75% 58%, 70% 75%, 58% 88%, 50% 95%, 42% 88%, 30% 75%, 25% 58%, 25% 42%, 30% 25%)',
          transformOrigin: 'bottom center',
          filter: 'blur(3px)',
        }}
        variants={layer3Variants}
        animate="animate"
      />

      {/* Core - Very Light Cyan/Almost White with inner glow */}
      <motion.div
        className="absolute bottom-[15px] w-[18px] h-[32px] bg-[#f0fbff]"
        style={{ 
          borderRadius: '48% 52% 48% 52% / 72% 72% 28% 28%',
          transformOrigin: 'bottom center',
          filter: 'blur(4px)',
          boxShadow: '0 0 15px 5px rgba(224, 247, 255, 0.6)',
        }}
        variants={coreVariants}
        animate="animate"
      />

      {/* Base glow beneath flame */}
      <div 
        className="absolute bottom-0 w-[80px] h-[60px] bg-[#00d4ff] opacity-15 rounded-full blur-[20px]"
        style={{ transformOrigin: 'bottom center' }}
      />
    </div>
  );
}