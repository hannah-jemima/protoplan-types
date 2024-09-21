import { IBundleSaving, IDiscount, TSavingRow } from ".";


export interface EnforcableTypes
{
  dose?: number | null,
  recDose?: number | null,
  price?: number | null,
  discountedPrice?: number | null,
  baseTax?: number | null,
  taxPercent?: number | null,
  taxBracketEnd?: number | null,
  salesTax?: number | null,
  deliveryPrice?: number | null,
  exchangeRate?: number | null,
  amount?: number | null,
  amountUnit?: string | null,
  scrapeTime?: Date | null,
  basketLimit?: number | null
  inaccessible?: number | null | boolean,
  discounts?: IDiscount[],
  deliveryPerListing?: number | null
}

export interface EnforcableProps extends EnforcableTypes
{
  listingSavings?: TSavingRow[] | null,
  bundleSavings?: IBundleSaving[] | null
}


export function enforceListingTypes<T>(listings: (T & EnforcableProps & { priceWithFees: number })[])
{
  return enforceDosingsTypes(listings).map(l => ({
    ...l,
    priceWithFees: Number(l.priceWithFees) }));
}


export function enforceDosingsTypes<T>(rows: (T & EnforcableProps)[])
{
  return rows.map(r => ({
    ...enforceDosingTypes(r),
    listingSavings: r.listingSavings?.map(ls => enforceDosingTypes(ls)),
    bundleSavings: r.bundleSavings?.map(bs => ({
      ...bs,
      replacableRows: bs.replaceableRows.map(r => enforceDosingTypes(r)),
      bundle: bs.bundle.map(r => enforceDosingTypes(r)),
      leftoverProducts: bs.leftoverProducts.map(r => enforceDosingTypes(r)) })) as IBundleSaving[] | undefined}));
}

function enforceDosingTypes<T>(row: T & EnforcableTypes)
{
  return {
    ...row,
    dose: asNumberOrUndefined(row.dose),
    recDose: asNumberOrUndefined(row.recDose),
    price: asNumberOrUndefined(row.price),
    discountedPrice: asNumberOrUndefined(row.discountedPrice),
    baseTax: asNumberOrUndefined(row.baseTax),
    taxPercent: asNumberOrUndefined(row.taxPercent),
    taxBracketEnd: asNumberOrUndefined(row.taxBracketEnd),
    salesTax: asNumberOrUndefined(row.salesTax),
    deliveryPrice: asNumberOrUndefined(row.deliveryPrice),
    exchangeRate: asNumberOrUndefined(row.exchangeRate),
    amount: asNumberOrUndefined(row.amount),
    amountUnit: asStringOrUndefined(row.amountUnit),
    scrapeTime: asDateOrUndefined(row.scrapeTime),
    basketLimit: asNumberOrUndefined(row.basketLimit),
    inaccessible: row.inaccessible === 1,
    discounts: row.discounts?.map(d => ({ ...d, savingPercent: Number(d.savingPercent),
    deliveryPerListing: asNumberOrUndefined(row.deliveryPerListing) })) };
}

function asNumberOrUndefined(prop?: number | null | string)
{
  if(typeof(prop) === "string")
    return parseFloat(prop) || (parseFloat(prop) === 0 ? 0 : undefined);
  else if(prop === null)
    return undefined;
  else if(prop === undefined)
    return undefined;
  else
    return Number(prop);
}

function asStringOrUndefined(prop?: string | null)
{
  return prop !== undefined ? String(prop) : undefined;
}

function asDateOrUndefined(prop?: Date | null)
{
  return prop ? new Date(prop) : undefined;
}

