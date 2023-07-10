import { VideoJsPlayerOptions } from 'video.js';

export interface IPlayer {
  type: 'player';
  options: VideoJsPlayerOptions;
}
