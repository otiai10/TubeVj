import { Component, OnInit, NgZone } from '@angular/core';
import { YouTubeSearchItem } from 'src/models/youtube';
import { YouTubeDataAPIService } from 'src/render/service/youtube/api';

// TODO: Fix
declare var window: any;

@Component({
  selector: 'app-youtube-search',
  templateUrl: './youtube-search.component.html',
  styleUrls: ['./youtube-search.component.sass']
})
export class YouTubeSearchComponent implements OnInit {

  query = '';
  items: YouTubeSearchItem[] = [];
  authenticated = false;

  constructor(private zone: NgZone, private youtube: YouTubeDataAPIService) {}

  ngOnInit() {
    this.youtube.authenticated.subscribe(() => {
      this.zone.run(() => this.authenticated = true);
    });
  }

  keyup(ev) {
    if (ev.key === 'Enter') {
      this.search();
    }
  }

  search() {
    this.youtube.search(this.query).subscribe(response => {
      this.items = response.items;
    });
  }

  drag(ev: DragEvent, item: YouTubeSearchItem) {
    ev.dataTransfer.setData('vid', item.id.videoId);
    ev.dataTransfer.setData('title', item.snippet.title);
  }

  startAuthentication() {
    this.youtube.authenticate();
  }

}
