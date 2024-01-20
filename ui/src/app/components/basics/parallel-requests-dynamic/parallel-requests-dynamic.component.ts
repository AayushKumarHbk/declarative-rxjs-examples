import { Component } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { Dossier } from 'src/app/models/dossiers';
import { ParallelRequestsDynamicService } from './services/parallel-requests-dynamic.service';

@Component({
  selector: 'app-parallel-requests-dynamic',
  templateUrl: './parallel-requests-dynamic.component.html',
  styleUrls: ['./parallel-requests-dynamic.component.scss'],
  providers: [ParallelRequestsDynamicService]
})
export class ParallelRequestsDynamicComponent {

  public readonly click$ = new Subject<null>();

  public readonly dossiers$ = this.click$.pipe(
    switchMap(() => this.parallelRequestsService.getDossiers())
  );

  constructor(private readonly parallelRequestsService: ParallelRequestsDynamicService) {}

  trackById(index: number, dossier: Dossier){
     return dossier.id; 
  }

}
