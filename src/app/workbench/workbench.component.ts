import { Component, ViewChild, ElementRef } from '@angular/core';
import { PlayerService, IPlayerState } from '@app/service/player.service';
import { RecorderService } from '@app/service/recorder.service';

export interface IStepInfo {
    time: number;
    silence: boolean;
}
export interface ISteps {
    'step-1': IStepInfo[];
    'step-2'?: IStepInfo[];
    'step-3'?: IStepInfo[];
}

@Component({
    selector: 'app-workbench',
    styleUrls: ['./workbench.scss'],
    templateUrl: './workbench.component.html'
})
export class WorkbenchComponent {
    @ViewChild('fileSource') fileSource: ElementRef;
    public showControls = false;
    public currentStep = 1;
    public steps: ISteps = { 'step-1': []};
    public samples: IStepInfo[] = [{
        time: 0,
        silence: false
    }];
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

    onNewSamplePoint() {
        this.samples.push({
            time: this.player.getStatus().currentTime,
            silence: false
        });
    }

    onRecordStop() {
        const audioBlob = this.recorder.downloadUrl();
        this.player.loadBlob(audioBlob);
    }

    onResetSamples() {
        this.player.stop();
        this.samples = [{
            time: 0,
            silence: false
        }];
    }

    loadSource() {
        this.player.loadFile(this.fileSource.nativeElement.files[0]);
    }

    onPlayBackChange(speed) {
        this.player.setPlayBackRate(speed);
    }

    onAddNewStep() {
        this.steps[`step-${this.currentStep}`] = this.samples;
        this.currentStep += 1;
        this.steps[`step-${this.currentStep}`] = this.samples;
    }

    onLoadState(step) {
        this.samples = this.steps[`step-${step}`];
    }
}
