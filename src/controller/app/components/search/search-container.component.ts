import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment';
import { EventHandlerVars } from '@angular/compiler/src/compiler_util/expression_converter';

declare interface YouTubeThumbnail {
  width: number;
  height: number;
  url: string;
}

declare interface YouTubeVideoSnippet {
  title: string;
  channelId: string;
  channelTitle: string;
  description: string;
  liveBroadcastContent: string;
  publishedAt: Date;
  thumbnails: {
    default: YouTubeThumbnail;
    high: YouTubeThumbnail;
    medium: YouTubeThumbnail;
  };
}

declare interface YouTubeSearchItem {
  etag: string;
  kind: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: YouTubeVideoSnippet;
}

declare interface YouTubeSearchResponse {
  etag: string;
  kind: string;
  nextPageToken: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
  regionCode: string;
  items: YouTubeSearchItem[];
}

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.sass']
})
export class SearchContainerComponent {

  query = '初音ミク';
  items: YouTubeSearchItem[] = [];

  constructor(private http: HttpClient) { }

  keyup(ev) {
    if (ev.key === 'Enter') {
      this.search();
    }
  }

  search() {
    // TODO: Create Service Layer!!!!
    const url = new URL('https://www.googleapis.com/youtube/v3/search');
    url.searchParams.set('key', env.YOUTUBE_API_KEY);
    url.searchParams.set('q', this.query.trim());
    url.searchParams.set('part', 'snippet');
    this.http.get<YouTubeSearchResponse>(url.toString()).subscribe(response => {
      this.items = response.items;
    });
  }

  drag(ev: DragEvent, item: YouTubeSearchItem) {
    ev.dataTransfer.setData('vid', item.id.videoId);
    ev.dataTransfer.setData('title', item.snippet.title);
  }
}
