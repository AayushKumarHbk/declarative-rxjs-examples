import { Component } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { Dossier } from 'src/app/models/dossiers';
import { ParallelRequestsBatchesService } from './services/parallel-requests-batches.service';

@Component({
  selector: 'app-parallel-requests-batches',
  templateUrl: './parallel-requests-batches.component.html',
  styleUrls: ['./parallel-requests-batches.component.scss'],
  providers: [ParallelRequestsBatchesService]
})
export class ParallelRequestsBatchesComponent {

  public readonly click$ = new Subject<null>();

  public readonly dossiers$ = this.click$.pipe(
    switchMap(() => this.parallelRequestsService.getDossiers())
  );

  constructor(private readonly parallelRequestsService: ParallelRequestsBatchesService) {}

  trackById(index: number, dossier: Dossier){
     return dossier.id; 
  }

}