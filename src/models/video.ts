
export declare interface Video {
  id?: string;
  seek?: number;
  opacity?: number;
}

export enum VideoOperationType {
  LOAD = 'load',
  SEEK = 'seek',
  FADE = 'fade',
}

export declare interface VideoOperation {
  type: VideoOperationType;
  video: Video;
  target: number;
}
