import { Component } from '@angular/core';
import { Dossier } from 'src/app/models/dossiers';
import { MultiplePollingsWithDepsService } from './services/multiple-pollings-with-deps.service';

@Component({
  selector: 'app-multiple-pollings-with-deps',
  templateUrl: './multiple-pollings-with-deps.component.html',
  styleUrls: ['./multiple-pollings-with-deps.component.scss'],
  providers: [MultiplePollingsWithDepsService]
})
export class MultiplePollingsWithDepsComponent {

  public readonly dossiers$ = this.pollingService.dossiers$;
  public readonly selectedDossier$ = this.pollingService.selectedDossier$;

  constructor(private readonly pollingService: MultiplePollingsWithDepsService) { }

  public setSelectedDossier(dossierId: number): void {
    this.pollingService.setSelectedDossier(dossierId);
  }

  trackById(index: number, dossier: Dossier) {
    return dossier.id;
  }

}
