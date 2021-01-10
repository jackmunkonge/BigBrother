import { Track } from 'ngx-audio-player';

export interface Call {
  id?: string;
  number?: string;
  name?: string;
  date?: Date;
  incoming?: boolean;
  audio?: Track[];
}
