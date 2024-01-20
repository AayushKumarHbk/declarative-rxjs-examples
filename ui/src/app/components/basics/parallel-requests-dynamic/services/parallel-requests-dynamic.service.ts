import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Dossiers } from 'src/app/models/dossiers';
import { RxjsTrainingService } from 'src/app/services/rxjs-training.service';

@Injectable()
export class ParallelRequestsDynamicService {

  constructor(private readonly trainingService: RxjsTrainingService) {
  }

  public getDossiers(): Observable<Dossiers> {
    return this.trainingService.getDossierIds().pipe(
      map(dossierIds => dossierIds.map(dossierId => this.trainingService.getDossierById(dossierId))),
      switchMap(requests => forkJoin(requests))
    );
  }
}
