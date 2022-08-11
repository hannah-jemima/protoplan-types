export interface TUnit {
    unitId: number;
    name: string;
    formId: number;
}
export declare type TUnits = TUnit[];
export interface TUnitConversion {
    unitConversionId: number;
    productId: number;
    fromUnitId: number;
    toUnitId: number;
    factor: number;
}
export declare type TUnitConversions = TUnitConversion[];
