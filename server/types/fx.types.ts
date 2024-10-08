export interface ExchangeData {
    data: Exchange[] | CryptoExchange[];
    status: string;
}

export interface Exchange {
    name: string;
    code: string;
    country: string;
    timezone: string;
}

export interface CryptoExchange {
    name: string;
}

export interface FxPairsData {
    data: FxPair[];
    count: number;
    status: string;
}

export interface FxPair {
    symbol: string;
    currency_group: CurrencyGroup;
    currency_base: string;
    currency_quote: string;
}

export enum CurrencyGroup {
    Exotic = "Exotic",
    ExoticCross = "Exotic-Cross",
    Major = "Major",
    Minor = "Minor",
}
export interface CryptocurrencyData {
    data: Cryptocurrency[];
    count: number;
    status: string;
}

export interface Cryptocurrency {
    symbol: string;
    available_exchanges: string[];
    currency_base: string;
    currency_quote: CurrencyQuote;
}

export enum CurrencyQuote {
    ArgentinianPeso = "Argentinian Peso",
    AustralianDollar = "Australian Dollar",
    Bancor = "Bancor",
    BinanceCoin = "Binance Coin",
    BinanceUSD = "Binance USD",
    BitCNY = "bitCNY",
    Bitcoin = "Bitcoin",
    BitcoinCash = "Bitcoin Cash",
    Bnb = "BNB",
    BrazilReal = "Brazil Real",
    BritishPound = "British Pound",
    CanadianDollar = "Canadian Dollar",
    ChineseYuan = "Chinese Yuan",
    Dai = "Dai",
    Dogecoin = "Dogecoin",
    EOS = "EOS",
    Ethereum = "Ethereum",
    Euro = "Euro",
    GoldSpot = "Gold Spot",
    HongKongDollar = "Hong Kong Dollar",
    HuobiToken = "Huobi Token",
    IndianRupee = "Indian Rupee",
    IndonesianRupiah = "Indonesian Rupiah",
    IsraeliShekel = "Israeli Shekel",
    JapaneseYen = "Japanese Yen",
    KoreanWon = "Korean Won",
    KuCoinShares = "KuCoin Shares",
    Litecoin = "Litecoin",
    MalaysianRinggit = "Malaysian Ringgit",
    MexicanPeso = "Mexican Peso",
    NewZealandDollar = "New Zealand Dollar",
    NigerianNaira = "Nigerian Naira",
    PeruSol = "Peru Sol",
    PolishZloty = "Polish Zloty",
    RussianRuble = "Russian Ruble",
    SaudiRiyal = "Saudi Riyal",
    SingaporeDollar = "Singapore Dollar",
    SouthAfricanRand = "South African Rand",
    SwedishKrona = "Swedish Krona",
    SwissFranc = "Swiss Franc",
    TRON = "TRON",
    ThaiBaht = "Thai Baht",
    TrueAUD = "TrueAUD",
    TurkishLira = "Turkish Lira",
    UAEDirham = "UAE Dirham",
    USDCoin = "USD Coin",
    USDollar = "US Dollar",
    UgandanShilling = "Ugandan Shilling",
    UkrainianHryvnia = "Ukrainian Hryvnia",
    VietnameseDong = "Vietnamese Dong",
    Waves = "Waves",
    Xrp = "XRP",
    ZambiaKwacha = "Zambia Kwacha",
}

export interface CountryData {
    data: Country[];
}

export interface Country {
    iso2: string;
    iso3: string;
    numeric: string;
    name: string;
    official_name: string;
    capital: string;
    currency: string;
}

export interface Timeseries {
    meta: Meta;
    values: Value[];
    status: string;
    message?: string
}

export interface Meta {
    symbol: string;
    interval: string;
    currency: string;
    exchange_timezone: string;
    exchange: string;
    mic_code: string;
    type: string;
}

export interface Value {
    datetime: Date;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
}

export interface MarketStatus {
    afterHours: boolean;
    currencies: Currencies;
    earlyHours: boolean;
    exchanges: Exchanges;
    indicesGroups: IndicesGroups;
    market: string;
    serverTime: Date;
}

export interface Currencies {
    crypto: string;
    fx: string;
}

export interface Exchanges {
    nasdaq: string;
    nyse: string;
    otc: string;
}

export interface IndicesGroups {
    sAndP: string;
    societeGenerale: string;
    msci: string;
    ftseRussell: string;
    mstar: string;
    mstarc: string;
    cccy: string;
    cgi: string;
    nasdaq: string;
    dowJones: string;
}
