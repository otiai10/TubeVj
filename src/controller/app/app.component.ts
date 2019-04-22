import { Component } from '@angular/core';
import { YouTubePlayerAPIService } from '../service/youtube/player';

// TODO: Fix
declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  previews = [0, 1, 2, 3];

  constructor(private yt: YouTubePlayerAPIService) {
    yt.defer(window);
  }
}
