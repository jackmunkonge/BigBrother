interface Message {
  id?: string;
  incoming?: boolean;
  body?: string;
  media?: {
    src?: string;
    video?: boolean;
  }
  date?: Date;
}

export interface Chat {
  id?: string;
  messages?: Message[];
}
