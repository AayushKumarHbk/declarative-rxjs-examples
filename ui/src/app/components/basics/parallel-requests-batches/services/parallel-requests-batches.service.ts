import { Injectable } from '@angular/core';
import { Observable, forkJoin, from, map, switchMap } from 'rxjs';
import { Dossiers } from 'src/app/models/dossiers';
import { RxjsTrainingService } from 'src/app/services/rxjs-training.service';
import { concatMap, scan } from "rxjs/operators";

@Injectable()
export class ParallelRequestsBatchesService {

  constructor(private readonly trainingService: RxjsTrainingService) {
  }

  public getDossiers(): Observable<Dossiers> {
    return this.trainingService.getDossierIds().pipe(
      map(dossierIds => dossierIds.map(dossierId => this.trainingService.getDossierById(dossierId))),
      switchMap(requests => this.batchForkJoin(requests, 5))
    );
  }

  private batchForkJoin<T>(observables: Observable<T>[], batchCount: number): Observable<T[]> {
    const batches = this.formBatches(observables, batchCount);
    return from(batches).pipe(
      concatMap((batch) => forkJoin(batch)),
      scan((acc, value, index) => {
        acc.push(...value);
        return acc;
      }, [] as T[])
    );
  }

  private formBatches<T>(observables: Observable<T>[], batchCount: number): Observable<T>[][] {
  if (!observables || observables.length === 0) {
    return [[]];
  }
  if (!batchCount) {
    return [observables];
  }
  const result = [];
  let index = 0;
  while (index < observables.length) {
    result.push(
      observables.slice(index, index + batchCount)
    );
    index += batchCount
  }
  return result;
}
}