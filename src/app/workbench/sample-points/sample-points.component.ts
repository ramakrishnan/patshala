import { Component, Input } from '@angular/core';
import { PlayerService } from '@app/service/player.service';

@Component({
    selector: 'app-sample-points',
    templateUrl: './sample-points.component.html'
})
export class SamplePointsComponent {
    constructor(public player: PlayerService) {}
    @Input() samples: number[] = [0];

    onIncrease(event: { index: number }) {
        this.samples[event.index] = this.samples[event.index] + 0.100;
    }

    onDecrease(event: { index: number }) {
        this.samples[event.index] = this.samples[event.index] - 0.100;
    }

    onPlayPortion(index: number) {
        this.player.playBetween( this.samples[index - 1],  this.samples[index]);
    }

    onDeletePortion(index: number) {
        this.samples.splice((index - 1), 1);
    }
}
