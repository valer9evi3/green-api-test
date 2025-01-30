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
  isPhoneSet: boolean;
  error: string | null;
}
