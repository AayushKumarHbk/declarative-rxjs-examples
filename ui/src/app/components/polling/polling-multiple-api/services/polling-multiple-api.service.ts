import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, concatMap, defer, distinctUntilChanged, filter, forkJoin, map, repeat, shareReplay, switchMap, tap, timer } from 'rxjs';
import { Student } from 'src/app/models/student.model';
import { RxjsTrainingService } from 'src/app/services/rxjs-training.service';
import { isEqual } from 'lodash-es';
import { Dossier, Dossiers } from 'src/app/models/dossiers';
import { ExportData } from 'src/app/models/export-data.model';
import { PrintingRequest } from 'src/app/models/printing-request.model';

@Injectable()
export class PollingMultipleApiService {

  public readonly dossier$ = this.getDossier();
  public readonly selectedDossier$ = this.pollSelectedDossier()

  constructor(private readonly trainingService: RxjsTrainingService) {
  }

  private getDossier(): Observable<Dossier> {
    return this.trainingService.getDossierById(1).pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  private pollSelectedDossier(): Observable<Dossier> {
    let delayInterval = 0;
    const pollingInterval = 3000;
    return this.dossier$.pipe(
      switchMap((dossier) => defer(() => timer(delayInterval)).pipe(
        concatMap(() => this.fetchAdditionalDossierData(dossier.id)),
        tap(() => delayInterval = pollingInterval),
        repeat(),
        distinctUntilChanged((previous, current) => !isEqual(previous, current)),
        tap(([exportData, printingRequests]) => {
          dossier.exportData = exportData;
          dossier.printingRequests = printingRequests;
        }),
        map(() => dossier),
        shareReplay({ bufferSize: 1, refCount: true })
      ))
    );
  }

  private fetchAdditionalDossierData(dossierId: number): Observable<[ExportData[], PrintingRequest[]]> {
    return forkJoin([
      this.trainingService.getExports(dossierId),
      this.trainingService.getPrintingRequests(dossierId)
    ])
  }
}
