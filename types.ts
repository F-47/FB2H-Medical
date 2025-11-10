
export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
  ERROR = 'error'
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
}

export enum ResponseType {
  TEXT = 'text',
  IMAGE = 'image'
}
