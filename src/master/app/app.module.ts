import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { YouTubePlayerAPIService } from 'src/service/youtube/player';
import { ScreenComponent } from './screen/screen.component';

@NgModule({
  declarations: [
    AppComponent,
    ScreenComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    YouTubePlayerAPIService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
