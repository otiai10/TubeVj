import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-preview-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.sass']
})
export class PreviewTrackComponent {
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
