import { ExportData } from "./export-data.model";
import { PrintingRequest } from "./printing-request.model";

export type Dossiers = Dossier[];

export interface Dossier {
    id: number;
    status: string;
    createdBy: string;
    exportData?: ExportData[];
    printingRequests?: PrintingRequest[];
}