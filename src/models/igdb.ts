import {
	countGames,
	getGameByID,
	getGenres,
	getPlatforms,
	searchGames,
} from '../connectors/igdb';
import { APIGame, Game, Genre, Platform } from '../types/game';

type SearchArgs = {
	search: string;
	platforms?: number[];
	genres?: number[];
	limit?: number;
	offset?: number;
};

const APIGameToGameModel = (game: APIGame): Game => ({
	...game,
	cover: game.cover?.url?.replace('t_thumb', 't_cover_big'),
	thumbnail: game.cover?.url?.replace('t_thumb', 't_cover_small'),
});

export const IgdbModel = {
	async searchGame(args: SearchArgs): Promise<Game[]> {
		const games = await searchGames(
			args.search,
			args.genres,
			args.platforms,
			args.limit,
			args.offset,
		);
		return games.map((game) => APIGameToGameModel(game));
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

	async getGameByID(id: number): Promise<Game> {
		const game = await getGameByID(id);
		return APIGameToGameModel(game);
	},
};
