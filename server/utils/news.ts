export const politicsSearchString = 'politics | elections | government'
export const financeSearchString = 'ipo | feds | IRS| finance | tax | bank | money | business | inflation | tax'
export const forexSearchString = 'forex | foreign exchange | currency | curencies'
export const cryptoSearchString = 'crypto | blockchain | defi | cryptocurrency | airdrop | web3 | web4 | digital assets | cryptocurencies'
export function getNewsSearchString(cat: string) {
    if (cat === "politics") return politicsSearchString
    if (cat === "finance") return financeSearchString
    if (cat === "forex") return forexSearchString
    if (cat === "crypto") return cryptoSearchString
}