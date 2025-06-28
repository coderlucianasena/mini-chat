
import { useLocalStorage } from './useLocalStorage';

export const useSoundSettings = () => {
  const [soundEnabled, setSoundEnabled] = useLocalStorage<boolean>('sound-enabled', true);

  const toggleSound = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    console.log('Som', newValue ? 'ativado' : 'desativado');
  };

  return {
    soundEnabled,
    setSoundEnabled,
    toggleSound
  };
};
