export interface TOption {
    label: string;
    value: number;
    input?: string;
}
export interface ICurrency {
    currencyId: number;
    code: string;
    symbol: string | null;
}
export interface ICountry {
    countryId: number;
    name: string;
    currency: ICurrency;
    popularity: number;
}
export interface IProduct {
    productId: number;
    productName: string;
    brandName: string;
    amount: number;
    amountUnitId: number;
    amountUnit: string;
    recDoseUnitId: number | null;
    recDoseUnit: string | null;
    formId: number;
    userId: number | null;
}
export declare type TProducts = IProduct[];
export interface IProductInfo extends IProduct {
    nListingsForUser: number;
}
export interface TNewProduct {
    name: string;
    brandId?: number;
    brandName?: string;
    amount?: number;
    amountUnitId?: number;
    recDose?: number;
    recDoseUnitId?: number;
}
export interface IListingBase extends IDiscountInit {
    listingId: number;
    listingName: string;
    brandName: string;
    productId: number;
    productName: string;
    amount: number;
    amountUnitId: number;
    amountUnit: string;
    recDoseUnitId: number | null;
    recDoseUnit: string | null;
    formId: number;
    vendorId: number;
    vendorName: string;
    vendorInfo: string | null;
    vendorScrapeTime: Date | null;
    price: number;
    scrapedPrice: number | null;
    scrapeTime: Date | null;
    deliveryPerListing: number;
    vendorCountryId: number;
    vendorCurrencyCode: string;
    listingCurrencyCode: string | null;
    vendorCurrencySymbol: string | null;
    listingCurrencySymbol: string | null;
    url: string;
    deliveryCountryId: number;
    currencyId: number;
    userId: number;
}
export interface IListingInit extends IListingBase {
    inaccessible: number | null;
}
export interface IListingCostCalculationData {
    listingId: number;
    productId: number;
    price: number;
    discountedPrice: number;
    listingCurrencyCode: string;
    deliveryPerListing: number | null;
    deliveryPrice: number;
    basketLimit: number;
    bundleId: number | null;
    quantity: number;
    nBundleProducts: number;
    vendorCountryId: number;
    baseTax: number;
    taxPercent: number;
    taxBracketEnd: number | null;
    salesTax: number;
    userCurrencyCode: string;
    userCountryId: number;
    discounts: IDiscount[];
}
export interface IListingForUserProps {
    exchangeRate: number;
    deliveryPrice: number;
    basketLimit: number | null;
    userCountryId: number;
    userCurrencyCode: string;
    listingBaseTax: number | null;
    listingTaxPercent: number | null;
    listingTaxBracketEnd: number | null;
    vendorBaseTax: number | null;
    vendorTaxPercent: number | null;
    vendorTaxBracketEnd: number | null;
    salesTax: number;
    deliveryProfileId: number;
}
export type TListingForUserInit = IListingInit & IListingForUserProps;
export interface IBundleProps {
    bundleId: number;
    quantity: number;
    nBundleProducts: number;
    includedProductId: number;
    includedProductAmount: number;
    includedProductName: string;
    includedProductFormId: number;
    includedProductBrandName: string;
    includedProductAmountUnitId: number;
    includedProductAmountUnit: string;
    includedProductRecDoseUnitId: number;
    includedProductRecDoseUnit: string;
}
export type TBundleListingInit = IListingInit & IBundleProps;
export type TBundleListingForUserInit = TBundleListingInit & TListingForUserInit;
export interface IBundleSaving {
    savingId: number;
    replacableRows: (TProtocolRowData & {
        doseId: number;
    })[];
    replacableRowsCostPerMonth: number;
    replacableRowsFeesPerMonth: number;
    bundle: TProtocolRowData[];
    bundleCostPerMonth: number;
    bundleFeesPerMonth: number;
    leftoverProducts: (TProtocolRowData & {
        doseId: number;
    })[];
    leftoverProductsCostPerMonth: number;
    leftoverProductsFeesPerMonth: number;
    bundleSaving: number;
}
export interface TListingCosts extends IListingCostCalculationData {
    exchangeRate: number;
    priceWithTax: number;
}
export interface IListingInfo extends IProduct, IListingCostCalculationData {
    listingName: string;
    amountUnit: string;
    scrapeTime: Date | null;
    vendorId: number;
    vendorName: string;
    vendorInfo: string | null;
    inaccessible: boolean;
    currencyId: number;
    url: string;
    userId: number | null;
    deliveryCountryId: number | null;
    listingCurrencySymbol: string;
    deliveryPriceEstimated: boolean;
    basketLimitEstimated: boolean;
    taxEstimated: boolean;
}
export type TListingTableRow = TListingCosts & IListingInfo;
export type TListingsTable = TListingTableRow[];
export interface TNewListing {
    name: string;
    productId: number;
    vendorId: number;
    vendorName: string;
    price: number;
    currencyId: number | null | undefined;
    url: string;
}
export interface TVendor {
    vendorId: number;
    name: string;
    countryId: number;
    scrapeTime: Date;
    vendorTaxPercent: number | null;
}
export declare type TVendors = TVendor[];
export interface TProtocolRowCostCalculationData extends IListingCostCalculationData {
    amount: number;
    dose: number;
    doseUnitId: number;
    amountUnitId: number;
    dosesPerDay: number;
    daysPerMonth: number;
}
export interface TProtocolRowCosts extends TListingCosts, TProtocolRowCostCalculationData {
    productsPerMonth: number;
    listingsPerMonth: number;
    repurchase: number;
    costPerMonth: number;
    maxListingsPerOrder: number;
    ordersPerMonth: number;
    feesPerMonth: number;
}
export interface IProtocolRowInfo extends IListingInfo, TProtocolRowCostCalculationData {
    doseUnit: string;
}
export type TProtocolRowData = IProtocolRowInfo & TProtocolRowCosts;
export interface IProtocolTableRow extends TProtocolRowData, IProductInfo {
    doseId: number;
    priority: number;
    unitOptions: TOption[];
    checked?: boolean;
    listingSavings?: TSavingRow[];
    bundleSavings?: IBundleSaving[];
}
export type TProtocolTable = IProtocolTableRow[];
export interface ISaving {
    savingId: number;
    saving: number;
}
export type TSavingRow = ISaving & TProtocolRowData & TListingTableRow;
export declare type TTopic = {
    topicId: number;
    name: string;
};
export interface IRef {
    refId: number;
    title: string;
    date: Date;
    timestamp: string | null;
}
export interface IBookRef extends IRef {
    bookId: number;
    pageNo: number | null;
    bookFormat: string;
}
export interface IPostRef extends IRef {
    url: string;
    platformId: number;
    platform: string;
}
export declare type TRef = (IBookRef | IPostRef) & {
    url?: string;
    platformId?: number;
    platform?: string;
    bookId?: number;
    pageNo?: number;
    bookFormat?: string;
};
export interface ISpiel {
    timestamp: string;
    refs: {
        refId: number;
        timestamp: string;
    }[];
}
export interface TUnit {
    unitId: number;
    name: string;
    formId: number;
}
export declare type TUnits = TUnit[];
export interface IUnitConversion {
    unitConversionId: number;
    productId: number | null;
    fromUnitId: number;
    toUnitId: number;
    factor: number;
}
export declare type TUnitConversions = IUnitConversion[];
export declare enum OrderReminderFrequency {
    MONTHLY = "Monthly",
    FOURWEEKLY = "Every 4 weeks",
    FORTNIGHTLY = "Fortnightly",
    WEEKLY = "Weekly"
}
export interface IDiscountInit {
    discountId: number;
    discountTitle: string | null;
    savingPercent: number;
    discountDesc: string | null;
    discountCompounds: number;
}
export interface IDiscountBase {
    discountId: number;
    title: string | null;
    savingPercent: number;
    desc: string | null;
}
export interface IDiscount extends IDiscountBase {
    compounds: boolean;
    applied: boolean;
}
