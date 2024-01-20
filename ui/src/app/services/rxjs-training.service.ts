import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { CommonConfig } from '../models/icvs-config.model';
import { ProcdeureDefinition } from '../models/procedure-definition.model';
import { AlphaFields } from '../models/alpha-fields.model';
import { Dossier } from '../models/dossiers';
import { ExportData } from '../models/export-data.model';
import { PrintingRequest } from '../models/printing-request.model';

@Injectable({
  providedIn: 'root'
})
export class RxjsTrainingService {

  constructor(private readonly httpClient: HttpClient) { }

  public getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>('/training/students');
  }

  public getIcvsConfig(): Observable<CommonConfig> {
    return this.httpClient.get<CommonConfig>('/training/icvs-config');
  }

  public getEnrollmentProcedure(): Observable<ProcdeureDefinition> {
    return this.httpClient.get<ProcdeureDefinition>('/training/enrollment-procedure');
  }

  public getAlphaFields(): Observable<AlphaFields> {
    return this.httpClient.get<AlphaFields>('/training/alpha-fields');
  }

  public getDossierIds(smallerList = false): Observable<number[]> {
    if (smallerList) {
      return this.httpClient.get<number[]>('/training/dossiers-short');
    }
    return this.httpClient.get<number[]>('/training/dossiers');
  }

  public getDossierById(dossierId: number): Observable<Dossier> {
    return this.httpClient.get<Dossier>(`/training/dossier?id=${dossierId}`);
  }

  public getExports(dossierId: number): Observable<ExportData[]> {
  return this.httpClient.get<ExportData[]>(`/training/export-data?id=${dossierId}`);
  }

  public getPrintingRequests(dossierId: number): Observable<PrintingRequest[]> {
    return this.httpClient.get<PrintingRequest[]>(`/training/printing-requests?id=${dossierId}`);
  }

  
}
