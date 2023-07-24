import * as icons from '@mui/icons-material';
export interface IOption {
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
export interface IProductInfo extends IProduct {
    nListingsForUser: number;
}
export interface INewProduct {
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
    replaceableRows: (TProtocolRowData & {
        doseId: number;
    })[];
    replaceableRowsCostPerMonth: number;
    replaceableRowsFeesPerMonth: number;
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
export interface IListingCosts extends IListingCostCalculationData {
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
export type TListingTableRow = IListingCosts & IListingInfo;
export interface INewListing {
    name: string;
    productId: number;
    vendorId: number;
    vendorName: string;
    price: number;
    currencyId: number | null | undefined;
    url: string;
}
export interface IVendor {
    vendorId: number;
    name: string;
    countryId: number;
    scrapeTime: Date;
    vendorTaxPercent: number | null;
}
export interface IProtocolRowCostCalculationData extends IListingCostCalculationData {
    amount: number;
    dose: number;
    doseUnitId: number;
    amountUnitId: number;
    dosesPerDay: number;
    daysPerMonth: number;
}
export interface IProtocolRowCosts extends IListingCosts, IProtocolRowCostCalculationData {
    productsPerMonth: number;
    listingsPerMonth: number;
    repurchase: number;
    costPerMonth: number;
    maxListingsPerOrder: number;
    ordersPerMonth: number;
    feesPerMonth: number;
}
export interface IProtocolRowInfo extends IListingInfo, IProtocolRowCostCalculationData {
    doseUnit: string;
}
export type TProtocolRowData = IProtocolRowInfo & IProtocolRowCosts;
export interface ISaving {
    savingId: number;
    saving: number;
}
export type TSavingRow = ISaving & TProtocolRowData & TListingTableRow;
export declare interface ITopic {
    topicId: number;
    name: string;
}
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
export interface IUnit {
    unitId: number;
    name: string;
    formId: number;
}
export interface IUnitConversion {
    unitConversionId: number;
    productId: number | null;
    fromUnitId: number;
    toUnitId: number;
    factor: number;
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
export declare enum OrderReminderFrequency {
    MONTHLY = 30,
    FOURWEEKLY = 28,
    FORTNIGHTLY = 14,
    WEEKLY = 7
}
export interface IOrderReminder {
    active?: boolean;
    date?: Date | null;
    frequency?: OrderReminderFrequency;
}
export type KIconName = keyof typeof icons;
