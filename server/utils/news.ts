export const politicsSearchString = 'politics | elections | government'
export const financeSearchString = 'ipo | feds | IRS| finance | tax | bank | money | business | inflation | tax'

export const forexSearchString = 'forex | foreign exchange | currency | curencies|GDP|Inflation|Interest Rates|Unemployment Rate|Trade Balance|Central Bank|Quantitative Easing|Interest Rate Hike|Monetary Policy Meeting|Trade Wars|Political Instability|Natural Disasters|Brexit|Global Conflicts|Currency Pairs|Volatility|Risk Appetite|Technical Analysis|Fundamental Analysis|Market Sentiment'
export const cryptoSearchString = 'crypto | blockchain | defi | cryptocurrency | web3 | web4 | digital assets | cryptocurencies Bitcoin|Ethereum|Cryptocurrency|Blockchain|NFT|Decentralized Finance|Crypto Exchange|Crypto Wallet|Mining|ICO|Token|Market Cap|Volatility|Regulation|Hack|Scam|Blockchain Technology|Digital Currency|Altcoin|Bull Run|Bear Market|Crypto News|Crypto Community|Cryptocurrency Investment|Crypto Trading|Crypto Adoption|Crypto Future|Crypto Market|Crypto Price|Crypto Analysis|Crypto Trends|Crypto Projects'

export function getNewsSearchString(cat: string) {
    if (cat === "politics") return politicsSearchString
    if (cat === "finance") return financeSearchString
    if (cat === "forex") return forexSearchString
    if (cat === "crypto") return cryptoSearchString
}