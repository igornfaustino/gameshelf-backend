import { IGameRepository } from '../../modules/games/repositories/IGameRepository';
import { Unauthorized } from '../../modules/shared/errors/Unauthorized';
import { RemoveGameSituationDTO } from './RemoveGameSituationDTO';

export class RemoveGameSituationFeature {
	constructor(
		private gameRepository: IGameRepository,
	) {}

	async execute(args: RemoveGameSituationDTO) {
		const { userId, gameId } = args;

		if (!userId) throw new Unauthorized();

		await this.gameRepository.removeGameSituation(gameId, userId);

		return this.gameRepository.getGameById(gameId);
	}
}
