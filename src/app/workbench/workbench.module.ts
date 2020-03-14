import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { WorkbenchComponent } from '@app/workbench/workbench.component';
import { ProducerControlsComponent } from '@app/workbench/producer-controls/producer-controls.component';
import { SamplePointsComponent } from '@app/workbench/sample-points/sample-points.component';
import { SampleItemComponent } from '@app/workbench/sample-points/sample-item/sample-item.component';
// import { NavigationComponent } from '@app/shared/navigation/navigation.component';

@NgModule({
  declarations: [
    WorkbenchComponent,
    ProducerControlsComponent,
    SamplePointsComponent,
    SampleItemComponent,
    // NavigationComponent
  ],
  imports: [
    BrowserModule,
    SharedModule
  ],
  exports: [
    WorkbenchComponent,
    SharedModule
  ],
  providers: [],
})
export class WorkBenchModule { }
