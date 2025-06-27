
import { useLocalStorage } from './useLocalStorage';

export const useSoundSettings = () => {
  const [soundEnabled, setSoundEnabled] = useLocalStorage<boolean>('sound-enabled', true);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return {
    soundEnabled,
    setSoundEnabled,
    toggleSound
  };
};
