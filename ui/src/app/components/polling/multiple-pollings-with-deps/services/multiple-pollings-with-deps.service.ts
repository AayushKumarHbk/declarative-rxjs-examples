import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, concatMap, defer, distinctUntilChanged, filter, forkJoin, map, repeat, shareReplay, switchMap, tap, timer } from 'rxjs';
import { Student } from 'src/app/models/student.model';
import { RxjsTrainingService } from 'src/app/services/rxjs-training.service';
import { isEqual } from 'lodash-es';
import { Dossier, Dossiers } from 'src/app/models/dossiers';
import { ExportData } from 'src/app/models/export-data.model';
import { PrintingRequest } from 'src/app/models/printing-request.model';

@Injectable()
export class MultiplePollingsWithDepsService {

  public readonly dossiers$ = this.pollDossiers();
  private readonly _selectedDossier$ = new ReplaySubject<number>(1);
  public readonly selectedDossier$ = this.pollSelectedDossier()

  constructor(private readonly trainingService: RxjsTrainingService) { }

  public setSelectedDossier(dossierId: number): void {
    this._selectedDossier$.next(dossierId);
  }

  private pollDossiers(): Observable<Dossier[]> {
    let delayInterval = 0;
    const pollingInterval = 3000;
    return defer(() => timer(delayInterval)).pipe(
      concatMap(() => this.getDossiers()),
      tap(() => delayInterval = pollingInterval),
      repeat(),
      distinctUntilChanged((previous, current) => !isEqual(previous, current)),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  public getDossiers(): Observable<Dossiers> {
    return this.trainingService.getDossierIds(true).pipe(
      map(dossierIds => dossierIds.map(dossierId => this.trainingService.getDossierById(dossierId))),
      switchMap(requests => forkJoin(requests))
    );
  }

  private pollSelectedDossier(): Observable<Dossier> {
    let delayInterval = 0;
    const pollingInterval = 3000;
    return this._selectedDossier$.pipe(
      filter(dossierId => !!dossierId),
      switchMap((dossierId) => defer(() => timer(delayInterval)).pipe(
        concatMap(() => this.fetchAdditionalDossierData(dossierId)),
        tap(() => delayInterval = pollingInterval),
        repeat(),
        distinctUntilChanged((previous, current) => !isEqual(previous, current)),
        switchMap(([exportData, printingRequests]) => this.dossiers$.pipe(
          map(dossiers => dossiers.find(dossier => dossier.id === dossierId)),
          filter((dossier): dossier is Dossier => dossier !== undefined),
          tap((selectedDossier: Dossier) => {
            if (selectedDossier) {
              selectedDossier.exportData = exportData;
              selectedDossier.printingRequests = printingRequests;
            }
          })
        )),
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
