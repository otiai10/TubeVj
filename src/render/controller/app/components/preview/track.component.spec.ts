import { TestBed, async } from '@angular/core/testing';
import { PreviewTrackComponent } from './track.component';
import { FaderComponent } from '../parts/fader/fader.component';

describe('PreviewContainerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PreviewTrackComponent,
        FaderComponent,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PreviewTrackComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
