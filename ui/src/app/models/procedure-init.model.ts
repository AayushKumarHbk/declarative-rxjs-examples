import { CommonConfig } from "./icvs-config.model";
import { ProcdeureDefinition } from "./procedure-definition.model";

export interface ProcedureInit {
    procedureDef: ProcdeureDefinition;
    commonConfig: CommonConfig;
}