import { TListingCosts } from "./listing.js";
export interface TProtocolRowCosts extends TListingCosts {
    protocolId: number;
    dose: number;
    doseUnitId: number;
    amount: number;
    amountUnitId: number;
    dosesPerDay: number;
    daysPerMonth: number;
    productsPerMonth: number;
    listingsPerMonth: number;
    repurchase: number;
    costPerMonth: number;
    feesPerMonth: number;
}
export interface TProtocolRow extends TProtocolRowCosts {
    productName: string;
    listingName: string;
    brandName: string;
    amountUnit: string;
    recDoseUnitId: number;
    formId: number;
    listingCurrencyCode: string;
    priority: number;
    vendorId: number;
    vendorName: string;
    scrapeTime: Date;
}
export declare type TProtocol = TProtocolRow[];
