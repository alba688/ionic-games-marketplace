export interface IGameAd {
    id: number;
    title: string;
    price: number;
    platform: string;
    description: string;
    condition: string;
    image: {
        id: string;
    };
    user_created: {
        first_name: string;
    }
}

export interface IGameAdResponse {
    game_market_by_id: IGameAd;
}

export interface IGameAdsResponse {
    game_market: IGameAd[];
}

export interface INewGameAd {
    title: string;
    description: string;
    price: number;
    platform: string;
    condition: string;
    image: string;
}