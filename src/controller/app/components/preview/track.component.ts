import { Component, Input } from '@angular/core';
import { YouTubePlayerAPIService } from 'src/controller/service/youtube/player';

declare var YT: any;

@Component({
  selector: 'app-preview-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.sass']
})
export class PreviewTrackComponent {

  @Input() index: number;

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
    const videoId = ev.dataTransfer.getData('vid');
    this.player.loadVideoById(videoId);
    this.isDragOver = false;
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
