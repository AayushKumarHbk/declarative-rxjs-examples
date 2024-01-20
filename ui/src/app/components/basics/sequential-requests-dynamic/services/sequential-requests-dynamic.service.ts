import { Injectable } from '@angular/core';
import { Observable, concatMap, from, scan, switchMap } from 'rxjs';
import { Dossier, Dossiers } from 'src/app/models/dossiers';
import { RxjsTrainingService } from 'src/app/services/rxjs-training.service';

@Injectable()
export class SequentialRequestsDynamicService {

  constructor(private readonly trainingService: RxjsTrainingService) {
  }

  public getDossiers(): Observable<Dossiers> {
    return this.trainingService.getDossierIds().pipe(
      switchMap(dossierIds => {
        return from(dossierIds).pipe(
          concatMap(dossierId => this.trainingService.getDossierById(dossierId)),
          scan((acc, value) => {
            acc.push(value);
            return acc;
          }, [] as Dossier[]),
        );
      }),
      
      
    );
  }
}
