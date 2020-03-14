import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-sample-item',
    styleUrls: ['./sample-item.scss'],
    templateUrl: './sample-item.component.html'
})
export class SampleItemComponent {
    @Input() startPoint: number;
    @Input() endPoint: number | undefined;
    @Input() count: number;
}
