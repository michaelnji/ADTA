export interface News {
    meta: Meta;
    data: NewsArticles[];
}

export interface NewsArticles {
    uuid: string;
    title: string;
    description: string;
    keywords: string;
    snippet: string;
    url: string;
    image_url: string;
    language: string;
    published_at: Date;
    source: string;
    relevance_score: null;
    entities: Entity[];
    similar?: NewsArticles[];
}

export interface Entity {
    symbol: string;
    name: string;
    exchange: null;
    exchange_long: null;
    country: string;
    type: string;
    industry: string;
    match_score: number;
    sentiment_score: number;
    highlights: Highlight[];
}

export interface Highlight {
    highlight: string;
    sentiment: number;
    highlighted_in: string;
}

export interface Meta {
    found: number;
    returned: number;
    limit: number;
    page: number;
}

export interface TickerNews {
    stories: Story[];
    lastID: string;
}

export interface Story {
    id: string;
    title: string;
    url: string;
    site: string;
    time: number;
    faviconURL: string;
    tags: string[];
    tickers: string[];
    description?: string;
}