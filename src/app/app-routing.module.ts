import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphPageComponent } from './graph-page/graph-page.component';

const routes: Routes = [
  { path: 'graph/:name', component: GraphPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
