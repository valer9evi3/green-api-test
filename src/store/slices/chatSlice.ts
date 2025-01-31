import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatState, Message } from '../../types';

const initialState: ChatState = {
  messages: [],
  recipientPhone: '',
  recipientName: '',
  isPhoneSet: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setRecipientPhone: (state, action: PayloadAction<string>) => {
      state.recipientPhone = action.payload;
      state.isPhoneSet = true;
    },
    setRecipientName: (state, action: PayloadAction<string>) => {
      state.recipientName = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetChat: (state) => {
      state.messages = [];
      state.recipientPhone = '';
      state.isPhoneSet = false;
      state.error = null;
    },
  },
});

export const {
  setRecipientPhone,
  addMessage,
  setError,
  resetChat,
  setRecipientName,
} = chatSlice.actions;
export default chatSlice.reducer;
