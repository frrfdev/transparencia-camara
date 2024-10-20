import { AnimatePresence } from 'framer-motion';
import { createContext, ReactNode, useContext, useState } from 'react';
import { motion } from 'framer-motion';

export type Message = {
  id: string;
  content: string | ReactNode;
};

type MessageContextType = {
  messages: Message[];
  addMessage: (message: Omit<Message, 'id'>, timeout?: number) => void;
  removeMessage: (messageId: string) => void;
};

export const MessageContext = createContext<MessageContextType>({
  messages: [],
  addMessage: () => {},
  removeMessage: () => {},
});

export const useMessageContext = () => {
  return useContext(MessageContext);
};

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: Omit<Message, 'id'>, timeout = 3000) => {
    const id = (Date.now() + messages.length).toString();
    setMessages([...messages, { id, ...message }]);
    setTimeout(() => {
      removeMessage(id);
    }, timeout);
  };

  const removeMessage = (messageId: string) => {
    setMessages(messages.filter((m) => m.id !== messageId));
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage, removeMessage }}>
      {children}
      <div className="absolute top-0 right-0 w-full h-[100px] user-select-none pointer-events-none flex flex-col gap-4 overflow-hidden pt-4">
        <AnimatePresence>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              className="flex items-center top-0 absolute transform left-full w-min translate-x-full"
              initial={{ opacity: 0, transform: 'translateX(0)' }}
              animate={{ opacity: 1, transform: 'translateX(-100%)' }}
              exit={{ opacity: 0, transform: 'translateX(0)' }}
            >
              <svg
                className="inset-0 w-[80px]  min-h-[40px] h-[80px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
              >
                <polygon points="0,0 40,0 40,40" fill={'black'} opacity={0.7} />
              </svg>
              <div className="h-[80px] flex justify-end text-end px-4 items-center text-white w-[400px] shrink-0 bg-black bg-opacity-70">
                {m.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </MessageContext.Provider>
  );
};
