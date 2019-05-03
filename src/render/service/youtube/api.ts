import { Injectable } from '@angular/core';
import { YouTubeSearchResponse } from '../../../models/youtube';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class YouTubeDataAPIService {

  // YAGNI: No need to be observable
  // @Output() response: EventEmitter<YouTubeSearchResponse> = new EventEmitter();

  accessToken = environment.YOUTUBE_API_KEY;
  refreshToken: string;
  tokenType: string;

  constructor(private http: HttpClient) {}

  authenticate() {

  }

  search(query: string = '') {
    if (!query) { return; }
    const url = new URL('https://www.googleapis.com/youtube/v3/search');
    url.searchParams.set('q', query.trim());
    url.searchParams.set('part', 'snippet');
    let headers = {};
    if (this.tokenType) {
      headers = { Authorization: `${this.tokenType} ${this.accessToken}` };
    } else {
      url.searchParams.set('key', this.accessToken);
    }
    return this.http.get<YouTubeSearchResponse>(url.toString(), { headers });
  }

}
