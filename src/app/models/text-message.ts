export interface TextMessage {
  id: string;
  name: string;
  body: string;
  date: string;
  media?: {
    photo?: string;
    video?: string;
  }
}
