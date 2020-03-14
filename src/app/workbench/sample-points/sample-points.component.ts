import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-sample-points',
    templateUrl: './sample-points.component.html'
})
export class SamplePointsComponent {
    @Input() samples: number[] = [0];
}
