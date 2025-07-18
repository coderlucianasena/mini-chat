
export interface ApiMessage {
  id: number;
  author: string;
  text: string;
}

export interface NewMessage {
  author: string;
  text: string;
}

// Função para resetar para as mensagens iniciais
const resetToInitialMessages = () => {
  return [
    { id: 1, author: "João", text: "Olá, pessoal!" },
    { id: 2, author: "Maria", text: "Oi, João! Tudo bem?" },
    { id: 3, author: "João", text: "Tudo ótimo! E com você?" }
  ];
};

// Estado simulado da "base de dados" - sempre inicia com as mensagens iniciais
let messages: ApiMessage[] = resetToInitialMessages();
let nextId = 4;

// Simula GET /messages
export const getMessages = (): Promise<ApiMessage[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Sempre retorna as mensagens iniciais na primeira chamada
      messages = resetToInitialMessages();
      nextId = 4;
      resolve([...messages]);
    }, 300); // Simula latência de 300ms
  });
};

// Simula POST /messages
export const postMessage = (newMessage: NewMessage): Promise<ApiMessage> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const messageWithId: ApiMessage = {
        id: nextId++,
        author: newMessage.author,
        text: newMessage.text
      };
      
      messages.push(messageWithId);
      resolve(messageWithId);
    }, 300); // Simula latência de 300ms
  });
};
