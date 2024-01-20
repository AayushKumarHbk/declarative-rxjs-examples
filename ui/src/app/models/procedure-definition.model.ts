export interface ProcdeureDefinition {
    steps: ProcedureStep[]
}

export interface ProcedureStep {
    index: number;
    name: string;
}