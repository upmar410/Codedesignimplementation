import { useState, useEffect, useRef } from 'react';
import Matter from 'matter-js';

// Physics configuration
const PHYSICS_CONFIG = {
  gravity: 1.2, // Realistic gravity
  restitution: 0.2, // Low bounce (0 = no bounce, 1 = super bouncy)
  friction: 0.8, // High friction to stop sliding
  density: 0.001, // Object density
  timeScale: 1, // Physics simulation speed (1 = normal)
};

// Base dimensions (will be scaled)
const BASE_WHITE_LINE_Y = 743;
const BASE_PILL_HEIGHT = 69;
const BASE_PILL_WIDTH = 323;
const BASE_CIRCLE_SIZE = 69;
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

// Data sets for randomization
const SIZES = [
  '5x5 inch',
  'A4 sheet',
  'A5 sketch',
  'Square canvas',
  'Postcard size',
  'Long bookmark',
  'Mini sticker',
  'Poster size',
  'Tiny thumbnail',
  'Wide panorama'
];

const COLOR_SCHEMES = [
  'Analogous colour scheme',
  'Complementary colours only',
  'Monochrome colour palette',
  'Triadic bright palette',
  'Warm colours only',
  'Cool colours only',
  'Muted pastel palette',
  'Neon brights palette',
  'Earth tone palette',
  'Black white accent'
];

const PROMPTS = [
  'Three desk objects',
  'Favourite daily ritual',
  'Unexpected tiny moment',
  'Window view today',
  'Favourite quick snack',
  'Something you treasure',
  'Slightly broken thing',
  'Morning commute memory',
  'Quiet resting place',
  'Something that sparkles',
  'Hands doing something',
  'Messy work desk',
  'Patterned everyday object',
  'Childhood special object',
  'Usually ignored thing',
  'Tiny everyday luxury',
  'Something you dislike',
  'Recent happy memory',
  'Strange shadow shape',
  'Future dream object'
];

// Helper function to get random item from array
const getRandomItem = (array: string[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Helper functions will be defined inside component to access scale

interface PhysicsBody {
  x: number;
  y: number;
  rotation: number;
}

interface AnimatedSketchyFriendProps {
  onDoneClick: () => void;
  animationTrigger: number;
  scale: number;
}

export default function AnimatedSketchyFriend({ onDoneClick, animationTrigger, scale }: AnimatedSketchyFriendProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showElements, setShowElements] = useState(false);
  
  // Calculate scaled dimensions
  const WHITE_LINE_Y = BASE_WHITE_LINE_Y * scale;
  const PILL_HEIGHT = BASE_PILL_HEIGHT * scale;
  const PILL_WIDTH = BASE_PILL_WIDTH * scale;
  const CIRCLE_SIZE = BASE_CIRCLE_SIZE * scale;
  const SCREEN_WIDTH = BASE_WIDTH * scale;
  const SCREEN_HEIGHT = BASE_HEIGHT * scale;
  
  // Title dimensions (scaled) - 20% above original position
  const titleBaseTop = 111.65 * 0.8 * scale; // 20% above original
  const titlePadding = 0; // No padding between words
  
  const yourHeight = 36.705 * 0.66 * scale; // 60% of original, then +10% = 66%
  const yourWidth = 71.638 * scale;
  const yourTop = titleBaseTop;
  const yourFontSize = 25 * scale;
  
  const sketchyHeight = 66.337 * 0.66 * scale; // 60% of original, then +10% = 66%
  const sketchyWidth = 151.436 * scale;
  const sketchyTop = yourTop + yourHeight + titlePadding; // After YOUR
  const sketchyFontSize = 44 * scale;
  
  const friendHeight = 38.989 * 0.66 * scale; // 60% of original, then +10% = 66%
  const friendWidth = 94.525 * scale;
  const friendTop = sketchyTop + sketchyHeight + titlePadding; // After sketchy
  const friendFontSize = 25 * scale;
  
  // Helper functions for random positions (scaled)
  const getRandomX = () => {
    // Random X between 80*scale and (SCREEN_WIDTH - 80*scale), leaving margin for pill width
    const margin = 80 * scale;
    return Math.floor(Math.random() * (SCREEN_WIDTH - 2 * margin) + margin);
  };

  const getRandomCircleX = () => {
    // Random X between 35*scale and (SCREEN_WIDTH - 35*scale), leaving margin for circle size
    const margin = 35 * scale;
    return Math.floor(Math.random() * (SCREEN_WIDTH - 2 * margin) + margin);
  };

  const getRandomStartY = (baseY: number) => {
    // Add random variation to starting height (scaled)
    const variation = 50 * scale;
    return baseY * scale + Math.floor(Math.random() * variation - variation * 2);
  };
  
  // Pill text content
  const [sizeText, setSizeText] = useState('5x5 inch');
  const [colorSchemeText, setColorSchemeText] = useState('Analogous colour scheme');
  const [promptText, setPromptText] = useState('3 objects on your desk');
  
  // Physics bodies positions - Pills fall in order: Pink first, Off-white second, Lime third
  const [limePill, setLimePill] = useState<PhysicsBody>({ x: 160, y: -400, rotation: 6.279 });
  const [whitePill, setWhitePill] = useState<PhysicsBody>({ x: 230, y: -250, rotation: 355.351 });
  const [pinkPill, setPinkPill] = useState<PhysicsBody>({ x: 150, y: -100, rotation: 15.682 });
  const [leftCircle, setLeftCircle] = useState<PhysicsBody>({ x: 34, y: -150, rotation: 0 });
  const [rightCircle, setRightCircle] = useState<PhysicsBody>({ x: 355, y: -320, rotation: 0 });

  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const bodiesRef = useRef<{
    limePill?: Matter.Body;
    whitePill?: Matter.Body;
    pinkPill?: Matter.Body;
    leftCircle?: Matter.Body;
    rightCircle?: Matter.Body;
    ground?: Matter.Body;
    leftWall?: Matter.Body;
    rightWall?: Matter.Body;
  }>({});
  const previousScaleRef = useRef<number>(scale);

  const handleDoneClick = () => {
    // Randomize pill text content BEFORE starting animation
    setSizeText(getRandomItem(SIZES));
    setColorSchemeText(getRandomItem(COLOR_SCHEMES));
    setPromptText(getRandomItem(PROMPTS));
    
    // Clear existing animation and physics
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (engineRef.current) {
      Matter.Engine.clear(engineRef.current);
      Matter.World.clear(engineRef.current.world, false);
    }
    
    // Reset to initial state
    setIsAnimating(false);
    setShowElements(false);
    
    // Small delay to ensure state updates before starting new animation
    setTimeout(() => {
      setIsAnimating(true);
      setShowElements(true);
      
      // Generate random starting positions for pills and circles (base values, will be scaled in function)
      const pinkX = getRandomX();
      const pinkY = getRandomStartY(-100); // Pink falls first
      
      const whiteX = getRandomX();
      const whiteY = getRandomStartY(-250); // Off-white falls second
      
      const limeX = getRandomX();
      const limeY = getRandomStartY(-400); // Lime falls third
      
      const leftCircleX = getRandomCircleX();
      const leftCircleY = getRandomStartY(-150);
      
      const rightCircleX = getRandomCircleX();
      const rightCircleY = getRandomStartY(-320);
      
      // Random initial rotations for variety
      const pinkRotation = Math.random() * 30 - 15; // -15 to 15 degrees
      const whiteRotation = Math.random() * 30 - 15;
      const limeRotation = Math.random() * 30 - 15;
      
      // Reset physics body positions to randomized starting positions
      setLimePill({ x: limeX, y: limeY, rotation: limeRotation });
      setWhitePill({ x: whiteX, y: whiteY, rotation: whiteRotation });
      setPinkPill({ x: pinkX, y: pinkY, rotation: pinkRotation });
      setLeftCircle({ x: leftCircleX, y: leftCircleY, rotation: 0 });
      setRightCircle({ x: rightCircleX, y: rightCircleY, rotation: 0 });
    
      // Create physics engine
      const engine = Matter.Engine.create({
        gravity: { x: 0, y: PHYSICS_CONFIG.gravity, scale: 0.001 }
      });
      engineRef.current = engine;

      // Create static ground at white line (scaled)
      const ground = Matter.Bodies.rectangle(
        SCREEN_WIDTH / 2, // center of screen
        WHITE_LINE_Y + 3 * scale, // Position so pill bottoms rest 7px above white line (scaled)
        SCREEN_WIDTH, // full width
        20 * scale, // thickness
        { 
          isStatic: true,
          friction: PHYSICS_CONFIG.friction,
          restitution: 0.1,
        }
      );

      // Create invisible walls to contain objects within screen bounds (scaled)
      const leftWall = Matter.Bodies.rectangle(
        -10 * scale, // left edge
        SCREEN_HEIGHT / 2, // middle height
        20 * scale, // thickness
        SCREEN_HEIGHT * 2, // height (extend beyond screen)
        {
          isStatic: true,
          friction: PHYSICS_CONFIG.friction,
          restitution: 0.1,
        }
      );

      const rightWall = Matter.Bodies.rectangle(
        SCREEN_WIDTH + 10 * scale, // right edge
        SCREEN_HEIGHT / 2, // middle height
        20 * scale, // thickness
        SCREEN_HEIGHT * 2, // height (extend beyond screen)
        {
          isStatic: true,
          friction: PHYSICS_CONFIG.friction,
          restitution: 0.1,
        }
      );

      // Create pill bodies (rectangles with rounded corners) - scaled
      const chamferRadius = 35 * scale;
      const limePillBody = Matter.Bodies.rectangle(
        limeX, limeY,
        PILL_WIDTH, PILL_HEIGHT,
        {
          angle: (limeRotation * Math.PI) / 180,
          restitution: PHYSICS_CONFIG.restitution,
          friction: PHYSICS_CONFIG.friction,
          density: PHYSICS_CONFIG.density,
          chamfer: { radius: chamferRadius }, // rounded corners (scaled)
          frictionAir: 0.05, // Air resistance to slow rotation
        }
      );

      const whitePillBody = Matter.Bodies.rectangle(
        whiteX, whiteY,
        PILL_WIDTH, PILL_HEIGHT,
        {
          angle: (whiteRotation * Math.PI) / 180,
          restitution: PHYSICS_CONFIG.restitution,
          friction: PHYSICS_CONFIG.friction,
          density: PHYSICS_CONFIG.density,
          chamfer: { radius: chamferRadius }, // scaled
          frictionAir: 0.05, // Air resistance to slow rotation
        }
      );

      const pinkPillBody = Matter.Bodies.rectangle(
        pinkX, pinkY,
        PILL_WIDTH, PILL_HEIGHT,
        {
          angle: (pinkRotation * Math.PI) / 180,
          restitution: PHYSICS_CONFIG.restitution,
          friction: PHYSICS_CONFIG.friction,
          density: PHYSICS_CONFIG.density,
          chamfer: { radius: chamferRadius }, // scaled
          frictionAir: 0.05, // Air resistance to slow rotation
        }
      );

      // Create circle bodies - scaled
      const leftCircleBody = Matter.Bodies.circle(
        leftCircleX, leftCircleY,
        CIRCLE_SIZE / 2,
        {
          restitution: PHYSICS_CONFIG.restitution,
          friction: PHYSICS_CONFIG.friction,
          density: PHYSICS_CONFIG.density,
        }
      );

      const rightCircleBody = Matter.Bodies.circle(
        rightCircleX, rightCircleY,
        CIRCLE_SIZE / 2,
        {
          restitution: PHYSICS_CONFIG.restitution,
          friction: PHYSICS_CONFIG.friction,
          density: PHYSICS_CONFIG.density,
        }
      );

      // Add all bodies to world
      Matter.World.add(engine.world, [
        ground,
        leftWall,
        rightWall,
        limePillBody,
        whitePillBody,
        pinkPillBody,
        leftCircleBody,
        rightCircleBody,
      ]);

      bodiesRef.current = {
        limePill: limePillBody,
        whitePill: whitePillBody,
        pinkPill: pinkPillBody,
        leftCircle: leftCircleBody,
        rightCircle: rightCircleBody,
        ground,
        leftWall,
        rightWall,
      };
      
      // Update previous scale reference when bodies are created
      previousScaleRef.current = scale;

      // Animation loop
      const updateLoop = () => {
        if (!engineRef.current) return;
        
        Matter.Engine.update(engineRef.current, 1000 / 60);

        const bodies = bodiesRef.current;
        
        // Constrain pill rotations to prevent upside down flips
        if (bodies.limePill) {
          let angle = bodies.limePill.angle;
          // Normalize angle to -180 to 180 degrees
          while (angle > Math.PI) angle -= 2 * Math.PI;
          while (angle < -Math.PI) angle += 2 * Math.PI;
          
          // Constrain to -60 to 60 degrees to prevent upside down
          const maxAngle = (60 * Math.PI) / 180;
          if (Math.abs(angle) > maxAngle) {
            Matter.Body.setAngle(bodies.limePill, angle > 0 ? maxAngle : -maxAngle);
            Matter.Body.setAngularVelocity(bodies.limePill, 0); // Stop rotation
          }
          
          setLimePill({
            x: bodies.limePill.position.x,
            y: bodies.limePill.position.y,
            rotation: (bodies.limePill.angle * 180) / Math.PI,
          });
        }
        
        if (bodies.whitePill) {
          let angle = bodies.whitePill.angle;
          // Normalize angle to -180 to 180 degrees
          while (angle > Math.PI) angle -= 2 * Math.PI;
          while (angle < -Math.PI) angle += 2 * Math.PI;
          
          // Constrain to -60 to 60 degrees to prevent upside down
          const maxAngle = (60 * Math.PI) / 180;
          if (Math.abs(angle) > maxAngle) {
            Matter.Body.setAngle(bodies.whitePill, angle > 0 ? maxAngle : -maxAngle);
            Matter.Body.setAngularVelocity(bodies.whitePill, 0); // Stop rotation
          }
          
          setWhitePill({
            x: bodies.whitePill.position.x,
            y: bodies.whitePill.position.y,
            rotation: (bodies.whitePill.angle * 180) / Math.PI,
          });
        }
        
        if (bodies.pinkPill) {
          let angle = bodies.pinkPill.angle;
          // Normalize angle to -180 to 180 degrees
          while (angle > Math.PI) angle -= 2 * Math.PI;
          while (angle < -Math.PI) angle += 2 * Math.PI;
          
          // Constrain to -60 to 60 degrees to prevent upside down
          const maxAngle = (60 * Math.PI) / 180;
          if (Math.abs(angle) > maxAngle) {
            Matter.Body.setAngle(bodies.pinkPill, angle > 0 ? maxAngle : -maxAngle);
            Matter.Body.setAngularVelocity(bodies.pinkPill, 0); // Stop rotation
          }
          
          setPinkPill({
            x: bodies.pinkPill.position.x,
            y: bodies.pinkPill.position.y,
            rotation: (bodies.pinkPill.angle * 180) / Math.PI,
          });
        }
        
        if (bodies.leftCircle) {
          setLeftCircle({
            x: bodies.leftCircle.position.x,
            y: bodies.leftCircle.position.y,
            rotation: 0,
          });
        }
        
        if (bodies.rightCircle) {
          setRightCircle({
            x: bodies.rightCircle.position.x,
            y: bodies.rightCircle.position.y,
            rotation: 0,
          });
        }

        animationFrameRef.current = requestAnimationFrame(updateLoop);
      };

      updateLoop();
    }, 100);
  };

  useEffect(() => {
    if (animationTrigger > 0) {
      handleDoneClick();
    }
  }, [animationTrigger]);

  // Handle scale changes - resize pills and circles that have already landed
  useEffect(() => {
    const previousScale = previousScaleRef.current;
    const scaleRatio = scale / previousScale;
    
    // Only update if scale actually changed and physics bodies exist
    if (Math.abs(scaleRatio - 1) > 0.001 && engineRef.current && Object.keys(bodiesRef.current).length > 0 && isAnimating) {
      const bodies = bodiesRef.current;
      
      // Helper function to scale a body around its center point
      // Matter.js Body.scale scales from origin, so we translate to origin, scale, then translate back
      const scaleBodyAroundCenter = (body: Matter.Body, ratio: number) => {
        const centerX = body.position.x;
        const centerY = body.position.y;
        
        // Translate to origin, scale, then translate back
        Matter.Body.translate(body, { x: -centerX, y: -centerY });
        Matter.Body.scale(body, ratio, ratio);
        Matter.Body.translate(body, { x: centerX, y: centerY });
      };
      
      // Update pill positions and sizes
      if (bodies.limePill) {
        const currentPos = bodies.limePill.position;
        const currentAngle = bodies.limePill.angle;
        const newX = currentPos.x * scaleRatio;
        const newY = currentPos.y * scaleRatio;
        
        // Scale around center, then update position
        scaleBodyAroundCenter(bodies.limePill, scaleRatio);
        Matter.Body.setPosition(bodies.limePill, { x: newX, y: newY });
        Matter.Body.setAngle(bodies.limePill, currentAngle);
        
        // Update state
        setLimePill({
          x: newX,
          y: newY,
          rotation: (currentAngle * 180) / Math.PI,
        });
      }
      
      if (bodies.whitePill) {
        const currentPos = bodies.whitePill.position;
        const currentAngle = bodies.whitePill.angle;
        const newX = currentPos.x * scaleRatio;
        const newY = currentPos.y * scaleRatio;
        
        scaleBodyAroundCenter(bodies.whitePill, scaleRatio);
        Matter.Body.setPosition(bodies.whitePill, { x: newX, y: newY });
        Matter.Body.setAngle(bodies.whitePill, currentAngle);
        
        setWhitePill({
          x: newX,
          y: newY,
          rotation: (currentAngle * 180) / Math.PI,
        });
      }
      
      if (bodies.pinkPill) {
        const currentPos = bodies.pinkPill.position;
        const currentAngle = bodies.pinkPill.angle;
        const newX = currentPos.x * scaleRatio;
        const newY = currentPos.y * scaleRatio;
        
        scaleBodyAroundCenter(bodies.pinkPill, scaleRatio);
        Matter.Body.setPosition(bodies.pinkPill, { x: newX, y: newY });
        Matter.Body.setAngle(bodies.pinkPill, currentAngle);
        
        setPinkPill({
          x: newX,
          y: newY,
          rotation: (currentAngle * 180) / Math.PI,
        });
      }
      
      // Update circle positions and sizes
      if (bodies.leftCircle) {
        const currentPos = bodies.leftCircle.position;
        const newX = currentPos.x * scaleRatio;
        const newY = currentPos.y * scaleRatio;
        
        scaleBodyAroundCenter(bodies.leftCircle, scaleRatio);
        Matter.Body.setPosition(bodies.leftCircle, { x: newX, y: newY });
        
        setLeftCircle({
          x: newX,
          y: newY,
          rotation: 0,
        });
      }
      
      if (bodies.rightCircle) {
        const currentPos = bodies.rightCircle.position;
        const newX = currentPos.x * scaleRatio;
        const newY = currentPos.y * scaleRatio;
        
        scaleBodyAroundCenter(bodies.rightCircle, scaleRatio);
        Matter.Body.setPosition(bodies.rightCircle, { x: newX, y: newY });
        
        setRightCircle({
          x: newX,
          y: newY,
          rotation: 0,
        });
      }
      
      // Update ground position and size
      if (bodies.ground) {
        const newGroundY = (BASE_WHITE_LINE_Y * scale) + 3 * scale;
        const newGroundX = (BASE_WIDTH * scale) / 2;
        const groundCenterX = bodies.ground.position.x;
        const groundCenterY = bodies.ground.position.y;
        
        // Scale width only, around center
        Matter.Body.translate(bodies.ground, { x: -groundCenterX, y: -groundCenterY });
        Matter.Body.scale(bodies.ground, scaleRatio, 1);
        Matter.Body.translate(bodies.ground, { x: groundCenterX, y: groundCenterY });
        Matter.Body.setPosition(bodies.ground, { 
          x: newGroundX, 
          y: newGroundY 
        });
      }
      
      // Update wall positions
      if (bodies.leftWall) {
        const newX = -10 * scale;
        const newY = (BASE_HEIGHT * scale) / 2;
        const wallCenterX = bodies.leftWall.position.x;
        const wallCenterY = bodies.leftWall.position.y;
        
        // Scale height only, around center
        Matter.Body.translate(bodies.leftWall, { x: -wallCenterX, y: -wallCenterY });
        Matter.Body.scale(bodies.leftWall, 1, scaleRatio);
        Matter.Body.translate(bodies.leftWall, { x: wallCenterX, y: wallCenterY });
        Matter.Body.setPosition(bodies.leftWall, { 
          x: newX, 
          y: newY 
        });
      }
      
      if (bodies.rightWall) {
        const newX = (BASE_WIDTH * scale) + 10 * scale;
        const newY = (BASE_HEIGHT * scale) / 2;
        const wallCenterX = bodies.rightWall.position.x;
        const wallCenterY = bodies.rightWall.position.y;
        
        // Scale height only, around center
        Matter.Body.translate(bodies.rightWall, { x: -wallCenterX, y: -wallCenterY });
        Matter.Body.scale(bodies.rightWall, 1, scaleRatio);
        Matter.Body.translate(bodies.rightWall, { x: wallCenterX, y: wallCenterY });
        Matter.Body.setPosition(bodies.rightWall, { 
          x: newX, 
          y: newY 
        });
      }
    }
    
    // Update previous scale reference
    previousScaleRef.current = scale;
  }, [scale, isAnimating]);

  return (
    <div 
      className="bg-[#313d3a] overflow-clip relative rounded-[40px] size-full" 
      data-name="iPhone 16 - 2"
      style={{
        '--scale': scale,
      } as React.CSSProperties}
    >
      {/* Static header elements - centered horizontally, scaled dynamically */}
      <div 
        className="absolute flex items-center justify-center translate-x-[-50%]" 
        style={{ 
          left: '50%',
          top: `${yourTop}px`,
          height: `${yourHeight}px`,
          width: `${yourWidth}px`,
        }}
      >
        <div className="flex-none rotate-[354.3deg]">
          <p 
            className="font-normal leading-[normal] relative text-[#e0e0e0] text-center text-nowrap"
            style={{ fontFamily: "'Golos Text', sans-serif", fontSize: `${yourFontSize}px` }}
          >
            YOUR
          </p>
        </div>
      </div>
      <div 
        className="absolute flex items-center justify-center translate-x-[-50%]" 
        style={{ 
          left: '50%',
          top: `${friendTop}px`,
          height: `${friendHeight}px`,
          width: `${friendWidth}px`,
        }}
      >
        <div className="flex-none rotate-[354.3deg]">
          <p 
            className="font-normal leading-[normal] relative text-[#e0e0e0] text-center text-nowrap"
            style={{ fontFamily: "'Golos Text', sans-serif", fontSize: `${friendFontSize}px` }}
          >
            FRIEND
          </p>
        </div>
      </div>
      <div 
        className="absolute flex items-center justify-center translate-x-[-50%]" 
        style={{ 
          left: '50%',
          top: `${sketchyTop}px`,
          height: `${sketchyHeight}px`,
          width: `${sketchyWidth}px`,
        }}
      >
        <div className="flex-none rotate-[354.303deg]">
          <p 
            className="leading-[normal] not-italic relative text-[#ffd23d] text-center text-nowrap"
            style={{ fontFamily: "'Cabin Sketch', cursive, sans-serif", fontWeight: 700, fontSize: `${sketchyFontSize}px` }}
          >
            sketchy
          </p>
        </div>
      </div>

      {/* Physics-based pills and circles */}
      {showElements && (
        <>
          {/* PINK PILL */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: pinkPill.x,
              top: pinkPill.y,
              transform: `translate(-50%, -50%) rotate(${pinkPill.rotation}deg)`,
            }}
          >
            <div 
              className="bg-[#ff39b3] rounded-[50px]" 
              style={{ height: `${PILL_HEIGHT}px`, width: `${PILL_WIDTH}px` }}
            />
            <p className="absolute font-['Golos_Text:Bold',sans-serif] font-bold leading-[normal] text-black text-nowrap top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 overflow-hidden text-ellipsis" style={{ fontSize: `${18 * scale}px`, maxWidth: `${291 * scale}px` }}>
              {promptText}
            </p>
          </div>

          {/* WHITE/LIGHT PINK PILL */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: whitePill.x,
              top: whitePill.y,
              transform: `translate(-50%, -50%) rotate(${whitePill.rotation}deg)`,
            }}
          >
            <div 
              className="bg-[#fff2fa] rounded-[50px]" 
              style={{ height: `${PILL_HEIGHT}px`, width: `${PILL_WIDTH}px` }}
            />
            <p className="absolute font-['Golos_Text:Bold',sans-serif] font-bold leading-[normal] text-black text-nowrap top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 overflow-hidden text-ellipsis" style={{ fontSize: `${18 * scale}px`, maxWidth: `${291 * scale}px` }}>
              {colorSchemeText}
            </p>
          </div>

          {/* LIME/YELLOW PILL */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: limePill.x,
              top: limePill.y,
              transform: `translate(-50%, -50%) rotate(${limePill.rotation}deg)`,
            }}
          >
            <div 
              className="bg-[#ecff46] rounded-[50px]" 
              style={{ height: `${PILL_HEIGHT}px`, width: `${PILL_WIDTH}px` }}
            />
            <p className="absolute font-['Golos_Text:Bold',sans-serif] font-bold leading-[normal] text-black text-nowrap top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 overflow-hidden text-ellipsis" style={{ fontSize: `${19 * scale}px`, maxWidth: `${291 * scale}px` }}>
              {sizeText}
            </p>
          </div>

          {/* LEFT BLUE CIRCLE */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: leftCircle.x - CIRCLE_SIZE / 2,
              top: leftCircle.y - CIRCLE_SIZE / 2,
              width: CIRCLE_SIZE,
              height: CIRCLE_SIZE,
            }}
          >
            <div className="bg-[#41f6ff] rounded-full w-full h-full" />
          </div>

          {/* RIGHT BLUE CIRCLE */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: rightCircle.x - CIRCLE_SIZE / 2,
              top: rightCircle.y - CIRCLE_SIZE / 2,
              width: CIRCLE_SIZE,
              height: CIRCLE_SIZE,
            }}
          >
            <div className="bg-[#41f6ff] rounded-full w-full h-full" />
          </div>
        </>
      )}

      {/* Static white line (ground) - scaled */}
      <div 
        className="absolute h-0" 
        style={{
          left: `${50 * scale}px`,
          top: `${WHITE_LINE_Y}px`,
          width: `${307 * scale}px`,
        }}
      >
        <div className="absolute" style={{ inset: `${-7 * scale}px 0 0 0` }}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 307 7">
            <line id="Line 1" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth={7 * scale} x1="3.5" x2="303.5" y1="3.5" y2="3.5" />
          </svg>
        </div>
      </div>

      {/* Split buttons - scaled */}
      {/* PromptMe button - left side */}
      <div 
        className="absolute bg-[rgba(255,210,61,0.21)] cursor-pointer z-50 flex items-center justify-center" 
        style={{
          height: `${109 * scale}px`,
          left: 0,
          top: `${WHITE_LINE_Y}px`,
          width: `${SCREEN_WIDTH / 2}px`,
          paddingBottom: `${33 * scale}px`,
          paddingTop: `${27 * scale}px`,
          paddingLeft: `${57 * scale}px`,
          paddingRight: `${57 * scale}px`,
        }}
        onClick={handleDoneClick}
      >
        <p className="font-['Golos_Text:Bold',sans-serif] font-bold leading-[normal] text-[#ffd23d] text-center" style={{ fontSize: `${28 * scale}px` }}>PromptMe</p>
      </div>

      {/* Done button - right side */}
      <div 
        className="absolute bg-[rgba(55,255,248,0.2)] cursor-pointer z-50 flex items-center justify-center" 
        style={{
          height: `${109 * scale}px`,
          left: `${SCREEN_WIDTH / 2}px`,
          top: `${WHITE_LINE_Y}px`,
          width: `${SCREEN_WIDTH / 2}px`,
          paddingBottom: `${33 * scale}px`,
          paddingTop: `${27 * scale}px`,
          paddingLeft: `${57 * scale}px`,
          paddingRight: `${57 * scale}px`,
        }}
        onClick={onDoneClick}
      >
        <p className="font-['Golos_Text:Bold',sans-serif] font-bold leading-[normal] text-[#37FFF8] text-center" style={{ fontSize: `${28 * scale}px` }}>Done</p>
      </div>
    </div>
  );
}