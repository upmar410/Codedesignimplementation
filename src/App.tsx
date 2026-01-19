import { useState } from 'react';
import AnimatedSketchyFriend from './components/AnimatedSketchyFriend';
import CompletionScreen from './components/CompletionScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'animation' | 'completion'>('animation');
  const [counter, setCounter] = useState(0);
  const [animationTrigger, setAnimationTrigger] = useState(0);

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
      <div className="w-full max-w-[393px] h-[852px]">
        {currentScreen === 'animation' ? (
          <AnimatedSketchyFriend onDoneClick={handleDoneClick} animationTrigger={animationTrigger} />
        ) : (
          <CompletionScreen onPromptMeClick={handlePromptMeClick} counter={counter} />
        )}
      </div>
    </div>
  );
}