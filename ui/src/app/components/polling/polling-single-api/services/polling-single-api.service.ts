import { Injectable } from '@angular/core';
import { Observable, defer, distinctUntilChanged, repeat, shareReplay, switchMap, tap, timer } from 'rxjs';
import { Student } from 'src/app/models/student.model';
import { RxjsTrainingService } from 'src/app/services/rxjs-training.service';
import { isEqual } from 'lodash-es';

@Injectable()
export class PollingSingleApiService {

  public readonly students$ = this.pollStudents();

  constructor(private readonly trainingService: RxjsTrainingService) { }

  public fetchStudents(): Observable<Student[]> {
    return this.trainingService.getStudents();
  }

  private pollStudents(): Observable<Student[]> {
    let delayInterval = 0;
    const pollingInterval = 3000;
    return defer(() => timer(delayInterval)).pipe(
      switchMap(() => this.fetchStudents()),
      tap(() => delayInterval = pollingInterval),
      repeat(),
      distinctUntilChanged((previous, current) => !isEqual(previous, current)),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }
}
