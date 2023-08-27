import { IBundleSaving, IDiscount, TSavingRow } from "..";
interface IEnforceTypesBase {
    price: number;
    discountedPrice?: number;
    baseTax?: number;
    taxPercent?: number;
    salesTax?: number;
    deliveryPrice?: number;
    amount: number;
    amountUnit: string;
    scrapeTime?: Date | null;
    basketLimit?: number | null;
}
export interface IEnforcableTypes extends IEnforceTypesBase {
    inaccessible: number | null | boolean;
    discounts?: IDiscount[];
}
export interface IEnforcableProps extends IEnforcableTypes {
    listingSavings?: TSavingRow[] | null;
    bundleSavings?: IBundleSaving[] | null;
}
export declare function enforceDosingsTypes<T>(rows: (T & IEnforcableProps)[]): (T & IEnforcableProps & {
    listingSavings: (import("..").ISaving & import("..").IDosingInfo & import("..").IDosingCosts & import("..").IListingCosts & import("..").IListingInfo & {
        price: number;
        discountedPrice: number | undefined;
        baseTax: number | undefined;
        taxPercent: number | undefined;
        salesTax: number | undefined;
        deliveryPrice: number | undefined;
        amount: number;
        amountUnit: string;
        scrapeTime: Date | null | undefined;
        basketLimit: number | null | undefined;
        inaccessible: boolean;
        discounts: {
            savingPercent: number;
            compounds: boolean;
            applied: boolean;
            discountId: number;
            title: string | null;
            desc: string | null;
        }[] | undefined;
    })[] | undefined;
    bundleSavings: IBundleSaving[] | undefined;
    price: number;
    discountedPrice: number | undefined;
    baseTax: number | undefined;
    taxPercent: number | undefined;
    salesTax: number | undefined;
    deliveryPrice: number | undefined;
    amount: number;
    amountUnit: string;
    scrapeTime: Date | null | undefined;
    basketLimit: number | null | undefined;
    inaccessible: boolean;
    discounts: {
        savingPercent: number;
        compounds: boolean;
        applied: boolean;
        discountId: number;
        title: string | null;
        desc: string | null;
    }[] | undefined;
})[];
export declare function enforceListingTypes<T>(listings: (T & IEnforcableProps & {
    priceWithTax: number;
})[]): (T & {
    priceWithTax: number;
} & IEnforcableProps & {
    priceWithTax: number;
    listingSavings: (import("..").ISaving & import("..").IDosingInfo & import("..").IDosingCosts & import("..").IListingCosts & import("..").IListingInfo & {
        price: number;
        discountedPrice: number | undefined;
        baseTax: number | undefined;
        taxPercent: number | undefined;
        salesTax: number | undefined;
        deliveryPrice: number | undefined;
        amount: number;
        amountUnit: string;
        scrapeTime: Date | null | undefined;
        basketLimit: number | null | undefined;
        inaccessible: boolean;
        discounts: {
            savingPercent: number;
            compounds: boolean;
            applied: boolean;
            discountId: number;
            title: string | null;
            desc: string | null;
        }[] | undefined;
    })[] | undefined;
    bundleSavings: IBundleSaving[] | undefined;
    price: number;
    discountedPrice: number | undefined;
    baseTax: number | undefined;
    taxPercent: number | undefined;
    salesTax: number | undefined;
    deliveryPrice: number | undefined;
    amount: number;
    amountUnit: string;
    scrapeTime: Date | null | undefined;
    basketLimit: number | null | undefined;
    inaccessible: boolean;
    discounts: {
        savingPercent: number;
        compounds: boolean;
        applied: boolean;
        discountId: number;
        title: string | null;
        desc: string | null;
    }[] | undefined;
})[];
export {};
