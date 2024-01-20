import { Component, ViewEncapsulation } from '@angular/core';
import { BasicRequestService } from './basic-request.service';
import { Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-basic-request',
  templateUrl: './basic-request.component.html',
  styleUrls: ['./basic-request.component.scss'],
  providers: [BasicRequestService],
  encapsulation: ViewEncapsulation.Emulated
})
export class BasicRequestComponent {

  public readonly click$ = new Subject<null>();

  public readonly students$ = this.click$.pipe(
    switchMap(() => this.basicRequestService.getStudents())
  );

  constructor(private readonly basicRequestService: BasicRequestService) {}

}
