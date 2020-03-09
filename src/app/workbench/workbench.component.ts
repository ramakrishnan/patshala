import { Component, ViewChild, ElementRef } from '@angular/core';
import { PlayerService, IPlayerState } from '@app/service/player.service';
@Component({
    selector: 'app-workbench',
    templateUrl: './workbench.component.html'
})
export class WorkbenchComponent {
    @ViewChild('fileSource') fileSource: ElementRef;
    public showControls = false;
    constructor(public player: PlayerService) {
        this.player.onStateChange.subscribe((state: IPlayerState) => {
            if (state.ready) {
                this.showControls = true;
            }
        });
    }
    loadSource() {
        this.player.loadFile(this.fileSource.nativeElement.files[0]);
    }
}
