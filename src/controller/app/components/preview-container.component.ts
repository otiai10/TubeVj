import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-preview-container',
  templateUrl: './preview-container.component.html',
  styleUrls: ['./preview-container.component.sass']
})
export class PreviewContainerComponent {
  @Input() index: number;

  drop(ev: DragEvent) {
    console.log(ev.dataTransfer.getData('vid'));
    console.log(ev.dataTransfer.getData('title'));
  }

  /**
   * is required to implement DnD
   */
  dragover(ev: Event) {
    ev.stopPropagation();
    ev.preventDefault();
  }
}
