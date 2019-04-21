import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PreviewContainerComponent } from './components/preview-container.component';
import { SearchContainerComponent } from './components/search/search-container.component';

@NgModule({
  declarations: [
    AppComponent,
    PreviewContainerComponent,
    SearchContainerComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
