import { prisma } from '../../../../config/prisma';
import { Game } from '../../types/game';
import { IGameRepository } from '../IGameRepository';

export class PrismaGameRepository implements IGameRepository {
	async findGamesBySituations(userId: string, situationId: number): Promise<Game[]> {
		return prisma.game.findMany({
			select: {
				id: true,
				genres: true,
				cover: true,
				name: true,
				platforms: true,
				thumbnail: true,
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
}
