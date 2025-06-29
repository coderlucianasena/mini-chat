
import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const ChatFooter = () => {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors">
      <div className="flex items-center justify-center gap-4">
        <span className="text-xs text-gray-500 dark:text-gray-400">Desenvolvido por</span>
        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com/in/coderlucianasena"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
          >
            <Linkedin size={14} />
            LinkedIn
          </a>
          <a
            href="https://github.com/coderlucianasena"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <Github size={14} />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChatFooter;
