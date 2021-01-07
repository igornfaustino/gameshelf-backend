import { countGames, searchGames } from '../connectors/igdb';
import { Game } from '../types/game';

type SearchArgs = {
	search: string;
	platforms?: number[];
	genres?: number[];
	limit?: number;
	offset?: number;
};

export const GameModel = {
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
			cover: cover?.url?.slice(2).replace('t_thumb', 't_cover_big'),
		}));
	},
	async countGames(args: SearchArgs): Promise<Number> {
		const data = await countGames(args.search, args.genres, args.platforms);
		return data.count;
	},
};
