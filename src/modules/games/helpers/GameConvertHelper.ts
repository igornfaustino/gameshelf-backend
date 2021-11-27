import { APIGame, Game } from '../types/game';

export class GameConvertHelper {
	static GameAPI2GameModel(game: APIGame): Game {
		return ({
			...game,
			cover: game.cover?.url?.replace('t_thumb', 't_cover_big'),
			thumbnail: game.cover?.url?.replace('t_thumb', 't_cover_small'),
		});
	}
}
