import { Game, Genre, Platform } from '../types/game';

export type ISearchArgs = {
	search: string;
	platforms?: number[];
	genres?: number[];
	limit?: number;
	offset?: number;
};

export interface IGameService {
	searchGames(filters: ISearchArgs): Promise<Game[]>
	countGames(filters: ISearchArgs): Promise<number>
	getPlatforms(): Promise<Platform[]>
	getGenres(): Promise<Genre[]>
}
