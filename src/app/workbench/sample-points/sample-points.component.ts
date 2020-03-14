import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-sample-points',
    templateUrl: './sample-points.component.html'
})
export class SamplePointsComponent {
    @Input() samples: number[] = [0];

    onIncrease(event: { index: number }) {
        this.samples[event.index] = this.samples[event.index] + 0.100;
    }

    onDecrease(event: { index: number }) {
        this.samples[event.index] = this.samples[event.index] - 0.100;
    }
}
