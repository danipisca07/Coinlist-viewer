import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApiService } from './services/api.service';
import { GraphPageComponent } from './graph-page/graph-page.component';

import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    GraphPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
