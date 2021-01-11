interface Message {
  id?: string;
  incoming?: boolean;
  body?: string;
  photo?: {
    src?: string;
  }
  date?: Date;
}

export interface Chat {
  id?: string;
  messages?: Message[];
}
