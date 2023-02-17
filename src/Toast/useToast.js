import { useCallback, useReducer } from 'react';
import { v4 as generateUUID } from 'uuid';
import { bugsnagClient } from '../bugsnag';

const createMessage = (
  type,
  title,
  message,
  action,
) => ({
  id: generateUUID(),
  type,
  title,
  message,
  action,
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
        createMessage(
          payload?.type,
          payload?.title,
          payload?.message,
          payload?.action,
        ),
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

  const setMessage = useCallback((options) => {
    if ((options && typeof options === 'string')) {
      bugsnagClient.notify(new Error('Toast component argument error, expecting single formatted object'));
    } else {
      const {
        action,
        type,
        message,
        title,
      } = options;

      dispatch({
        type: ACTIONS.SET_MESSAGE,
        payload: {
        action, type, message, title,
        },
      });
    }
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
