import { IBundleSaving, IDiscount, TSavingRow } from ".";


export interface IEnforcableTypes
{
  dose?: number | null,
  recDose?: number | null,
  price?: number | null,
  discountedPrice?: number | null,
  baseTax?: number | null,
  taxPercent?: number | null,
  salesTax?: number | null,
  deliveryPrice?: number | null,
  exchangeRate?: number | null,
  amount?: number | null,
  amountUnit?: string | null,
  scrapeTime?: Date | null,
  basketLimit?: number | null
  inaccessible?: number | null | boolean,
  discounts?: IDiscount[]
}

export interface IEnforcableProps extends IEnforcableTypes
{
  listingSavings?: TSavingRow[] | null,
  bundleSavings?: IBundleSaving[] | null
}


export function enforceListingTypes<T>(listings: (T & IEnforcableProps & { priceWithTax: number })[])
{
  return enforceDosingsTypes(listings).map(l => ({
    ...l,
    priceWithTax: Number(l.priceWithTax) }));
}


export function enforceDosingsTypes<T>(rows: (T & IEnforcableProps)[])
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

function enforceDosingTypes<T>(row: T & IEnforcableTypes)
{
  return {
    ...row,
    dose: asNumberOrUndefined(row.dose),
    recDose: asNumberOrUndefined(row.recDose),
    price: asNumberOrUndefined(row.price),
    discountedPrice: asNumberOrUndefined(row.discountedPrice),
    baseTax: asNumberOrUndefined(row.baseTax),
    taxPercent: asNumberOrUndefined(row.taxPercent),
    salesTax: asNumberOrUndefined(row.salesTax),
    deliveryPrice: asNumberOrUndefined(row.deliveryPrice),
    exchangeRate: asNumberOrUndefined(row.exchangeRate),
    amount: asNumberOrUndefined(row.amount),
    amountUnit: asStringOrUndefined(row.amountUnit),
    scrapeTime: asDateOrUndefined(row.scrapeTime),
    basketLimit: asNumberOrUndefined(row.basketLimit),
    inaccessible: row.inaccessible === 1,
    discounts: row.discounts?.map(d => ({ ...d, savingPercent: Number(d.savingPercent) })) };
}

function asNumberOrUndefined(prop?: number | null)
{
  return prop !== undefined ? Number(prop) : undefined;
}

function asStringOrUndefined(prop?: string | null)
{
  return prop !== undefined ? String(prop) : undefined;
}

function asDateOrUndefined(prop?: Date | null)
{
  return prop ? new Date(prop) : undefined;
}

