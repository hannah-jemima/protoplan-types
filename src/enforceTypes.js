export function enforceDosingsTypes(rows) {
    return rows.map(r => ({
        ...enforceDosingTypes(r),
        listingSavings: r.listingSavings?.map(ls => enforceDosingTypes(ls)),
        bundleSavings: r.bundleSavings?.map(bs => ({
            ...bs,
            replacableRows: bs.replaceableRows.map(r => enforceDosingTypes(r)),
            bundle: bs.bundle.map(r => enforceDosingTypes(r)),
            leftoverProducts: bs.leftoverProducts.map(r => enforceDosingTypes(r))
        }))
    }));
}
function enforceDosingTypes(row) {
    return {
        ...row,
        price: Number(row.price),
        discountedPrice: row.discountedPrice !== undefined ? Number(row.discountedPrice) : undefined,
        baseTax: row.baseTax !== undefined ? Number(row.baseTax) : undefined,
        taxPercent: row.taxPercent !== undefined ? Number(row.taxPercent) : undefined,
        salesTax: row.salesTax !== undefined ? Number(row.salesTax) : undefined,
        deliveryPrice: row.deliveryPrice !== undefined ? Number(row.deliveryPrice) : undefined,
        amount: Number(row.amount),
        amountUnit: String(row.amountUnit),
        scrapeTime: row.scrapeTime ? new Date(row.scrapeTime) : row.scrapeTime,
        basketLimit: row.basketLimit ? Number(row.basketLimit) : row.basketLimit,
        inaccessible: row.inaccessible === 1,
        discounts: row.discounts?.map(d => ({ ...d, savingPercent: Number(d.savingPercent) }))
    };
}
export function enforceListingTypes(listings) {
    return enforceDosingsTypes(listings).map(l => ({
        ...l,
        priceWithTax: Number(l.priceWithTax)
    }));
}
