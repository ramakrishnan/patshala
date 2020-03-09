import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkbenchComponent } from '@app/workbench/workbench.component';

const routes: Routes = [
  { path: 'producer', component: WorkbenchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
