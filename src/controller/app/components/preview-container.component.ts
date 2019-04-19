import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-preview-container',
  templateUrl: './preview-container.component.html',
  styleUrls: ['./preview-container.component.sass']
})
export class PreviewContainerComponent {
  @Input() index: number;
}
