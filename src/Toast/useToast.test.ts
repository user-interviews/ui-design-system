import { renderHook, act } from '@testing-library/react';
import { MessageTypes } from '../Alert';
import { useToast } from '.';

const GENERATED_UUID = '1234';

jest.mock('../utils/uuid', () => (
  {
    generateUUID: () => '1234',
  }
));

describe('useToast', () => {
  test('can set a new message', () => {
    const newMessage = 'I want to say something!';
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.setMessage({
        type: 'success',
        message: newMessage,
      });
    });

    expect(result.current.messages).toEqual([{
      id: GENERATED_UUID,
      type: MessageTypes.SUCCESS,
      message: newMessage,
      action: undefined,
      title: undefined,
    }]);
  });

  test('can dismiss an existing message', () => {
    const newMessage = 'I want to say something else!';
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.setMessage({
        type: MessageTypes.SUCCESS,
        message: newMessage,
      });
    });

    expect(result.current.messages).toEqual([{
      id: GENERATED_UUID,
      type: MessageTypes.SUCCESS,
      message: newMessage,
    }]);

    act(() => {
      result.current.dismissMessage(GENERATED_UUID);
    });

    expect(result.current.messages).toEqual([]);
  });

  test('can set two messages', () => {
    const newMessages = ['I want to say', 'so many things'];
    const { result } = renderHook(() => useToast());

    newMessages.forEach(
      (message) => {
        act(() => {
          result.current.setMessage({
            type: MessageTypes.ERROR,
            message,
          });
        });
      },
    );

    expect(result.current.messages).toEqual(
      newMessages.map((message) => ({
        id: GENERATED_UUID,
        type: MessageTypes.ERROR,
        action: undefined,
        title: undefined,
        message,
      })),
    );
  });

  test('can clear all messages', () => {
    const messages = ['A new', 'message'].map(
      (message, i) => ({
          id: i.toString(),
          type: MessageTypes.SUCCESS,
          message,
        }),
    );

    const { result } = renderHook(() => useToast(messages));
    expect(result.current.messages.length).toEqual(2);

    act(() => {
      result.current.clearMessages();
    });

    expect(result.current.messages.length).toEqual(0);
  });
});
