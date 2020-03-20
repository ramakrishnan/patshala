import { Component, ViewChild, ElementRef } from '@angular/core';
import { PlayerService, IPlayerState } from '@app/service/player.service';
import { RecorderService } from '@app/service/recorder.service';
@Component({
    selector: 'app-workbench',
    styleUrls: ['./workbench.scss'],
    templateUrl: './workbench.component.html'
})
export class WorkbenchComponent {
    @ViewChild('fileSource') fileSource: ElementRef;
    public showControls = false;
    public samples = [0];
    constructor(public player: PlayerService, public recorder: RecorderService) {
        this.player.onStateChange.subscribe((state: IPlayerState) => {
            if (state.ready) {
                this.showControls = true;
            }
        });
    }

    onPausePlayer(event) {
        event.play ? this.player.play() : this.player.pause();
    }

    onNewSamplePoint(time) {
        this.samples.push(time);
        this.player.play();
    }

    onRecordStop() {
        const audioBlob = this.recorder.downloadUrl();
        this.player.loadBlob(audioBlob);
    }

    onResetSamples() {
        this.player.stop();
        this.samples = [0];
    }
    loadSource() {
        this.player.loadFile(this.fileSource.nativeElement.files[0]);
    }
}
