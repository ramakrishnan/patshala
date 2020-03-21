import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface IPlayerState {
    paused: boolean;
    stopped: boolean;
    ready: boolean;
    trackLength: number;
    currentTime: number;
}

@Injectable({
    providedIn: 'root'
})
export class PlayerService {
    private player: any = new Audio();
    private playerState: IPlayerState = {
        paused: false,
        stopped: false,
        ready: false,
        trackLength: 0,
        currentTime: 0
    };
    public onStateChange = new Subject();
    // public onReady = new Subject();

    constructor() {
        this.attachEvents(['loadeddata',
            'canplay',
            'playing',
            'pause',
            'timeupdate'
        ]);
    }

    private attachEvents(events: string[]) {
        events.forEach((event) => {
            this.player.addEventListener(event, (e) => this.handleEvent(e));
        });
    }

    private handleEvent(event: Event) {
        switch (event.type) {
            case 'loadeddata':
                this.playerState.ready = this.player.readyState >= 2;
                this.playerState.trackLength = event.timeStamp;
                break;
            case 'canplay':
                this.playerState.trackLength = this.player.duration;
                this.playerState.ready = true;
                break;
            case 'playing':
                this.playerState.paused = false;
                break;
            case 'pause':
                this.playerState.paused = true;
                break;
            case 'timeupdate':
                this.playerState.currentTime = this.player.currentTime;
                // this.state.readableCurrentTime = this.formatTime(this.state.currentTime);
                break;
        }
        this.onStateChange.next(this.playerState);
    }

    loadFile(file: File) {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.player.src = e.target.result;
                this.player.playbackRate = 1;
            };
            reader.readAsDataURL(file);
        }
    }

    setPlayBackRate(speed) {
        this.player.playbackRate = speed;
    }

    loadBlob(blobStr) {
        this.player.src = blobStr;
        this.player.playbackRate = 1;
    }

    async play() {
        this.player.play();
    }

    pause() {
        this.player.pause();
    }

    stop() {
        this.pause();
        this.player.currentTime = 0;
    }

    getStatus() {
        return this.playerState;
    }

    async playBetween(start: number, end: number) {
        this.player.currentTime = start;
        const timeGap = Number((end - start).toFixed(4)) * 1000;
        await this.play();
        setTimeout(() => {
            this.pause();
        }, timeGap * this.player.playbackRate);
    }
}
