import { IGameRepository } from '../../modules/games/repositories/IGameRepository';
import { GetSituationByGameDTO } from './GetSituationByGameDTO';

export class GetSituationByGameFeature {
	constructor(
		private gameRepository: IGameRepository,
	) {}

	async execute(args: GetSituationByGameDTO) {
		const { userId, gameId } = args;

		if (!userId) return null;

		const situation = this.gameRepository.getSituationByGame(userId, gameId);

		return situation;
	}
}
