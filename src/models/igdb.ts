import {
	countGames,
	getGenres,
	getPlatforms,
	searchGames,
} from '../connectors/igdb';
import { Game, Genre, Platform } from '../types/game';

type SearchArgs = {
	search: string;
	platforms?: number[];
	genres?: number[];
	limit?: number;
	offset?: number;
};

export const IgdbModel = {
	async searchGame(args: SearchArgs): Promise<Game[]> {
		const games = await searchGames(
			args.search,
			args.genres,
			args.platforms,
			args.limit,
			args.offset,
		);
		return games.map(({ cover, ...game }) => ({
			...game,
			cover: cover?.url?.replace('t_thumb', 't_cover_big'),
		}));
	},

	async countGames(args: SearchArgs): Promise<Number> {
		const data = await countGames(args.search, args.genres, args.platforms);
		return data.count;
	},

	async getPlatforms(): Promise<Platform[]> {
		const platforms = await getPlatforms();
		return platforms;
	},

	async getGenres(): Promise<Genre[]> {
		const genres = await getGenres();
		return genres;
	},
};
