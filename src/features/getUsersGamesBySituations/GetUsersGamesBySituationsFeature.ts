import { IGameRepository } from '../../modules/games/repositories/IGameRepository';
import { Unauthorized } from '../../modules/shared/errors/Unauthorized';
import { GetUsersGamesBySituationsDTO } from './GetUsersGamesBySituationsDTO';

export class GetUsersGamesBySituationsFeature {
	constructor(
		private gameRepository: IGameRepository,
	) {}

	async execute(args: GetUsersGamesBySituationsDTO) {
		const { userId, situationId } = args;

		if (!userId) throw new Unauthorized();

		const games = this.gameRepository.findGamesBySituations(userId, situationId);
		const count = this.gameRepository.countGamesBySituations(userId, situationId);

		return {
			games,
			count,
		};
	}
}
