import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare var MediaRecorder: any;
export interface IRecorderState {
    ready: boolean;
    recording: boolean;
    stopped: boolean;
}
@Injectable({
    providedIn: 'root'
})
export class RecorderService {
    public recordTimeSlot = 1000;
    public recorder: any;
    public recorderState: IRecorderState = {
        ready: false,
        recording: false,
        stopped: false,
    };
    public recordStream = [];
    public onStateChange = new Subject();
    public blobCaptureInterval;
    async create() {
        if (navigator.mediaDevices) {
            console.log('getUserMedia supported.');
            this.resetPlayerState();
            const constraints = { audio: true };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            this.recorder = new MediaRecorder(stream);
            this.recorder.ondataavailable = (event) => this.onDataAvailable(event);
            this.recorderState.ready = true;
            this.onStateChange.next(this.recorderState);
        } else {
            console.error('Your browser doesn\'t support Media Recording');
        }
    }

    onDataAvailable(event) {
        this.recordStream.push(event.data);
    }

    start() {
        this.recordStream = [];
        this.recorderState.recording = true;
        this.onStateChange.next(this.recorderState);
        this.recorder.start(this.recordTimeSlot);
    }

    pause() {
        this.recorderState.recording = false;
        this.recorder.pause();
    }

    async stop() {
        return new Promise((resolve) => {
            this.recorder.requestData();
            this.recorder.stop();
            this.recorderState.recording = false;
            this.recorderState.stopped = true;
            resolve(true);
        });
    }

    downloadUrl() {
        const audioBlob = new Blob(this.recordStream, { type: 'octet/stream' });
        return URL.createObjectURL(audioBlob);
    }

    private resetPlayerState() {
        this.recorderState.ready = false;
        this.recorderState.recording = false;
        this.recorderState.stopped = false;
    }
}
