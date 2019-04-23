import { Component, Input } from '@angular/core';
import { YouTubePlayerAPIService } from 'src/service/youtube/player';
import { VideoOperation, VideoOperationType } from 'src/models/video';

declare var YT: any;

@Component({
  selector: 'app-preview-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.sass']
})
export class PreviewTrackComponent {

  @Input() index: number;
  @Input() push: (op: VideoOperation) => void;

  private isDragOver = false;
  private player: any; // TODO: Typings

  constructor(private yt: YouTubePlayerAPIService) {
    yt.ready.subscribe(() => this.initPlayer());
  }

  private initPlayer() {
    this.player = new YT.Player(`player-${this.index}`, {
      width: '100%',
      height: '80%',
    });
  }

  drop(ev: DragEvent) {
    // console.log(ev.dataTransfer.getData('title'));
    const id = ev.dataTransfer.getData('vid');
    this.player.loadVideoById(id);
    this.isDragOver = false;
    this.push({type: VideoOperationType.LOAD, video: {id}, target: this.index});
  }

  /**
   * is required to implement DnD
   */
  dragover(ev: Event) {
    ev.stopPropagation();
    ev.preventDefault();
    this.isDragOver = true;
  }

  /**
   * is required to control (e.g. recover) styles.
   */
  dragleave() {
    this.isDragOver = false;
  }

  containerStyle() {
    if (!this.isDragOver) {
      return {};
    }
    return {
      backgroundColor: '#464646',
    };
  }
}
