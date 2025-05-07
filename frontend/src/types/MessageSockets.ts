export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

export interface TypingIndicator {
  username: string;
  isTyping: boolean;
}