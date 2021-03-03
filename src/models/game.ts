import { getRepository } from 'typeorm';
import { Game } from '../entity/Game';
import { IgdbModel } from './igdb';
import { Game as GameType } from '../types/game';
import { StatusToGame } from '../entity/StatusToGame';
import { Genre } from '../entity/Genre';
import { Platform } from '../entity/Platform';
import { Context } from '../types/graphQL';

export const GameModel = {
	_createOrUpdateGame: async (game: GameType) => {
		getRepository(Game).save({
			id: game.id,
			name: game.name,
			cover: game.cover,
			thumbnail: game.thumbnail,
			genres: game.genres,
			platforms: game.platforms,
		});
	},

	_relateGameToStatus: async (gameId: number, statusId: number) => {
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

	_deleteStatusGame: async (gameId: number) => {
		const gameStatusRepository = getRepository(StatusToGame);
		const gameStatus = await gameStatusRepository.findOne(undefined, {
			where: {
				gameId,
				userId: '2f68d3b2-a1d8-4e14-a77b-41ac16488866',
			},
		});
		if (!gameStatus) return;
		return gameStatusRepository.delete(gameStatus);
	},

	addStatusToGame: async (props: any) => {
		const game = await IgdbModel.getGameByID(props.gameId);
		await GameModel._createOrUpdateGame(game);
		await GameModel._relateGameToStatus(game.id, props.statusId);

		return game;
	},

	removeStatusToGame: async (props: any) => {
		const game = await IgdbModel.getGameByID(props.gameId);
		await GameModel._createOrUpdateGame(game);
		await GameModel._deleteStatusGame(game.id);

		return game;
	},

	getGenres: async () => {
		return await getRepository(Genre).find();
	},

	getPlatforms: async () => {
		return await getRepository(Platform).find();
	},

	getGameStatus: async (obj: GameType, context: Context) => {
		if (!context.user?.id) return null;
		const result = await getRepository(StatusToGame)
			.createQueryBuilder('gameStatus')
			.leftJoinAndSelect('gameStatus.games', 'games')
			.leftJoinAndSelect('gameStatus.users', 'users')
			.leftJoinAndSelect('gameStatus.status', 'status')
			.where('gameId=:gameId', { gameId: obj.id })
			.andWhere('userId=:userId', {
				userId: context.user?.id,
			})
			.getOne();
		return result?.status.name;
	},
};
