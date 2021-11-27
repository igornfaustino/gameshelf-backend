import { GetHomePageGamesFeature } from './GetHomePageGamesFeature';

export class GetHomePageGamesController {
	constructor(
		private countGameFeature: GetHomePageGamesFeature,
	) {}

	handle = async () => this.countGameFeature.execute();
}
