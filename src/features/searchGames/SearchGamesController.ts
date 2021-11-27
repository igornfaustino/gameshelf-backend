import { ISearchArgs } from '../../modules/games/services/IGameService';
import { SearchGamesFeature } from './SearchGamesFeature';

export class SearchGameController {
	constructor(
		private searchGameFeature: SearchGamesFeature,
	) {}

	handle = async (_obj: any, args: ISearchArgs) => {
		const games = await this.searchGameFeature.execute(args);
		return games;
	};
}
