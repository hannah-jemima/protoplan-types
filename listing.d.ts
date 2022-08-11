export declare type TListingCosts = {
    listingId: number;
    productId: number;
    price: number;
    listingCurrencyCode: string;
    exchangeRate: number;
    deliveryPerProduct: number | null;
    deliveryPrice: number | null;
    bundleId: number | null;
    quantity: number;
    nBundleProducts: number;
    vendorCountryId: number;
    baseTax: number | null;
    taxPercent: number | null;
    taxBracketEnd: number | null;
    basketLimit: number | null;
    userCurrencyCode: string;
    userCountryId: number;
    cost: number;
};
export interface TListing extends TListingCosts {
    listingName: string;
    scrapeTime: Date;
    amount: number;
    amountUnit: string;
    vendorId: number;
    vendorName: string;
    inaccessible: boolean;
    currencyId: number;
    listingCurrencyCode: string;
    listingUrl: string;
    userId: number;
    deliveryCountryId: number;
}
export declare type TListings = TListing[];
export interface TVendor {
    vendorId: number;
    name: string;
    countryId: number;
    scrapeTime: Date;
    vendorTaxPercent: number | null;
}
export declare type TVendors = TVendor[];
