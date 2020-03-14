import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-producer-controls',
    styleUrls: ['./producer-controls.scss'],
    templateUrl: './producer-controls.component.html'
})
export class ProducerControlsComponent {
    @Input() showControls: boolean;
    @Output() pausePlay: EventEmitter<{ play: boolean}> = new EventEmitter<{ play: boolean}>();
    @Output() newSample: EventEmitter<null> = new EventEmitter<null>();
    @Output() resetSample: EventEmitter<null> = new EventEmitter<null>();
    playing = false;

    onPlayPause(event: InputEvent) {
        this.playing = !this.playing;
        const button = event.target as HTMLElement;
        const buttonCaption = this.playing ? 'Pause' : 'Play';
        button.textContent = buttonCaption;
        this.pausePlay.emit({ play: this.playing });
    }

    onSample() {
        this.newSample.emit(null);
    }

    onResetSample() {
        this.resetSample.emit(null);
    }
}
