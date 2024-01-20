import { Injectable } from '@angular/core';
import { Observable, forkJoin, shareReplay } from 'rxjs';
import { CommonConfig } from 'src/app/models/icvs-config.model';
import { ProcdeureDefinition } from 'src/app/models/procedure-definition.model';
import { RxjsTrainingService } from 'src/app/services/rxjs-training.service';

@Injectable()
export class ParallelRequestsService {

  public readonly procedureInit$ = this.getInfoOnProcedureStartup().pipe(
    shareReplay({
      refCount: true,
      bufferSize: 1
    })
  );

  constructor(private readonly trainingService: RxjsTrainingService) { }

  public getInfoOnProcedureStartup(): Observable<{ procedureDef: ProcdeureDefinition, commonConfig: CommonConfig }> {
    return forkJoin({
      procedureDef: this.trainingService.getEnrollmentProcedure(),
      commonConfig: this.trainingService.getIcvsConfig()
    });
  }
}

