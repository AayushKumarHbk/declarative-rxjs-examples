import { Component } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { ParallelRequestsService } from './services/parallel-requests.service';

@Component({
  selector: 'app-parallel-requests',
  templateUrl: './parallel-requests.component.html',
  styleUrls: ['./parallel-requests.component.scss'],
  providers: [ParallelRequestsService]
})
export class ParallelRequestsComponent {

  public readonly click$ = new Subject<null>();

  public readonly procedureInit$ = this.click$.pipe(
    switchMap(() => this.parallelRequestsService.procedureInit$)
  );

  constructor(private readonly parallelRequestsService: ParallelRequestsService) {}
}
