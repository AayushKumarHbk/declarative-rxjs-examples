import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicRequestComponent } from './components/basics/basic-request/basic-request.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { HttpClientModule } from '@angular/common/http';
import { SequentialRequestsStaticComponent } from './components/basics/sequential-requests-static/sequential-requests-static.component';
import { SequentialRequestsDynamicComponent } from './components/basics/sequential-requests-dynamic/sequential-requests-dynamic.component';
import { ParallelRequestsComponent } from './components/basics/parallel-requests/parallel-requests.component';
import { SequentialRequestsStaticEx2Component } from './components/basics/sequential-requests-static-ex2/sequential-requests-static-ex2.component';
import { ParallelRequestsDynamicComponent } from './components/basics/parallel-requests-dynamic/parallel-requests-dynamic.component';
import { ParallelRequestsBatchesComponent } from './components/basics/parallel-requests-batches/parallel-requests-batches.component';
import { PollingSingleApiComponent } from './components/polling/polling-single-api/polling-single-api.component';
import { PollingMultipleApiComponent } from './components/polling/polling-multiple-api/polling-multiple-api.component';
import { MultiplePollingsWithDepsComponent } from './components/polling/multiple-pollings-with-deps/multiple-pollings-with-deps.component';
import { BasicUserEventsComponent } from './components/user-events/components/basic-user-events/basic-user-events.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicRequestComponent,
    SequentialRequestsStaticComponent,
    ParallelRequestsComponent,
    ParallelRequestsBatchesComponent,
    SequentialRequestsStaticEx2Component,
    ParallelRequestsDynamicComponent,
    SequentialRequestsDynamicComponent,
    PollingSingleApiComponent,
    PollingMultipleApiComponent,
    MultiplePollingsWithDepsComponent,
    BasicUserEventsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
