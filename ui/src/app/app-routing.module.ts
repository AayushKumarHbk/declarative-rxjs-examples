import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicRequestComponent } from './components/basics/basic-request/basic-request.component';
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

const routes: Routes = [
  { path: 'basic-http-request', component: BasicRequestComponent },
  { path: 'sequential-requests-static', component: SequentialRequestsStaticComponent },
  { path: 'sequential-requests-dynamic', component: SequentialRequestsDynamicComponent },
  { path: 'parallel-requests', component: ParallelRequestsComponent },
  { path: 'sequential-requests-static-ex2', component: SequentialRequestsStaticEx2Component },
  { path: 'parallel-requests-dynamic', component: ParallelRequestsDynamicComponent },
  { path: 'parallel-requests-batches', component: ParallelRequestsBatchesComponent },
  { path: 'polling-single-api', component: PollingSingleApiComponent },
  { path: 'polling-multiple-api', component: PollingMultipleApiComponent },
  { path: 'polling-multiple-api-with-deps', component: MultiplePollingsWithDepsComponent },
  { path: 'basic-user-events', component: BasicUserEventsComponent },
  { path: '',   redirectTo: '/basic-http-request', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
