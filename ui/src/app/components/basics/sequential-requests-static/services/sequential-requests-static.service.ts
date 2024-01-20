import { Injectable } from '@angular/core';
import { Observable, concatMap, shareReplay } from 'rxjs';
import { AlphaFields } from 'src/app/models/alpha-fields.model';
import { RxjsTrainingService } from 'src/app/services/rxjs-training.service';

@Injectable()
export class SequentialRequestsStaticService {

  private readonly procedureDef$ = this.trainingService.getEnrollmentProcedure().pipe(
    shareReplay({
      refCount: true,
      bufferSize: 1
    })
  );

  private readonly icvsConfig$ = this.trainingService.getIcvsConfig().pipe(
    shareReplay({
      refCount: true,
      bufferSize: 1
    })
  );

  public readonly alphaFields$ = this.trainingService.getAlphaFields().pipe(
    shareReplay({
      refCount: true,
      bufferSize: 1
    })
  );

  constructor(private readonly trainingService: RxjsTrainingService) { }

  public getAlphaFields(): Observable<AlphaFields> {
    return this.procedureDef$.pipe(
      concatMap((procedureDef) => this.icvsConfig$),
      concatMap((config) => this.alphaFields$)
    );
  }
}
