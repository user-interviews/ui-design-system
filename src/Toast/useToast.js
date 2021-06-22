import { useCallback, useReducer } from 'react';
import { v4 as generateUUID } from 'uuid';

const createMessage = (messageAction, messageType, messageText) => ({
  id: generateUUID(),
  action: messageAction,
  message: messageText,
  type: messageType,
});

const ACTIONS = {
  CLEAR_MESSAGES: 'CLEAR_MESSAGES',
  DISMISS_MESSAGE: 'DISMISS_MESSAGE',
  SET_MESSAGE: 'SET_MESSAGE',
};

const messagesReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_MESSAGE:
      return [
        ...state,
        createMessage(payload.messageAction, payload.messageType, payload.messageText),
      ];
    case ACTIONS.CLEAR_MESSAGES:
      return [];
    case ACTIONS.DISMISS_MESSAGE:
      return state.filter((message) => message.id !== payload.messageId);
    default:
      return state;
  }
};

const useToast = (initialMessages = []) => {
  const [messages, dispatch] = useReducer(messagesReducer, initialMessages);

  const clearMessages = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_MESSAGES });
  }, []);

  const setMessage = useCallback((messageAction, messageType, messageText) => {
    dispatch({ type: ACTIONS.SET_MESSAGE, payload: { messageAction, messageType, messageText } });
  }, []);

  const dismissMessage = useCallback((messageId) => {
    dispatch({ type: ACTIONS.DISMISS_MESSAGE, payload: { messageId } });
  }, []);

  return {
    clearMessages,
    dismissMessage,
    messages,
    setMessage,
  };
};

export default useToast;
