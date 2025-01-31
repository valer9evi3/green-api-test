import { PhoneInput } from './components/PhoneInput';
import { ChatWindow } from './components/ChatWindow';
import { useSelector } from 'react-redux';
import { RootState } from '@/types';
import { memo } from 'react';

function Chat() {
  const { isPhoneSet } = useSelector((state: RootState) => state.chat);
  return <>{!isPhoneSet ? <PhoneInput /> : <ChatWindow />}</>;
}

export default memo(Chat);
