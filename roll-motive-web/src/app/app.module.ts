import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FeatureFlagsListComponent } from './list/list.component';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FeatureFlagsListComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NzButtonModule,
    NzLayoutModule,
    NzTableModule,
    NzInputModule,
    NzIconModule,
    NzNoAnimationModule,
    BrowserAnimationsModule,
    NzSwitchModule,
    FormsModule,
    NzTagModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
