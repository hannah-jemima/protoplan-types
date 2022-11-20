
export interface TOption
{
  label: string;
  value: number;
  input?: string;
}


export interface ICurrency
{
  currencyId: number,
  code: string,
  symbol: string | null
}

export interface ICountry
{
  countryId: number;
  name: string;
  currency: ICurrency;
  popularity: number;
}



export interface TProduct
{
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
export declare type TProducts = TProduct[];



export interface TNewProduct
{
  name: string,
  brandId?: number,
  brandName?: string,
  amount?: number,
  amountUnitId?: number,
  recDose?: number,
  recDoseUnitId?: number
}

export interface IListingCostCalculationData
{
  listingId: number;
  productId: number;
  price: number;
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
  userCurrencyCode: string;
  userCountryId: number;
}

export interface TListingCosts extends IListingCostCalculationData
{
  exchangeRate: number;
  priceWithTax: number;
}

export interface IListingInfo extends TProduct, IListingCostCalculationData
{
  listingName: string;
  amountUnit: string;
  scrapeTime: Date | null;
  vendorId: number;
  vendorName: string;
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

export type TListingTableRow = TListingCosts & IListingInfo

export type TListingsTable = TListingTableRow[];

export interface TNewListing
{
  name: string,
  productId: number,
  vendorId: number,
  vendorName: string,
  price: number,
  currencyId: number | null | undefined,
  url: string
}

export interface TVendor
{
  vendorId: number;
  name: string;
  countryId: number;
  scrapeTime: Date;
  vendorTaxPercent: number | null;
}
export declare type TVendors = TVendor[];


export interface TProtocolRowCostCalculationData extends IListingCostCalculationData
{
  amount: number;
  dose: number;
  doseUnitId: number;
  amountUnitId: number;
  dosesPerDay: number;
  daysPerMonth: number;
}

export interface TProtocolRowCosts extends TListingCosts, TProtocolRowCostCalculationData
{
  productsPerMonth: number;
  listingsPerMonth: number;
  repurchase: number;
  costPerMonth: number;
  maxListingsPerOrder: number;
  ordersPerMonth: number;
  feesPerMonth: number;
}

export interface IProtocolRowInfo extends IListingInfo, TProtocolRowCostCalculationData
{
  doseUnit: string;
}

export type TProtocolRowData = IProtocolRowInfo & TProtocolRowCosts;

export interface IProtocolTableRow extends TProtocolRowData
{
  protocolId: number;
  priority: number;
  unitOptions: TOption[],
  checked?: boolean
  listingSavings?: TSavingRow[];
  bundleSavings?: IBundleSaving[];   // duplicate bundle saving data for every protocol row bundle replaces (for now)
}


export interface ISaving
{
  saving: number
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
  url?: string,
  platformId?: number,
  platform?: string,
  bookId?: number,
  pageNo?: number,
  bookFormat?: string };

export interface ISpiel
{
  topicId: number,
  postId: number,
  title: string,
  date: Date,
  url: string,
  platform: string,
  refs: { refId: number, timestamp: string }[],
  mediaId: string | null
}

export interface TUnit
{
  unitId: number;
  name: string;
  formId: number;
}
export declare type TUnits = TUnit[];

export interface TUnitConversion
{
  unitConversionId: number;
  productId: number;
  fromUnitId: number;
  toUnitId: number;
  factor: number;
}
export declare type TUnitConversions = TUnitConversion[];


export interface IOrderReminder
{
  orderReminder: boolean | null,
  reminderDate: Date | null,
  reminderFrequency: string | null
}


interface IListingBase
{
  listingId: number,
  listingName: string,
  brandName: string,
  productId: number,
  productName: string,
  amount: number,
  amountUnitId: number,
  amountUnit: string,
  recDoseUnitId: number | null,
  recDoseUnit: string | null,
  formId: number,
  vendorId: number,
  vendorName: string,
  vendorScrapeTime: Date | null,
  price: number,
  scrapedPrice: number | null,
  scrapeTime: Date | null,
  deliveryPerListing: number,
  vendorCountryId: number,
  vendorCurrencyCode: string,
  listingCurrencyCode: string | null,
  vendorCurrencySymbol: string | null,
  listingCurrencySymbol: string | null,
  url: string,
  deliveryCountryId: number,
  currencyId: number,
  userId: number
}

export interface IListingInit extends IListingBase
{
  inaccessible: number | null
}

export interface IBundleProps
{
  bundleId: number,
  quantity: number,
  nBundleProducts: number,

  includedProductId: number,
  includedProductAmount: number,
  includedProductName: string,
  includedProductFormId: number,
  includedProductBrandName: string,
  includedProductAmountUnitId: number,
  includedProductAmountUnit: string,
  includedProductRecDoseUnitId: number,
  includedProductRecDoseUnit: string,
}

export type TBundleListingInit = IListingInit & IBundleProps;

interface IConfirmedPrices
{
  listingCurrencyCode: string,
  listingCurrencySymbol: string,
  price: number
}

interface IListingForUserProps
{
  exchangeRate: number,
  vendorDeliveryCountryId: number,
  deliveryPrice: number,
  basketLimit: number | null,
  userCountryId: number,
  userCurrencyCode: string,
  listingBaseTax: number | null,
  listingTaxPercent: number | null,
  listingTaxBracketEnd: number | null,
  vendorBaseTax: number | null,
  vendorTaxPercent: number | null,
  vendorTaxBracketEnd: number | null,
}

export type TListingForUserInit = IListingInit & IListingForUserProps

export type TBundleListingForUserInit = TBundleListingInit & TListingForUserInit


interface IBundleSaving
{
  replacableRows: TProtocolRowData[];

  replacableRowsCostPerMonth: number;
  replacableRowsFeesPerMonth: number,

  bundle: TProtocolRowData[],

  bundleCostPerMonth: number;
  bundleFeesPerMonth: number;

  leftoverProducts: TProtocolRowData[]    // reduced nProductsPerMonth (nProductsOutsideBundlePerMonth) satisfied by lowering daysPerMonth

  leftoverProductsCostPerMonth: number;
  leftoverProductsFeesPerMonth: number;

  bundleSaving: number;   // = replacable rows costs - (bundle costs + leftover products costs), +ve for saving
}
