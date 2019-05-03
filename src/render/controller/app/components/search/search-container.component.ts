import { Component } from '@angular/core';

enum Tab {
  Favs = 'Favs',
  YouTube = 'YouTube',
}

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.sass']
})
export class SearchContainerComponent {

  tabs = [Tab.Favs, Tab.YouTube];
  active = Tab.Favs;

  changeTab(tab: Tab) {
    this.active = tab;
  }

}
