export type AlphaFields = AlphaField[];

export interface AlphaField {
    name: string;
    required: boolean;
    length?: number;
}