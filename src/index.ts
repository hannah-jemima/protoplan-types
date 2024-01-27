import { enforceDosingsTypes, enforceListingTypes, IEnforcableTypes, IEnforcableProps } from './enforceTypes.js';
export {
  enforceDosingsTypes,
  enforceListingTypes,
  IEnforcableTypes,
  IEnforcableProps };

export interface IOption
{
  label: string;
  value: number;
  input?: string;
}


export interface ICurrency
{
  currencyId: number,
  code: string,
  symbol?: string
}

export interface ICountry
{
  countryId: number;
  name: string;
  currency: ICurrency;
  popularity: number;
}



export interface Product extends Amount
{
  productId: number;
  productName: string;
  brandName: string;
  amountUnit: string;
  recDose?: number;
  recDoseUnitId?: number;
  recDoseUnit?: string;
  formId: number;
  userId?: number;
}

export interface IProductInfo extends Product
{
  deliverableListingsForUser: boolean;
}

export interface NewProduct extends Partial<Amount>
{
  name: string,
  brandId: number,
  brandName?: string,
  suppId?: number,
  suppName?: string,
  amount: number,
  amountUnitId: number,
  recDose?: number,
  recDoseUnit?: string,
  recDoseUnitId?: number,
  recDosesPerDay?: number,
  activeIngredientPerRecDose?: number,
  activeIngredientPerRecDoseUnitId?: number,
}

export interface IListingBase extends IDiscountInit, Amount
{
  listingId: number,
  listingName: string,
  brandName: string,
  productId: number,
  productName: string,
  amountUnit: string,
  recDoseUnitId?: number,
  recDoseUnit?: string,
  formId: number,
  vendorId: number,
  vendorName: string,
  vendorInfo?: string;
  vendorScrapeTime?: Date,
  price: number,
  scrapedPrice?: number,
  scrapeTime?: Date,
  deliveryPerListing: number,
  vendorCountryId: number,
  vendorCurrencyCode: string,
  listingCurrencyCode?: string,
  vendorCurrencySymbol?: string,
  listingCurrencySymbol?: string,
  url: string,
  deliveryCountryId: number,
  currencyId: number,
  userId: number,
}

export interface IListingInit extends IListingBase
{
  inaccessible?: number
}

export interface ListingCostCalculationData
{
  listingId: number;
  productId: number;
  price: number;
  listingCurrencyCode: string;
  deliveryPerListing?: number;
  deliveryPrice?: number;
  basketLimit?: number;
  bundleId?: number;
  quantity?: number;
  nBundleProducts?: number;
  vendorCountryId: number;
  baseTax?: number;
  taxPercent?: number;
  taxBracketEnd?: number;
  salesTax?: number;
  userCurrencyCode: string;
  userCountryId: number;
  discounts?: IDiscount[];
}

export interface IListingForUserProps
{
  exchangeRate: number,
  deliveryPrice: number,
  basketLimit?: number,
  userCountryId: number,
  userCurrencyCode: string,
  listingBaseTax?: number,
  listingTaxPercent?: number,
  listingTaxBracketEnd?: number,
  vendorBaseTax?: number,
  vendorTaxPercent?: number,
  vendorTaxBracketEnd?: number,
  salesTax: number,
  deliveryProfileId: number
}

export type TListingForUserInit = IListingInit & IListingForUserProps


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


export type TBundleListingForUserInit = TBundleListingInit & TListingForUserInit


export interface IBundleSaving
{
  savingId: number

  replaceableRows: (IDosingInfo & IListingInfo & IDosingCosts & { dosingId: number })[];

  replaceableRowsCostPerMonth: number;
  replaceableRowsFeesPerMonth: number,

  bundle: (IListingInfo & IDosingCosts)[],

  bundleCostPerMonth: number;
  bundleFeesPerMonth: number;

  // reduced nProductsPerMonth (nProductsOutsideBundlePerMonth) satisfied by lowering daysPerMonth
  leftoverProducts: (IDosingInfo & IListingInfo & IDosingCosts & { dosingId: number })[];

  leftoverProductsCostPerMonth: number;
  leftoverProductsFeesPerMonth: number;

  // bundleSaving = replaceable rows costs - (bundle costs + leftover products costs), +ve for saving
  bundleSaving: number;
}

export interface IListingCosts extends ListingCostCalculationData
{
  exchangeRate: number;
  priceWithTax: number;
  discountedPrice: number;
}

export interface IListingInfo extends Product, ListingCostCalculationData
{
  listingName: string;
  amountUnit: string;
  scrapeTime?: Date;
  vendorId: number;
  vendorName: string;
  vendorInfo?: string;
  inaccessible?: boolean;
  currencyId: number;
  url: string;
  userId?: number;
  deliveryCountryId?: number;
  listingCurrencySymbol: string;
  deliveryPriceEstimated?: boolean;
  basketLimitEstimated?: boolean;
  taxEstimated?: boolean;
}

export type TListingTableRow = IListingCosts & IListingInfo;

export interface NewListing
{
  name: string,
  productId: number,
  vendorId: number,
  vendorName: string,
  price?: number,
  currencyId?: number,
  url: string,
  bundleProducts: { productId: number, quantity: number }[]
}

export interface Vendor
{
  vendorId: number;
  name: string;
  countryId: number;
  scrapeTime: Date;
  vendorTaxPercent?: number;
}

export interface Dosing
{
  dose: number;
  doseUnitId: number;
  dosesPerDay: number;
  daysPerMonth: number;
}

export interface DosingInfo extends Dosing
{
  doseUnit: string;
}

export interface Amount
{
  amount: number;
  amountUnitId: number;
}

export type TDosingCostCalculationData = ListingCostCalculationData & Dosing & Amount


export interface IDosingCosts extends IListingCosts, TDosingCostCalculationData
{
  productsPerMonth: number;
  listingsPerMonth: number;
  repurchase: number;
  costPerMonth: number;
  maxListingsPerOrder: number;
  ordersPerMonth: number;
  feesPerMonth: number;
}

export interface IDosingInfo extends Partial<IListingInfo>, Partial<TDosingCostCalculationData>
{
  doseUnit: string;
}

export type TDosingRowData = IDosingInfo & Partial<IDosingCosts>;

export interface IDosingRowState
{
  checked?: boolean;
  priority: number;
}

export interface IDosingRow extends TDosingRowData, Partial<Product>, IDosingRowState
{
  dosingId: number;
  suppId: number;
  suppName: string;
}

export interface ISaving
{
  savingId: number,
  saving: number
}

export type TSavingRow = ISaving & IDosingInfo & IDosingCosts & TListingTableRow;


export declare interface ITopic
{
  topicId: number;
  name: string;
};

export interface IRef
{
  refId: number;
  title: string;
  date: Date;
  timestamp?: string;
}

export interface IBookRef extends IRef
{
  bookId: number;
  pageNo?: number;
  bookFormat: string;
}

export interface IPostRef extends IRef
{
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
  timestamp: string,
  refs: { refId: number, timestamp: string }[],
}

export interface IUnit
{
  unitId: number;
  name: string;
  formId: number;
}

export interface IUnitConversion
{
  unitConversionId: number;
  productId?: number;
  fromUnitId: number;
  toUnitId: number;
  factor: number;
}




export interface IDiscountInit
{
  discountId: number,
  discountTitle?: string,
  savingPercent: number,
  discountDesc?: string,
  discountCompounds: number
}

export interface IDiscountBase
{
  discountId: number,
  title?: string,
  savingPercent: number,
  desc?: string,
}

export interface IDiscount extends IDiscountBase
{
  compounds: boolean,
  applied: boolean
}


export enum OrderReminderFrequency
{
  MONTHLY = 30,
  FOURWEEKLY = 28,
  FORTNIGHTLY = 14,
  WEEKLY = 7
}

export interface IOrderReminder
{
  active?: boolean,
  date?: Date,
  frequency?: OrderReminderFrequency
}
