import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '@app/app-routing.module';
import { WorkBenchModule } from '@app/workbench/workbench.module';

import { AppComponent } from '@app/app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WorkBenchModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
