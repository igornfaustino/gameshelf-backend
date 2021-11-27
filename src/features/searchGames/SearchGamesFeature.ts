import { IGameService, ISearchArgs } from '../../modules/games/services/IGameService';
import { Game } from '../../modules/games/types/game';

export class SearchGamesFeature {
	constructor(
		private gameService: IGameService,
	) {

	}

	async execute(filterOptions: ISearchArgs): Promise<Game[]> {
		return this.gameService.searchGames(filterOptions);
	}
}
