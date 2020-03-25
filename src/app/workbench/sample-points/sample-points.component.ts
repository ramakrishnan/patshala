import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PlayerService } from '@app/service/player.service';
import { IStepInfo, ISteps } from '../workbench.component';

@Component({
    selector: 'app-sample-points',
    templateUrl: './sample-points.component.html'
})
export class SamplePointsComponent {
    public currentStep = 0;
    public navList = ['step-1'];
    @Input() samples: IStepInfo[];
    @Output() addNewStep: EventEmitter<null> = new EventEmitter<null>();
    @Output() loadState: EventEmitter<number> = new EventEmitter<number>();
    constructor(public player: PlayerService) {
    }

    onIncrease(event: { index: number }) {
        let { time } = this.samples[event.index];
        time += 0.100;
        this.samples[event.index].time = time;
    }

    onDecrease(event: { index: number }) {
        let { time } = this.samples[event.index];
        time -= 0.100;
        this.samples[event.index].time = time;
    }

    onPlayPortion(index: number) {
        const startTime = this.samples[index - 1].time;
        for (let i = index; i < this.samples.length; i++ ) {
             if (!this.samples[i].silence) {
                const stopTime = this.samples[i].time;
                this.player.playBetween( startTime,  stopTime);
                break;
             }
        }
    }

    onDeletePortion(index: number) {
        this.samples.splice((index - 1), 1);
    }

    onMutePortion(index: number) {
        const { silence } = this.samples[index - 1];
        this.samples[index - 1].silence = !silence;
    }

    newStep() {
        this.navList.push('step-2');
        this.addNewStep.emit();
    }

    switchStep(event) {
        this.loadState.emit(this.currentStep);
    }
}
