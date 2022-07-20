import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureFlagsListComponent } from './list/list.component';

const routes: Routes = [{
  path: 'feature-flags',
  component: FeatureFlagsListComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
