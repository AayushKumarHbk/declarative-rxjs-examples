import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/student.model';
import { RxjsTrainingService } from 'src/app/services/rxjs-training.service';

@Injectable()
export class BasicRequestService {

  constructor(private readonly trainingService: RxjsTrainingService) { }

  public getStudents(): Observable<Student[]> {
    return this.trainingService.getStudents();
  }
}
