import {
  asNumberOrUndefined,
  enforceListingTypes,
  enforceDosingsTypes,
  enforceProtocolInfoTypes,
  enforceProtocolWithDosingsTypes,
  EnforcableListingTypes,
  EnforcableDosingTypes } from './enforceTypes.js';
export {
  asNumberOrUndefined,
  enforceListingTypes,
  enforceDosingsTypes,
  enforceProtocolInfoTypes,
  enforceProtocolWithDosingsTypes,
  EnforcableListingTypes,
  EnforcableDosingTypes };

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
  suppId: number,
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

export interface ListingCostCalculationData
{
  listingId: number;
  productId: number;
  price: number;
  vendorCurrencyCode: string;
  listingCurrencyCode: string;
  deliveryPerListing?: number;
  deliveryPrice?: number;
  basketLimit: number;
  bundleId?: number;
  quantity?: number;
  nBundleProducts?: number;
  vendorCountryId: number;
  baseTax: number;
  taxPercent?: number;
  taxBracketEnd?: number;
  salesTax?: number;
  userCurrencyCode: string;
  protocolCurrencyCode?: string;
  userCountryId: number;
  discounts?: IDiscount[];
}


export interface IBundleSaving
{
  savingId: number

  replaceableRows: (IDosingInfo & ListingInfo & DosingCosts & { dosingId: number })[];

  replaceableRowsCostPerMonth: number;
  replaceableRowsFeesPerMonth: number,

  bundle: (ListingInfo & DosingCosts & { suppId: number })[],

  bundleCostPerMonth: number;
  bundleFeesPerMonth: number;

  // reduced nProductsPerMonth (nProductsOutsideBundlePerMonth) satisfied by lowering daysPerMonth
  leftoverProducts: (IDosingInfo & ListingInfo & DosingCosts & { dosingId: number })[];

  leftoverProductsCostPerMonth: number;
  leftoverProductsFeesPerMonth: number;

  // bundleSaving = replaceable rows costs - (bundle costs + leftover products costs), +ve for saving
  bundleSaving: number;
}

export interface ListingCosts extends ListingCostCalculationData
{
  exchangeRate: number;
  priceWithFees: number;
  priceWithoutFees: number;
  discountedPrice: number;
  maxListingsPerOrder: number;
  feesPerOrder: number;
  orderFeesPerListing: number;
}

export interface ListingInfo extends Product, ListingCostCalculationData
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
  vendorCurrencySymbol: string;
  listingCurrencySymbol: string;
  deliveryPriceEstimated?: boolean;
  basketLimitEstimated?: boolean;
  taxEstimated?: boolean;
}

export type TListingTableRow = ListingCosts & ListingInfo;

export interface NewListing
{
  name: string,
  productId?: number,
  vendorId: number,
  vendorName: string,
  price?: number,
  currencyId?: number,
  url: string,
  bundleProducts?: { productId: number, quantity: number }[]
}

export interface Vendor
{
  vendorId: number;
  name: string;
  countryId: number;
  scrapeTime: Date;
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

export interface DosingCostCalculationData extends ListingCostCalculationData, Dosing, Amount
{
  factor: number,
}


export interface DosingCosts extends ListingCosts, DosingCostCalculationData
{
  productsPerMonth: number;
  listingsPerMonth: number;
  repurchase: number;
  costPerMonthWithFees: number;
  costPerMonthWithoutFees: number;
  maxListingsPerOrder: number;
  ordersPerMonth: number;
}

export interface IDosingInfo extends Partial<ListingInfo>, Partial<DosingCostCalculationData>
{
  doseUnit: string;
  note?: string;
}

export interface ISaving
{
  savingId: number,
  saving: number
}

export type TSavingRow = ISaving & IDosingInfo & DosingCosts & TListingTableRow;


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
  productId?: number;
}

export interface IUnitConversion
{
  unitConversionId: number;
  productId?: number;
  fromUnitId: number;
  toUnitId: number;
  factor: number;
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


// Clients

export type DosingRowData = IDosingInfo & Partial<DosingCosts> & DosingInfo;

export interface DosingRowState
{
  checked?: boolean;
}

export interface IDosingRow extends DosingRowData, Partial<Product>, DosingRowState
{
  dosingId: number;
  suppId: number;
  suppName: string;
  priority: number;
}

export interface ProtocolInfoRes
{
  protocolId: number,
  name: string,
  orderReminderActive: boolean,
  edit?: boolean,
  public: boolean,
  userId: number,
  username: string,
  budget?: number,
  sharedWith: { username: string, userId: number, edit: boolean }[],
  currencyId: number,
  currencyCode: string,
  currencySymbol: string,
  folderId?: number,
  fees: boolean
}

export interface DosingRowWithSavings extends IDosingRow
{
  listingSavings?: TSavingRow[];
  bundleSavings?: IBundleSaving[];   // duplicate bundle saving data for every protocol row bundle replaces (for now)
}

export interface ProtocolDosingRow extends DosingRowWithSavings
{
  unitOptions: IOption[];
}

export interface ProtocolWithDosingsRes extends ProtocolInfoRes
{
  dosings: ProtocolDosingRow[]
}