interface Message {
  id: string;
  incoming: boolean;
  body: string;
  date: string;
}

export interface Chat {
  messages: Message[];
}
