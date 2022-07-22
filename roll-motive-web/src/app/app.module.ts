import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSliderModule } from 'ng-zorro-antd/slider';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FeatureFlagsListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { DateAsAgoPipe } from './pipes/date-as-ago.pipe';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateFeatureFlagComponent } from './create-feature-flag/create-feature-flag.component';
import { ServerApi } from './services/server-api';
import { CustomHttpParamCodec } from './services/custom-http-param-codec';


@NgModule({
  declarations: [
    AppComponent,
    FeatureFlagsListComponent,
    DetailComponent,
    DateAsAgoPipe,
    CreateFeatureFlagComponent,
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
    NzTagModule,
    NzFormModule,
    NzModalModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzSliderModule,
  ],
  providers: [ServerApi, CustomHttpParamCodec],
  bootstrap: [AppComponent]
})
export class AppModule { }
