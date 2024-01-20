import { Component } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { SequentialRequestsStaticService } from './services/sequential-requests-static.service';

@Component({
  selector: 'app-sequential-requests-static',
  templateUrl: './sequential-requests-static.component.html',
  styleUrls: ['./sequential-requests-static.component.scss'],
  providers: [SequentialRequestsStaticService]
})
export class SequentialRequestsStaticComponent {

  public readonly click$ = new Subject<null>();

  public readonly alphaFields$ = this.click$.pipe(
    switchMap(() => this.sequentialService.getAlphaFields())
  );

  constructor(private readonly sequentialService: SequentialRequestsStaticService) {}
}
