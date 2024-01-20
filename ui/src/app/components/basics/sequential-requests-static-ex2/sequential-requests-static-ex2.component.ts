import { Component } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { SequentialRequestsStaticEx2Service } from './services/sequential-requests-static-ex2.service';

@Component({
  selector: 'app-sequential-requests-static-ex2',
  templateUrl: './sequential-requests-static-ex2.component.html',
  styleUrls: ['./sequential-requests-static-ex2.component.scss'],
  providers: [SequentialRequestsStaticEx2Service]
})
export class SequentialRequestsStaticEx2Component {

  public readonly click$ = new Subject<null>();

  public readonly procedureInit$ = this.click$.pipe(
    switchMap(() => this.sequentialService.procedureInit$)
  );

  public readonly alphaFields$ = this.click$.pipe(
    switchMap(() => this.sequentialService.alphaFields$)
  );

  constructor(private readonly sequentialService: SequentialRequestsStaticEx2Service) {}
}
