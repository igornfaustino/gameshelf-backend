import { ISearchArgs } from '../../modules/games/services/IGameService';
import { CountGamesFeature } from './CountGamesFeature';

export class SearchGameController {
	constructor(
		private countGameFeature: CountGamesFeature,
	) {}

	handle = async (_obj: any, args: ISearchArgs) => this.countGameFeature.execute(args);
}
