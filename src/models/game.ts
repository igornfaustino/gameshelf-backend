import { getRepository } from 'typeorm';
import { Game } from '../entity/Game';
import { IgdbModel } from './igdb';
import { Game as GameType } from '../types/game';
import { StatusToGame } from '../entity/StatusToGame';
import { Genre } from '../entity/Genre';
import { Platform } from '../entity/Platform';
import { Context } from '../types/graphQL';
import { unauthorize } from '../modules/shared/helpers/authResponses';

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

	_relateGameToStatus: async (
		gameId: number,
		statusId: number,
		userId: string,
	) => {
		const gameStatusRepository = getRepository(StatusToGame);
		const gameStatus = await gameStatusRepository.findOne(undefined, {
			where: {
				gameId,
				userId,
			},
		});
		if (gameStatus) {
			gameStatus.statusId = statusId;
			return gameStatusRepository.save(gameStatus);
		}

		return getRepository(StatusToGame).insert({
			gameId,
			statusId,
			userId,
		});
	},

	_deleteStatusGame: async (gameId: number, userId: string) => {
		const gameStatusRepository = getRepository(StatusToGame);
		const gameStatus = await gameStatusRepository.findOne(undefined, {
			where: {
				gameId,
				userId,
			},
		});
		if (!gameStatus) return;
		gameStatusRepository.delete(gameStatus);
	},

	addStatusToGame: async (props: any, context: Context) => {
		const userId = context.user?.id;
		if (!context.user?.id) return unauthorize('user_not_found');
		const game = await IgdbModel.getGameByID(props.gameId);
		await GameModel._createOrUpdateGame(game);
		await GameModel._relateGameToStatus(game.id, props.statusId, userId);

		return game;
	},

	removeStatusToGame: async (props: any, context: Context) => {
		const userId = context.user?.id;
		if (!context.user?.id) return unauthorize('user_not_found');
		const game = await IgdbModel.getGameByID(props.gameId);
		await GameModel._createOrUpdateGame(game);
		await GameModel._deleteStatusGame(game.id, userId);

		return game;
	},

	getGenres: async () => getRepository(Genre).find(),

	getPlatforms: async () => getRepository(Platform).find(),

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

	getGamesByStatus: async (args: any, context: Context) => {
		if (!context.user?.id) return unauthorize('user_not_found');
		const [result, count] = await getRepository(StatusToGame)
			.createQueryBuilder('gameStatus')
			.leftJoinAndSelect('gameStatus.games', 'games')
			.leftJoinAndSelect('gameStatus.users', 'users')
			.leftJoinAndSelect('gameStatus.status', 'status')
			.leftJoinAndSelect('games.platforms', 'platforms')
			.leftJoinAndSelect('games.genres', 'genres')
			.where('statusId=:statusId', { statusId: args.statusId })
			.andWhere('userId=:userId', {
				userId: context.user?.id,
			})
			.getManyAndCount();

		return {
			games: result.map(({ games }) => games),
			count,
		};
	},
};
