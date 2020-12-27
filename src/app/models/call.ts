import { Track } from 'ngx-audio-player';

export interface Call {
  id: string;
  number: string;
  name: string;
  date: string;
  incoming: boolean;
  blocked: boolean;
  audio?: Track[];
}
