import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PreviewTrackComponent } from './components/preview/track.component';
import { SearchContainerComponent } from './components/search/search-container.component';

@NgModule({
  declarations: [
    AppComponent,
    PreviewTrackComponent,
    SearchContainerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
