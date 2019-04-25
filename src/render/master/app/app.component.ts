import { Component, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { YouTubePlayerAPIService } from 'src/render/service/youtube/player';
import { VideoOperation } from 'src/models/video';

// FIXME:
//    - https://github.com/angular/angular-cli/issues/8272
//    - https://github.com/electron/electron/issues/10167
// import { ipcRenderer } from 'electron';

// TODO: Fix
declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  screens = Array(environment.screens).fill(0).map((_, i) => i);
  @Output() operation: EventEmitter<VideoOperation> = new EventEmitter();

  constructor(private yt: YouTubePlayerAPIService) {
    this.yt.defer(window);
    const ipcRenderer: any = window.ipcRenderer;
    ipcRenderer.on('video', (event, arg) => this.onVideoOperationReceive(arg as VideoOperation));
  }

  onVideoOperationReceive(op: VideoOperation) {
    // console.log('Operation Receive:', op);
    this.operation.emit(op);
  }
}
