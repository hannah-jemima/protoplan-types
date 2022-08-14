export interface TCountry {
  countryId: number;
  name: string;
  code: string;
  currencyCode: string;
}
export declare type TCountries = TCountry[];


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

export interface TNewProduct
{
  name: string,
  brandId: number,
  brandName: string,
  amount: number,
  amountUnitId: number,
  recDose?: number,
  recDoseUnitId?: number
}

export declare type TListingCosts = {
  listingId: number;
  productId: number;
  price: number;
  listingCurrencyCode: string;
  exchangeRate: number;
  deliveryPerProduct: number | null;
  deliveryPrice: number;
  bundleId: number | null;
  quantity: number;
  nBundleProducts: number;
  vendorCountryId: number;
  baseTax: number | null;
  taxPercent: number | null;
  taxBracketEnd: number | null;
  basketLimit: number;
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

export interface TVendor {
  vendorId: number;
  name: string;
  countryId: number;
  scrapeTime: Date;
  vendorTaxPercent: number | null;
}
export declare type TVendors = TVendor[];



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
  formatId: number;
}
export interface IPostRef extends IRef {
  url: string;
  platformId: number;
  platform: string;
}
export declare type TRef = IBookRef | IPostRef;


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
