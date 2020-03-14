import { Component, ViewChild, ElementRef } from '@angular/core';
import { PlayerService, IPlayerState } from '@app/service/player.service';
@Component({
    selector: 'app-workbench',
    styleUrls: ['./workbench.scss'],
    templateUrl: './workbench.component.html'
})
export class WorkbenchComponent {
    @ViewChild('fileSource') fileSource: ElementRef;
    public showControls = false;
    public samples = [];
    constructor(public player: PlayerService) {
        this.player.onStateChange.subscribe((state: IPlayerState) => {
            if (state.ready) {
                this.showControls = true;
            }
        });
    }

    onPausePlayer(event) {
        event.play ? this.player.play() : this.player.pause();
    }

    onNewSamplePoint() {
        this.player.pause();
        const { currentTime } = this.player.getStatus();
        this.samples.push(currentTime);
        this.player.play();
    }

    onResetSamples() {
        this.player.stop();
        this.samples = [0];
    }
    loadSource() {
        this.player.loadFile(this.fileSource.nativeElement.files[0]);
    }
}
