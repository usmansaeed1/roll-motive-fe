import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureFlagsListComponent } from './list/list.component';
import { FlagDetailComponent } from './flag-detail/flag-detail.component'

const routes: Routes = [
  {
    path: 'feature-flags',
    component: FeatureFlagsListComponent,
  },
  {
    path: 'flag-detail',
    component: FlagDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
