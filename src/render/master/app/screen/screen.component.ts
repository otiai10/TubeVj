import { Component, Input, EventEmitter, OnInit } from '@angular/core';
import { YouTubePlayerAPIService } from 'src/render/service/youtube/player';
import { VideoOperation, VideoOperationType } from 'src/models/video';
import { environment } from '../../../../environments/environment';

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

  constructor(private youtube: YouTubePlayerAPIService) {
    this.youtube.ready.subscribe(() => this.initPlayer());
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
      return this.player.a.style.opacity = op.video.opacity;
    case VideoOperationType.SEEK:
      return this.player.seekTo(op.video.seek);
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

  private style() {
    return {
      zIndex: environment.screens - this.index,
    };
  }

}
