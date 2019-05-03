import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { YouTubeSearchComponent } from './youtube-search.component';

describe('YouTubeSearchComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        YouTubeSearchComponent,
      ],
      imports: [
        FormsModule,
        HttpClientModule,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(YouTubeSearchComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
