import { useCallback, useReducer } from 'react';
import { v4 as generateUUID } from 'uuid';
import { AlertType as AlertTypeEnum } from '../Alert';

const ACTIONS = {
  CLEAR_MESSAGES: 'CLEAR_MESSAGES',
  DISMISS_MESSAGE: 'DISMISS_MESSAGE',
  SET_MESSAGE: 'SET_MESSAGE',
} as const;

type Action = {
  content: string;
  url: string;
}

type AlertType = typeof AlertTypeEnum[keyof typeof AlertTypeEnum];

export type SetMessageHandler = (
  arg0: {
    action?: Action;
    type: AlertType;
    title?: string;
    message: string;
  }
) => void;

export type Message = {
  id: string;
  type: AlertType;
  title?: string;
  message?: string;
  action?: Action;
}

const createMessage = (
  type: AlertType,
  title?: string,
  message?: string,
  action?: Action,
): Message => ({
  id: generateUUID(),
  type,
  title,
  message,
  action,
});

const messagesReducer = (
  state: Message[],
  args: (
    {
      type: typeof ACTIONS.SET_MESSAGE;
      payload: {
        type: AlertType;
        title?: string;
        message?: string;
        action?: Action
      }
    } | {
      type: typeof ACTIONS.DISMISS_MESSAGE;
      payload: {
        messageId: string;
      }
    } | {
      type: typeof ACTIONS.CLEAR_MESSAGES
    }
  ),
) => {
  switch (args.type) {
    case ACTIONS.SET_MESSAGE:
      return [
        ...state,
        createMessage(
          args.payload.type,
          args.payload?.title,
          args.payload?.message,
          args.payload?.action,
        ),
      ];
    case ACTIONS.CLEAR_MESSAGES:
      return [];
    case ACTIONS.DISMISS_MESSAGE:
      return state.filter((message) => message.id !== args.payload.messageId);
    default:
      return state;
  }
};

const useToast = (initialMessages: Message[] = []) => {
  const [messages, dispatch] = useReducer(messagesReducer, initialMessages);

  const clearMessages = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_MESSAGES });
  }, []);

  const setMessage = useCallback((
    arg0: AlertType | {
      action?: Action;
      type: AlertType;
      title?: string;
      message: string;
    },
    arg1?: string,
    arg2?: Action,
    arg3?: string,
  ) => {
    if (typeof arg0 === 'string') {
      dispatch({
        type: ACTIONS.SET_MESSAGE,
        payload: {
          type: arg0,
          message: arg1 || undefined,
          action: arg2 || undefined,
          title: arg3 || undefined,
        },
      });
    } else {
      const {
        action,
        type,
        message,
        title,
      } = arg0;

      dispatch({
        type: ACTIONS.SET_MESSAGE,
        payload: {
          action,
          type,
          message,
          title,
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
