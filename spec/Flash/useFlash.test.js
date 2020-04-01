import { renderHook, act } from '@testing-library/react-hooks';
import { MessageTypes, useFlash } from 'src/Flash';

const GENERATED_UUID = '1234';

jest.mock('uuid', () => (
  {
    v4: () => '1234',
  }
));

describe('useFlash', () => {
  test('can set a new message', () => {
    const newMessage = 'I want to say something!';
    const { result } = renderHook(() => useFlash());

    act(() => {
      result.current.setMessage(MessageTypes.SUCCESS, newMessage);
    });

    expect(result.current.messages).toEqual([{
      id: GENERATED_UUID,
      type: MessageTypes.SUCCESS,
      message: newMessage,
    }]);
  });

  test('can dismiss an existing message', () => {
    const newMessage = 'I want to say something else!';
    const { result } = renderHook(() => useFlash());

    act(() => {
      result.current.setMessage(MessageTypes.SUCCESS, newMessage);
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
    const { result } = renderHook(() => useFlash());

    newMessages.forEach(
      (message) => {
        act(() => {
          result.current.setMessage(MessageTypes.ERROR, message);
        });
      },
    );

    expect(result.current.messages).toEqual(
      newMessages.map((message) => ({
        id: GENERATED_UUID,
        type: MessageTypes.ERROR,
        message,
      })),
    );
  });

  test('can clear all messages', () => {
    const messages = ['A new', 'message'].map(
      (msg, i) => ({
          id: i,
          type: MessageTypes.SUCCESS,
          message: msg,
        }),
    );

    const { result } = renderHook(() => useFlash(messages));
    expect(result.current.messages.length).toEqual(2);

    act(() => {
      result.current.clearMessages();
    });

    expect(result.current.messages.length).toEqual(0);
  });
});
