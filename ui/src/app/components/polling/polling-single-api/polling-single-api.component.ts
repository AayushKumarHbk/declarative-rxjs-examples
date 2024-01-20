import { Component, ViewEncapsulation } from '@angular/core';
import { PollingSingleApiService } from './services/polling-single-api.service';
import { Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-polling-single-api',
  templateUrl: './polling-single-api.component.html',
  styleUrls: ['./polling-single-api.component.scss'],
  providers: [PollingSingleApiService],
})
export class PollingSingleApiComponent {

  public readonly students$ = this.pollingService.students$;

  constructor(private readonly pollingService: PollingSingleApiService) {}

}
