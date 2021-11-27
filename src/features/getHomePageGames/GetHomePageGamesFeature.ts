import { IGameService } from '../../modules/games/services/IGameService';

export class GetHomePageGamesFeature {
	constructor(
		private gameService: IGameService,
	) {

	}

	async execute() {
		const releases = await this.gameService.getLast10ReleasedGames();
		const popular = await this.gameService.getTopRatingGames();

		return {
			releases,
			popular,
		};
	}
}
