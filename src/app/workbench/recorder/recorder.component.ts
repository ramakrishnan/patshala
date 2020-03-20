import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { IRecorderState, RecorderService } from '@app/service/recorder.service';


@Component({
    selector: 'app-recorder',
    styleUrls: ['./recorder.scss'],
    templateUrl: './recorder.component.html'
})
export class RecorderComponent implements OnInit {
    @Output() newSample: EventEmitter<number> = new EventEmitter<number>();
    @Output() recordStop = new EventEmitter();
    public recorderState: IRecorderState = {
        ready: false,
        recording: false,
        stopped: true,
    };
    public startTime: any = new Date();
    constructor(private recorder: RecorderService) {
        this.recorder.onStateChange.subscribe((state: IRecorderState) => {
            this.recorderState = state;
        });
    }

    async ngOnInit() {
        await this.recorder.create();
    }

    record() {
        this.recorder.start();
        this.startTime = new Date();
    }

    pause() {
        this.recorder.pause();
    }

    async stop() {
        await this.recorder.stop();
        this.recordStop.emit();
    }

    download(event) {
        event.target.href = '';
        const link = this.recorder.downloadUrl();
        event.target.href = link;
        event.target.download = 'audio.wav';
    }

    sample() {
        const currentTime: any = new Date();
        this.newSample.emit(currentTime - this.startTime);
    }
}
