import { useState } from 'react';
import { v4 as generateUUID } from 'uuid';

const createMessage = (messageType, messageText) => ({
  id: generateUUID(),
  message: messageText,
  type: messageType,
});

const useFlash = () => {
  const [messages, setMessages] = useState([]);

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
    messages,
    setMessage,
    dismissMessage,
  };
};

export default useFlash;
