interface Message {
  id: string;
  incoming: boolean;
  body?: string;
  media?: {
    src: string;
    video: boolean;
  }
  date: string;
}

export interface Chat {
  id: string;
  messages: Message[];
}
