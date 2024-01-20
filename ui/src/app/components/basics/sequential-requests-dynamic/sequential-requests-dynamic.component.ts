import { Component, ViewEncapsulation } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { SequentialRequestsDynamicService } from './services/sequential-requests-dynamic.service';
import { Dossier } from 'src/app/models/dossiers';

@Component({
  selector: 'app-sequential-requests-dynamic',
  templateUrl: './sequential-requests-dynamic.component.html',
  styleUrls: ['./sequential-requests-dynamic.component.scss'],
  providers: [SequentialRequestsDynamicService]
})
export class SequentialRequestsDynamicComponent {

  public readonly click$ = new Subject<null>();

  public readonly dossiers$ = this.click$.pipe(
    switchMap(() => this.sequentialRequestsService.getDossiers())
  );

  constructor(private readonly sequentialRequestsService: SequentialRequestsDynamicService) {}

  trackById(index: number, dossier: Dossier){
     return dossier.id; 
  }

}

