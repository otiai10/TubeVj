import { Component, Input, ElementRef } from '@angular/core';
import { YouTubePlayerAPIService } from 'src/render/service/youtube/player';
import { VideoOperation, VideoOperationType } from 'src/models/video';
import { KeybindService, KeybindPayload, KeybindEventType } from 'src/render/service/keybind';

declare var YT: any;

@Component({
  selector: 'app-preview-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.sass']
})
export class PreviewTrackComponent {

  @Input() index: number;
  @Input() push: (op: VideoOperation) => void;

  private isDragOver = false;
  private player: any; // TODO: Typings
  private opacity = 0;

  constructor(private yt: YouTubePlayerAPIService, private keybind: KeybindService, private ref: ElementRef) {
    yt.ready.subscribe(() => this.initPlayer());
    this.keybind.filtered.subscribe((payload: KeybindPayload) => this.onKeybindEvent(payload));
  }

  private initPlayer() {
    this.player = new YT.Player(`player-${this.index}`, {
      width: '100%',
      height: '80%',
      playerVars: {
        loop: 1,
        autoplay: 1,
      },
      events: {
        onStateChange: ev => this.onPlayerStateChange(ev),
      },
    });
  }

  drop(ev: DragEvent) {
    // console.log(ev.dataTransfer.getData('title'));
    const id = ev.dataTransfer.getData('vid');
    console.log(id, id.trim(), id === id.trim());
    this.player.loadVideoById(id);
    this.isDragOver = false;
    this.push({type: VideoOperationType.LOAD, video: {id}, target: this.index});
  }

  /**
   * is required to implement DnD
   */
  dragover(ev: Event) {
    ev.stopPropagation();
    ev.preventDefault();
    this.isDragOver = true;
  }

  /**
   * is required to control (e.g. recover) styles.
   */
  dragleave() {
    this.isDragOver = false;
  }

  containerStyle() {
    if (!this.isDragOver) {
      return {};
    }
    return {
      backgroundColor: '#464646',
    };
  }

  private onPlayerStateChange(ev: {data: number}) {
    switch (ev.data) {
    case YT.PlayerState.PLAYING:
      const seek = this.player.getCurrentTime();
      return this.push({ type: VideoOperationType.SEEK, video: { seek }, target: this.index });
    case YT.PlayerState.ENDED:
      // Loop
      return this.player.playVideo();
    }
  }

  onFadeChange(ev) {
    this.opacity = parseInt(ev.target.value, 10) / 100;
    this.push({type: VideoOperationType.FADE, video: {opacity: this.opacity}, target: this.index});
  }

  private onKeybindEvent(payload: KeybindPayload) {
    if (payload.target !== this.index) { return; }
    if (payload.type === KeybindEventType.Toggle) {
      this.opacity = this.opacity < 0.7 ? 1 : 0;
      this.push({ type: VideoOperationType.FADE, video: { opacity: this.opacity }, target: this.index });
      // FIXME: This implementation is not recommended...
      this.ref.nativeElement.querySelector('input[type=range]').focus();
    }
  }
}
