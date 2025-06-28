
# Mini Chat - Aplicação de Chat em Tempo Real

Uma aplicação de chat moderna e responsiva construída com React, TypeScript e Tailwind CSS.

## 🚀 Funcionalidades

### Interface de Usuário
- **Design Responsivo**: Interface adaptável para diferentes tamanhos de tela
- **Modo Escuro/Claro**: Alternância entre temas com persistência local
- **Gradientes Modernos**: Interface visual atrativa com gradientes suaves
- **Animações Fluidas**: Transições e animações para melhor experiência do usuário

### Funcionalidades de Chat
- **Mensagens em Tempo Real**: Sistema de chat simulado com mensagens automáticas
- **Indicador de Digitação**: Mostra quando outros usuários estão digitando
- **Histórico de Mensagens**: Armazena e exibe mensagens com timestamps
- **Configuração de Nome**: Tela inicial para definir nome do usuário

### Sistema de Notificações
- **Notificações do Navegador**: Alertas quando a aba não está ativa
- **Efeitos Sonoros**: Sons para notificações e envio de mensagens
- **Controle de Som**: Toggle para ativar/desativar efeitos sonoros
- **Permissões Inteligentes**: Solicita permissões conforme necessário

### Persistência de Dados
- **LocalStorage**: Salva configurações do usuário localmente
- **Sincronização**: Mantém dados sincronizados entre abas
- **Configurações Persistentes**: Nome, tema e preferências de som

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Ferramenta de build rápida para desenvolvimento
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn/ui** - Componentes de interface modernos
- **Lucide React** - Ícones vetoriais
- **React Router DOM** - Roteamento para React
- **TanStack Query** - Gerenciamento de estado e cache

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── ui/              # Componentes de interface (shadcn/ui)
│   ├── ChatApp.tsx      # Componente principal do chat
│   ├── ChatHeader.tsx   # Cabeçalho com controles
│   ├── Message.tsx      # Componente de mensagem
│   ├── MessageInput.tsx # Input para envio de mensagens
│   ├── TypingIndicator.tsx # Indicador de digitação
│   └── UserNameSetup.tsx # Tela de configuração do nome
├── hooks/               # Custom hooks
│   ├── useAudio.ts      # Hook para efeitos sonoros
│   ├── useLocalStorage.ts # Hook para persistência local
│   ├── useMessages.ts   # Hook para gerenciar mensagens
│   ├── useNotifications.ts # Hook para notificações
│   ├── useSoundSettings.ts # Hook para configurações de som
│   ├── useTheme.ts      # Hook para alternância de tema
│   └── useUserName.ts   # Hook para gerenciar nome do usuário
├── services/            # Serviços externos
│   └── mockApi.ts       # API simulada para mensagens
├── pages/               # Páginas da aplicação
│   ├── Index.tsx        # Página inicial
│   └── NotFound.tsx     # Página de erro 404
└── lib/                 # Utilitários
    └── utils.ts         # Funções auxiliares
```

## ⚙️ Configuração e Instalação

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <URL_DO_REPOSITORIO>

# Navegue para o diretório do projeto
cd mini-chat

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Cria build de produção
npm run preview  # Visualiza build de produção
npm run lint     # Executa linting do código
```

## 🎯 Como Usar

1. **Primeiro Acesso**: Digite seu nome na tela inicial
2. **Chat**: Envie mensagens usando o campo de texto na parte inferior
3. **Configurações**: Use os botões no cabeçalho para:
   - Alternar entre modo claro/escuro
   - Ativar/desativar sons
   - Trocar seu nome de usuário
4. **Notificações**: Permita notificações para receber alertas quando a aba não estiver ativa

## 🔧 Funcionalidades Técnicas

### Hooks Customizados
- **useMessages**: Gerencia estado das mensagens e simulação
- **useNotifications**: Controla notificações do navegador
- **useAudio**: Gera efeitos sonoros usando Web Audio API
- **useTheme**: Gerencia alternância entre temas
- **useLocalStorage**: Abstrai persistência no localStorage
- **useSoundSettings**: Controla configurações de áudio
- **useUserName**: Gerencia nome do usuário

### Recursos Avançados
- **Web Audio API**: Para efeitos sonoros personalizados
- **Notification API**: Para alertas do navegador
- **LocalStorage**: Para persistência de dados
- **CSS Grid/Flexbox**: Layout responsivo
- **CSS Transitions**: Animações suaves

## 🎨 Sistema de Design

### Cores
- **Gradientes**: Azul (#3B82F6) para Índigo (#6366F1)
- **Neutros**: Escala de cinzas para textos e fundos
- **Estados**: Verde para sucesso, vermelho para erros

### Tipografia
- **Primária**: Sistema de fontes nativo
- **Pesos**: Regular (400), Medium (500), Semibold (600), Bold (700)

### Espaçamento
- **Sistema**: Baseado em múltiplos de 4px (Tailwind)
- **Responsivo**: Breakpoints padronizados

## 🚀 Deploy

### Lovable (Recomendado)
1. Clique em "Publish" no editor Lovable
2. Sua aplicação será implantada automaticamente

### Outros Serviços
- **Vercel**: `vercel --prod`
- **Netlify**: Conecte o repositório Git
- **GitHub Pages**: Configure workflow de deploy

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte e dúvidas:
- Abra uma issue no GitHub
- Contate através do Discord da comunidade Lovable

---

Desenvolvido com ❤️ usando [Lovable](https://lovable.dev)
