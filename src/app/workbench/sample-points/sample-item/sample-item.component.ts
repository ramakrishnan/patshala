import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-sample-item',
    styleUrls: ['./sample-item.scss'],
    templateUrl: './sample-item.component.html'
})
export class SampleItemComponent {
    @Input() startPoint: number;
    @Input() endPoint: number | undefined;
    @Input() index: number;
    @Output() decrease: EventEmitter<{ index: number }> = new EventEmitter<{ index: number }>();
    @Output() increase: EventEmitter<{ index: number }> = new EventEmitter<{ index: number }>();
    @Output() playPortion: EventEmitter<number> = new EventEmitter<number>();
    @Output() deletePortion: EventEmitter<number> = new EventEmitter<number>();
    @Output() mutePortion: EventEmitter<number> = new EventEmitter<number>();

    decreaseTime() {
        this.decrease.emit({ index: this.index - 1 });
    }
    increaseTime() {
        this.increase.emit({ index: this.index });
    }
    playSection() {
        this.playPortion.emit(this.index);
    }
    deleteSection() {
        this.deletePortion.emit(this.index);
    }
    muteSection() {
        this.mutePortion.emit(this.index);
    }
}
