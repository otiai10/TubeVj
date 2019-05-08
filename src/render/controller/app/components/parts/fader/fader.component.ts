import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fader',
  templateUrl: './fader.component.html',
  styleUrls: ['./fader.component.sass']
})
export class FaderComponent {

  @Input() value = 0;

  @Input() min =   0;
  @Input() max = 100;
  @Input() step =  1;

  @Input() onFixed = (ev) => {};
  @Input() onSlide = (ev) => {};
}
