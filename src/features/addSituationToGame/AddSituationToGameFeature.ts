import { IGameRepository } from '../../modules/games/repositories/IGameRepository';
import { IGameService } from '../../modules/games/services/IGameService';
import { Unauthorized } from '../../modules/shared/errors/Unauthorized';
import { AddSituationToGameDTO } from './AddSituationToGameDTO';

export class AddSituationToGameFeature {
	constructor(
		private gameRepository: IGameRepository,
		private gameService: IGameService,
	) {}

	async execute(args: AddSituationToGameDTO) {
		const { userId, gameId, situationId } = args;

		if (!userId) throw new Unauthorized();

		const game = await this.gameService.getGameByID(gameId);

		await this.gameRepository.createOrUpdateGame(game);
		await this.gameRepository.relateGameToSituation(game.id, situationId, userId);

		return game;
	}
}
