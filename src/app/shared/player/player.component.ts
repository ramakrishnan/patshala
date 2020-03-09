import { Component } from "@angular/core";
import { PlayerService, IPlayerState } from '@app/service/player.service';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html'
})
export class PlayerComponent  {
    trackLength: string;
    currentTime: string;

    constructor(private player: PlayerService) {
        this.player.onStateChange.subscribe((state: IPlayerState) => {
            this.trackLength = state.trackLength.toFixed(0);
            this.currentTime = state.currentTime.toFixed(0);
        });
    }
}
