import { prisma } from '../../../config/prisma';
import * as IgdbController from '../../igdb/controllers/igdb';
import { unauthorize } from '../../shared/helpers/authResponses';
import { Context } from '../../shared/types/graphQL';
import { Game } from '../types/game';

export const getGameById = (gameId: number) => prisma
	.game
	.findUnique({ where: { id: gameId } });

export const createOrUpdateGame = async (game: Game) => {
	const gameBody = {
		name: game.name,
		cover: game.cover,
		thumbnail: game.thumbnail,
		genres: {
			connectOrCreate: game.genres?.map((genre) => ({
				where: { id: genre.id },
				create: genre,
			})),
		},
		platforms: {
			connectOrCreate: game.platforms?.map((platform) => ({
				where: { id: platform.id },
				create: platform,
			})),
		},
	};

	return prisma.game.upsert({
		where: { id: game.id },
		create: {
			id: game.id,
			...gameBody,
		},
		update: gameBody,
	});
};

export const relateGameToSituation = (gameId: number, situationId: number, userId: string) => prisma
	.userGameSituation
	.upsert({
		where: { userId_gameId: { gameId, userId } },
		create: { gameId, situationId, userId },
		update: { situationId },
	});

export const removeGameSituation = (gameId: number, userId: string) => prisma
	.userGameSituation
	.delete({ where: { userId_gameId: { gameId, userId } } });

export const addStatusToGame = async (props: any, context: Context) => {
	const userId = context.user?.id;
	if (!userId) return unauthorize('user_not_found');
	const game = await IgdbController.getGameByID(props.gameId);

	await createOrUpdateGame(game);
	await relateGameToSituation(game.id, props.statusId, userId);

	return game;
};

export const removeStatusToGame = async (props: any, context: Context) => {
	const userId = context.user?.id;
	if (!userId) return unauthorize('user_not_found');

	await removeGameSituation(Number(props.gameId), userId);

	return getGameById(Number(props.gameId));
};

export const getGameStatus = async (obj: Game, context: Context) => {
	if (!context.user?.id) return null;
	const result = await prisma.userGameSituation
		.findUnique({
			select: { situation: true },
			where: {
				userId_gameId: {
					gameId: obj.id,
					userId: context.user.id,
				},
			},
		});
	return result?.situation.name || null;
};
