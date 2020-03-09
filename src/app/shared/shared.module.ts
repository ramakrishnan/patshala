import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PlayerComponent } from '@app/shared/player/player.component';

@NgModule({
  declarations: [
    PlayerComponent
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    PlayerComponent,
  ],
  providers: [],
})
export class SharedModule { }
