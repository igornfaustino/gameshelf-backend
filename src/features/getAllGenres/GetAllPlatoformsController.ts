import { GetAllGenresFeature } from './GetAllGenresFeature';

export class GetAllGenresController {
	constructor(
		private getAllGenresFeature: GetAllGenresFeature,
	) {}

	handle = async () => {
		const platforms = await this.getAllGenresFeature.execute();
		return platforms;
	};
}
