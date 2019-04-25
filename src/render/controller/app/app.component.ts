import { Component } from '@angular/core';
import { YouTubePlayerAPIService } from '../../service/youtube/player';

import { VideoOperation } from '../../../models/video';
import { environment } from '../../../environments/environment';

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

  tracks = Array(environment.screens).fill(0).map((_, i) => i);

  constructor(private yt: YouTubePlayerAPIService) {
    yt.defer(window);
  }

  push(op: VideoOperation) {
    const ipcRenderer = window.ipcRenderer;
    ipcRenderer.send('video', op);
  }

}
