import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { FlagDetailComponent } from './flag-detail/flag-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    FlagDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzButtonModule,
    NzLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
