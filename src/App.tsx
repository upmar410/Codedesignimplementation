import { useState } from 'react';
import AnimatedSketchyFriend from './components/AnimatedSketchyFriend';
import CompletionScreen from './components/CompletionScreen';
import { useViewportScale } from './hooks/useViewportScale';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'animation' | 'completion'>('animation');
  const [counter, setCounter] = useState(0);
  const [animationTrigger, setAnimationTrigger] = useState(0);
  const { scale, dimensions } = useViewportScale();

  const handleDoneClick = () => {
    setCounter(prev => prev + 1);
    setCurrentScreen('completion');
  };

  const handlePromptMeClick = () => {
    setAnimationTrigger(prev => prev + 1); // Trigger new animation
    setCurrentScreen('animation');
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-900 p-1 overflow-hidden">
      <div 
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {currentScreen === 'animation' ? (
          <AnimatedSketchyFriend onDoneClick={handleDoneClick} animationTrigger={animationTrigger} scale={scale} />
        ) : (
          <CompletionScreen onPromptMeClick={handlePromptMeClick} counter={counter} scale={scale} />
        )}
      </div>
    </div>
  );
}