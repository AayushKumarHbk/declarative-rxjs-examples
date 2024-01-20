import { Component } from '@angular/core';
import { PollingMultipleApiService } from './services/polling-multiple-api.service';
import { Dossier } from 'src/app/models/dossiers';

@Component({
  selector: 'app-polling-multiple-api',
  templateUrl: './polling-multiple-api.component.html',
  styleUrls: ['./polling-multiple-api.component.scss'],
  providers: [PollingMultipleApiService]
})
export class PollingMultipleApiComponent {

  public readonly selectedDossier$ = this.pollingService.selectedDossier$;

  constructor(private readonly pollingService: PollingMultipleApiService) {}

  trackById(index: number, dossier: Dossier) {
    return dossier.id;
  }

}
