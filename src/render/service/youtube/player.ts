import { Output, EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class YouTubePlayerAPIService {

  @Output() ready: EventEmitter<any> = new EventEmitter();

  defer(scope: any) {
    scope.onYouTubeIframeAPIReady = () => this.ready.emit(true);
  }

}
