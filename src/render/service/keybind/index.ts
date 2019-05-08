import { Output, EventEmitter, Injectable } from '@angular/core';

export enum KeybindEventType {
  Toggle = 'toggle',
}

export interface KeybindPayload {
  target?: number;
  type: KeybindEventType;
  event?: KeyboardEvent;
}

export interface KeybindSpec {
  key: string;
  payload: KeybindPayload;
}

@Injectable({
  providedIn: 'root',
})
export class KeybindService {

  @Output() toggle: EventEmitter<boolean> = new EventEmitter();
  @Output() filtered: EventEmitter<KeybindPayload> = new EventEmitter();

  private enabled = true;

  // FIXME: This should NOT be here
  private specs: KeybindSpec[] = [
    { key: 'a', payload: { target: 0, type: KeybindEventType.Toggle } },
    { key: 's', payload: { target: 1, type: KeybindEventType.Toggle } },
    { key: 'd', payload: { target: 2, type: KeybindEventType.Toggle } },
    { key: 'f', payload: { target: 3, type: KeybindEventType.Toggle } },
  ];

  enable() {
    this.enabled = true;
    this.toggle.emit(this.enabled);
  }

  disable() {
    this.enabled = false;
    this.toggle.emit(this.enabled);
  }

  on(ev: KeyboardEvent) {
    if (!this.enabled) { return; }
    for (const spec of this.specs) {
      if (spec.key === ev.key) {
        this.filtered.emit({ ...spec.payload, event: ev });
      }
    }
  }
}
