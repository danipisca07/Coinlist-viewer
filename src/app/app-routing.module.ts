import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphPageComponent } from './graph-page/graph-page.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component: ListComponent},
  { path: 'list', component: ListComponent},
  { path: 'graph/:name', component: GraphPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
