import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PreviewTrackComponent } from './components/preview/track.component';
import { SearchContainerComponent } from './components/search/search-container.component';
import { YouTubePlayerAPIService } from 'src/render/service/youtube/player';
import { FaderComponent } from './components/parts/fader/fader.component';
import { YouTubeSearchComponent } from './components/search/youtube/youtube-search.component';
import { YouTubeDataAPIService } from 'src/render/service/youtube/api';

@NgModule({
  declarations: [
    AppComponent,
    PreviewTrackComponent,
    SearchContainerComponent,
    YouTubeSearchComponent,
    FaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    YouTubePlayerAPIService,
    YouTubeDataAPIService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
