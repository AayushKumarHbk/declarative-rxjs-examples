import { Injectable } from '@angular/core';
import { concatMap, forkJoin, shareReplay } from 'rxjs';
import { RxjsTrainingService } from 'src/app/services/rxjs-training.service';

@Injectable()
export class SequentialRequestsStaticEx2Service {

  public readonly procedureInit$ = forkJoin({
    procedureDef: this.trainingService.getEnrollmentProcedure(),
    commonConfig: this.trainingService.getIcvsConfig()
  }).pipe(
    shareReplay({
      refCount: true,
      bufferSize: 1
    })
  );

  public readonly alphaFields$ = this.procedureInit$.pipe(
    concatMap(() => this.trainingService.getAlphaFields()),
    shareReplay({
      refCount: true,
      bufferSize: 1
    })
  );

  constructor(private readonly trainingService: RxjsTrainingService) { }
}
