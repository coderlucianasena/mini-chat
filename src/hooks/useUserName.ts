
import { useLocalStorage } from './useLocalStorage';

export const useUserName = () => {
  const [userName, setUserName] = useLocalStorage<string>('chat-user-name', '');

  return {
    userName,
    setUserName,
    hasUserName: Boolean(userName.trim())
  };
};
