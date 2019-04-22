import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PreviewContainerComponent } from './components/preview-container.component';
import { SearchContainerComponent } from './components/search/search-container.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PreviewContainerComponent,
        SearchContainerComponent,
      ],
      imports: [
        FormsModule,
        HttpClientModule,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'Controller - Tube.Vj'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('Controller - Tube.Vj');
  // });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to Controller - Tube.Vj!');
  // });
});
