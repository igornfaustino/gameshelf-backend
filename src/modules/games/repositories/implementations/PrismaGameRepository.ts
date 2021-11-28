import { prisma } from '../../../../config/prisma';
import { Game } from '../../types/game';
import { IGameRepository } from '../IGameRepository';

export class PrismaGameRepository implements IGameRepository {
	getGameById(id: number): Promise<Game | null> {
		return prisma
			.game
			.findUnique({
				where: { id },
				include: {
					genres: true,
					platforms: true,
				},
			});
	}

	async getSituationByGame(userId: string, gameId: number): Promise<string | null> {
		const result = await prisma.userGameSituation
			.findUnique({
				select: { situation: true },
				where: {
					userId_gameId: {
						gameId,
						userId,
					},
				},
			});

		return result?.situation.name || null;
	}

	async findGamesBySituations(userId: string, situationId: number): Promise<Game[]> {
		return prisma.game.findMany({
			include: {
				genres: true,
				platforms: true,
			},
			where: {
				UserGameSituation: {
					some: { userId, situationId },
				},
			},
		});
	}

	async countGamesBySituations(userId: string, situationId: number): Promise<number> {
		return prisma.game.count({
			where: {
				UserGameSituation: {
					some: { userId, situationId },
				},
			},
		});
	}

	createOrUpdateGame(game: Game): Promise<Game> {
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
			include: {
				genres: true,
				platforms: true,
			},
			where: { id: game.id },
			create: {
				id: game.id,
				...gameBody,
			},
			update: gameBody,
		});
	}

	relateGameToSituation(gameId: number, situationId: number, userId: string): Promise<void> {
		return prisma
			.userGameSituation
			.upsert({
				where: { userId_gameId: { gameId, userId } },
				create: { gameId, situationId, userId },
				update: { situationId },
			}).then(() => {});
	}

	removeGameSituation(gameId: number, userId: string) {
		return prisma
			.userGameSituation
			.delete({ where: { userId_gameId: { gameId, userId } } })
			.then(() => {});
	}
}
