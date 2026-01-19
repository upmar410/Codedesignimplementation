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
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div 
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          position: 'relative',
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