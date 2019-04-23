import { Component, Input, EventEmitter, OnInit } from '@angular/core';
import { YouTubePlayerAPIService } from 'src/service/youtube/player';
import { VideoOperation } from 'src/models/video';
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

  constructor(private yt: YouTubePlayerAPIService) {
    yt.ready.subscribe(() => this.initPlayer());
  }

  ngOnInit() {
    this.operation.subscribe(op => this.onOperationReceived(op));
  }

  private initPlayer() {
    this.player = new YT.Player(`player-${this.index}`, {
      width: '100%',
      height: '80%',
    });
  }

  private onOperationReceived(op: VideoOperation) {
    console.log(this.index, op.target, this.index === op.target);
  }

}
