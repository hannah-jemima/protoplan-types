import { IBundleSaving, IDiscount, ProtocolInfoRes, ProtocolWithDosingsRes, TSavingRow } from ".";


export interface EnforcableListingTypes
{
  recDose?: number | null,
  price?: number | null,
  discountedPrice?: number | null,
  priceWithFees?: number,
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
  deliveryPerListing?: number | null,
}

export interface EnforcableDosingTypesWithoutSavings extends EnforcableListingTypes
{
  dose?: number | null,
}

export interface EnforcableDosingTypes extends EnforcableDosingTypesWithoutSavings
{
  listingSavings?: TSavingRow[] | null,
  bundleSavings?: IBundleSaving[] | null
}

export function enforceProtocolWithDosingsTypes(protocol: ProtocolWithDosingsRes)
{
  return ({
    ...enforceProtocolInfoTypes(protocol),
    dosings: enforceDosingsTypes(protocol.dosings) });
}

export function enforceProtocolInfoTypes(protocol: ProtocolInfoRes)
{
  return ({
    ...protocol,
    budget: (protocol.budget !== undefined) ? Number(protocol.budget) : undefined,
    orderReminderActive: Boolean(protocol.orderReminderActive),
    public: Boolean(protocol.public),
    shareDialog: false,
    sharedWith: protocol.sharedWith.map(u => ({ ...u, edit: Boolean(u.edit) })),
    folderId: protocol.folderId ? Number(protocol.folderId) : undefined });
}

export function enforceDosingsTypes<T>(rows: (T & EnforcableDosingTypes)[])
{
  return rows.map(r => ({
    ...enforceDosingTypesWithoutSavings(r),
    listingSavings: r.listingSavings?.map(ls => enforceDosingTypesWithoutSavings(ls)),
    bundleSavings: r.bundleSavings?.map(bs => ({
      ...bs,
      replacableRows: bs.replaceableRows.map(r => enforceDosingTypesWithoutSavings(r)),
      bundle: bs.bundle.map(r => enforceDosingTypesWithoutSavings(r)),
      leftoverProducts: bs.leftoverProducts.map(r => enforceDosingTypesWithoutSavings(r)) })) as IBundleSaving[] | undefined}));
}

function enforceDosingTypesWithoutSavings<T>(r: T & EnforcableDosingTypes)
{
  return {
    ...enforceListingTypes(r),
    dose: asNumberOrUndefined(r.dose) };
}

export function enforceListingTypes<T>(r: T & EnforcableListingTypes)
{
  return {
    ...r,
    recDose: asNumberOrUndefined(r.recDose),
    price: asNumberOrUndefined(r.price),
    discountedPrice: asNumberOrUndefined(r.discountedPrice),
    priceWithFees: asNumberOrUndefined(r.priceWithFees),
    baseTax: asNumberOrUndefined(r.baseTax),
    taxPercent: asNumberOrUndefined(r.taxPercent),
    taxBracketEnd: asNumberOrUndefined(r.taxBracketEnd),
    salesTax: asNumberOrUndefined(r.salesTax),
    deliveryPrice: asNumberOrUndefined(r.deliveryPrice),
    exchangeRate: asNumberOrUndefined(r.exchangeRate),
    amount: asNumberOrUndefined(r.amount),
    amountUnit: asStringOrUndefined(r.amountUnit),
    scrapeTime: asDateOrUndefined(r.scrapeTime),
    basketLimit: asNumberOrUndefined(r.basketLimit),
    inaccessible: r.inaccessible === 1,
    discounts: r.discounts?.map(d => ({ ...d, savingPercent: Number(d.savingPercent),
    deliveryPerListing: asNumberOrUndefined(r.deliveryPerListing) })) };
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

