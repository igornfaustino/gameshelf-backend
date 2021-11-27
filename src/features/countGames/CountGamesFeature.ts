import { IGameService, ISearchArgs } from '../../modules/games/services/IGameService';

export class CountGamesFeature {
	constructor(
		private gameService: IGameService,
	) {

	}

	async execute(filterOptions: ISearchArgs) {
		return this.gameService.countGames(filterOptions);
	}
}
