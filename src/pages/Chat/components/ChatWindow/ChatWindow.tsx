import { memo, useEffect, useRef, useState } from 'react';
import Send from '@/assets/icons/send.svg?react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { receiveMessage, sendMessage } from '@/api';
import { logout } from '@/store/slices/authSlice';
import {
  addMessage,
  setRecipientName,
  setError,
  resetChat,
} from '@/store/slices/chatSlice';
import { formatPhoneNumber } from '@/utils';
import { LanguageSwitcher } from '@/widgets/LanguageSwitcher';
import { RootState } from '@/store';

function ChatWindow() {
  const [newMessage, setNewMessage] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { idInstance, apiTokenInstance } = useSelector(
    (state: RootState) => state.auth
  );
  const { messages, recipientPhone, recipientName, isPhoneSet, error } =
    useSelector((state: RootState) => state.chat);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isPhoneSet) return;

    const pollMessages = async () => {
      try {
        const notification = await receiveMessage(idInstance, apiTokenInstance);
        const textMessage = notification?.body?.messageData
          ?.extendedTextMessageData
          ? notification?.body?.messageData?.extendedTextMessageData?.text
          : notification?.body?.messageData?.textMessageData
          ? notification.body.messageData.textMessageData.textMessage
          : '';
        if (
          notification &&
          notification.body?.typeWebhook !== 'outgoingAPIMessageReceived' &&
          textMessage !== ''
        ) {
          dispatch(
            addMessage({
              id: notification.body.idMessage,
              text: textMessage,
              timestamp: notification.body.timestamp * 1000,
              isOutgoing: false,
            })
          );
          dispatch(setRecipientName(notification.body.senderData.senderName));
          dispatch(setError(null));
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : t('errors.receivingMessage');
        if (errorMessage !== 'Error receiving message: Request timeout') {
          dispatch(setError(errorMessage));
        }
      }
    };

    const interval = setInterval(
      pollMessages,
      +import.meta.env.VITE_DELAY_TIME
    );
    return () => clearInterval(interval);
  }, [isPhoneSet, idInstance, apiTokenInstance, dispatch, t]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await sendMessage(
        idInstance,
        apiTokenInstance,
        recipientPhone,
        newMessage
      );
      dispatch(
        addMessage({
          id: Date.now().toString(),
          text: newMessage,
          timestamp: Date.now(),
          isOutgoing: true,
        })
      );
      setNewMessage('');
      dispatch(setError(null));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : t('errors.sendingMessage');
      dispatch(setError(errorMessage));
    }
  };

  const handleLogout = () => {
    dispatch(resetChat());
    dispatch(logout());
  };

  return (
    <div className='flex flex-col h-screen bg-gray-100'>
      <div className='bg-green-600 p-4 text-white flex justify-between items-center'>
        <div className='flex items-center space-x-4'>
          <h2 className='font-bold'>
            {t('chat.chatWith')}{' '}
            {recipientName !== ''
              ? recipientName
              : formatPhoneNumber(recipientPhone)}
          </h2>
          <LanguageSwitcher />
        </div>
        <button
          onClick={handleLogout}
          className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors'
        >
          {t('chat.logout')}
        </button>
      </div>

      {error && (
        <div
          className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
          role='alert'
        >
          <span className='block sm:inline'>{error}</span>
        </div>
      )}

      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isOutgoing ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.isOutgoing
                  ? 'bg-green-100 text-gray-800'
                  : 'bg-white text-gray-800'
              }`}
            >
              <p>{message.text}</p>
              <p className='text-xs text-gray-500 mt-1'>
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className='p-4 bg-white'>
        <div className='flex space-x-2'>
          <input
            type='text'
            value={newMessage}
            onChange={handleChangeInput}
            placeholder={t('chat.messagePlaceholder')}
            className='flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
          />
          <button
            type='submit'
            className='bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors'
          >
            <Send className='w-6 h-6 fill-white' />
          </button>
        </div>
      </form>
    </div>
  );
}

export default memo(ChatWindow);
