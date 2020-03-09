import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-producer-controls',
    templateUrl: './producer-controls.component.html'
})
export class ProducerControlsComponent {
    @Input() showControls: boolean;
}
