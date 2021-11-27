import * as IgdbService from '../services/igdb';
import {
	APIGame, Game, Genre, Platform,
} from '../../games/types/game';

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

export const countGames = async (args: SearchArgs): Promise<Number> => {
	const data = await IgdbService.countGames(args.search, args.genres, args.platforms);
	return data.count;
};

export const getPlatforms = async (): Promise<Platform[]> => {
	const platforms = await IgdbService.getPlatforms();
	return platforms;
};

export const getGenres = async (): Promise<Genre[]> => {
	const genres = await IgdbService.getGenres();
	return genres;
};

export const getGameByID = async (id: number): Promise<Game> => {
	const game = await IgdbService.getGameByID(id);
	return APIGameToGameModel(game);
};

export const getHomeGames = async () => {
	const releases = await IgdbService.getLast10ReleasedGames();
	const popular = await IgdbService.getTopRatingGames();
	return {
		releases: releases.map((game) => APIGameToGameModel(game)),
		popular: popular.map((game) => APIGameToGameModel(game)),
	};
};
