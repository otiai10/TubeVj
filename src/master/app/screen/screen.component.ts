import { Component, Input, EventEmitter, OnInit } from '@angular/core';
import { YouTubePlayerAPIService } from 'src/service/youtube/player';
import { VideoOperation, VideoOperationType } from 'src/models/video';
// import { VideoOperation, VideoOperationType } from 'src/models/video';

declare var YT: any;

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.sass']
})
export class ScreenComponent implements OnInit {

  @Input() index: number;
  @Input() operation: EventEmitter<VideoOperation>;

  private player: any; // TODO: Typings
  private states: number[] = [undefined, undefined];

  constructor(private yt: YouTubePlayerAPIService) {
    yt.ready.subscribe(() => this.initPlayer());
  }

  ngOnInit() {
    this.operation.subscribe(op => this.onOperationReceived(op));
  }

  private initPlayer() {
    this.player = new YT.Player(`player-${this.index}`, {
      width: '100%',
      height: '100%',
      events: {
        onStateChange: ev => this.onPlayerStateChange(ev),
      },
      playerVars: {
        loop: 1,
        autoplay: 1,
        control: 0,
      }
    });
  }

  private onOperationReceived(op: VideoOperation) {
    if (op.target !== this.index) {
      return;
    }
    switch (op.type) {
    case VideoOperationType.FADE:
      return this.fade(op.video.opacity);
    case VideoOperationType.LOAD:
    default:
      return this.player.loadVideoById(op.video.id);
    }
  }

  private onPlayerStateChange(ev: {data: number}) {
    switch (ev.data) {
    case YT.PlayerState.ENDED:
      return this.player.playVideo();
    }
  }

  private fade(opacity: number) {
    this.player.a.style.opacity = opacity;
  }

}
