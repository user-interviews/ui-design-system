import { useState } from 'react';
import { v4 as generateUUID } from 'uuid';

const createMessage = (messageType, messageText) => ({
  id: generateUUID(),
  message: messageText,
  type: messageType,
});

const useFlash = (initialMessages = []) => {
  const [messages, setMessages] = useState(initialMessages);

  const clearMessages = () => {
    setMessages([]);
  };

  const setMessage = (messageType, messageText) => {
    setMessages([
      ...messages,
      createMessage(messageType, messageText),
    ]);
  };

  const dismissMessage = (messageId) => {
    setMessages(
      messages.filter((message) => message.id !== messageId),
    );
  };

  return {
    clearMessages,
    dismissMessage,
    messages,
    setMessage,
  };
};

export default useFlash;
