import { TestBed, async } from '@angular/core/testing';
import { SearchContainerComponent } from './search-container.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { YouTubeSearchComponent } from './youtube/youtube-search.component';

describe('SaerchContainerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchContainerComponent,
        YouTubeSearchComponent,
      ],
      imports: [
        FormsModule,
        HttpClientModule,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(SearchContainerComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
