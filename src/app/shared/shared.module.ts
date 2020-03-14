import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PlayerComponent } from '@app/shared/player/player.component';
// import {  NavigationComponent } from '@app/shared/navigation/navigation.component';

@NgModule({
  declarations: [
    PlayerComponent,
    // NavigationComponent
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    PlayerComponent,
    // NavigationComponent
  ],
  providers: [],
})
export class SharedModule { }
