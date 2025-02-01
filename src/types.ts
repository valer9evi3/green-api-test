export interface Message {
  id: string;
  text: string;
  timestamp: number;
  isOutgoing: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  idInstance: string;
  apiTokenInstance: string;
}

export interface ChatState {
  messages: Message[];
  recipientPhone: string;
  recipientName: string;
  isPhoneSet: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  chat: ChatState;
}

export interface APIResponse {
  receiptId: number;
  body: {
    typeWebhook: string;
    instanceData: {
      idInstance: number;
      wid: string;
      typeInstance: string;
    };
    timestamp: number;
    idMessage: string;
    senderData: {
      chatId: string;
      chatName: string;
      sender: string;
      senderName: string;
    };
    messageData: {
      typeMessage: string;
      extendedTextMessageData?: {
        text: string;
      };
      textMessageData?: {
        textMessage: string;
      };
    };
  };
}
