export interface TProduct {
    productId: number;
    productName: string;
    brandName: string;
    amount: number;
    amountUnitId: number;
    amountUnit: string;
    userId: number;
    recDose: number;
    recDoseUnitId: number;
}
export declare type TProducts = TProduct[];
