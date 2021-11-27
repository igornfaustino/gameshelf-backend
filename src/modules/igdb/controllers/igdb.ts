import * as IgdbService from '../services/igdb';
import {
	APIGame, Game, Genre,
} from '../../games/types/game';

const APIGameToGameModel = (game: APIGame): Game => ({
	...game,
	cover: game.cover?.url?.replace('t_thumb', 't_cover_big'),
	thumbnail: game.cover?.url?.replace('t_thumb', 't_cover_small'),
});

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
