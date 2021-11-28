import { Game } from '../types/game';

export interface IGameRepository {
	findGamesBySituations(userId: string, situationId: number): Promise<Game[]>
	countGamesBySituations(userId: string, situationId: number): Promise<number>

	getSituationByGame(userId: string, gameId: number): Promise<string | null>
	getGameById(id: number): Promise<Game | null>
	createOrUpdateGame(game: Game): Promise<Game>
	relateGameToSituation(gameId: number, situationId: number, userId: string): Promise<void>
	removeGameSituation(gameId: number, userId: string): Promise<void>
}
