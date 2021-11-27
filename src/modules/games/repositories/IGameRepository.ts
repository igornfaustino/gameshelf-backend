import { Game } from '../types/game';

export interface IGameRepository {
	findGamesBySituations(userId: string, situationId: number): Promise<Game[]>
	countGamesBySituations(userId: string, situationId: number): Promise<number>
}
