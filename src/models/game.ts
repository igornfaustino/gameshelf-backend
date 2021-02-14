import { getRepository } from 'typeorm';
import { Game } from '../entity/Game';
import { IgdbModel } from './igdb';
import { Game as GameType } from '../types/game';
import { StatusToGame } from '../entity/StatusToGame';

export const GameModel = {
	createOrUpdateGame: async (game: GameType) => {
		getRepository(Game).save(game);
	},

	relateGameToStatus: async (gameId: number, statusId: number) => {
		const gameStatusRepository = getRepository(StatusToGame);
		const gameStatus = await gameStatusRepository.findOne(undefined, {
			where: {
				gameId,
				userId: '2f68d3b2-a1d8-4e14-a77b-41ac16488866',
			},
		});
		if (gameStatus) {
			gameStatus.statusId = statusId;
			return gameStatusRepository.save(gameStatus);
		}

		return getRepository(StatusToGame).insert({
			gameId,
			statusId,
			userId: '2f68d3b2-a1d8-4e14-a77b-41ac16488866',
		});
	},

	addStatusToGame: async (props: any) => {
		const game = await IgdbModel.getGameByID(props.gameId);
		await GameModel.createOrUpdateGame(game);
		await GameModel.relateGameToStatus(game.id, props.statusId);

		// TODO: return a game from here
		const result = await getRepository(StatusToGame)
			.createQueryBuilder('gameStatus')
			.leftJoinAndSelect('gameStatus.games', 'games')
			.leftJoinAndSelect('gameStatus.users', 'users')
			.where('gameId=:gameId', { gameId: game.id })
			.getOne();
		// result.map((r) => console.log(r));
		console.log(result);
		return true;
	},
};
