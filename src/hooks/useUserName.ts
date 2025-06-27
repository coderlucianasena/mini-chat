
import { useLocalStorage } from './useLocalStorage';

export const useUserName = () => {
  const [userName, setUserName] = useLocalStorage<string>('chat-user-name', '');

  return {
    userName,
    setUserName,
    // Sempre retorna false na primeira renderização para garantir que a tela de setup apareça primeiro
    hasUserName: Boolean(userName.trim())
  };
};
