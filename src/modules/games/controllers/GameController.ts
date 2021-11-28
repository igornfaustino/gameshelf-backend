import { prisma } from '../../../config/prisma';
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

export const removeStatusToGame = async (props: any, context: Context) => {
	const userId = context.user?.id;
	if (!userId) return unauthorize('user_not_found');

	await removeGameSituation(Number(props.gameId), userId);

	return getGameById(Number(props.gameId));
};
