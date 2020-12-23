export interface TextMessage {
  id: string;
  name: string;
  body?: string;
  media?: {
    src: string;
    video: boolean;
  }
  date: string;
}
