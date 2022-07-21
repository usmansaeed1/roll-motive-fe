import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureFlagsListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component'

const routes: Routes = [
  {
    path: 'feature-flags',
    component: FeatureFlagsListComponent,
  },
  {
    path: 'flag-detail',
    component: DetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
