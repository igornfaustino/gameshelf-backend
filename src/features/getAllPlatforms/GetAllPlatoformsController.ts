import { GetAllPlatformsFeature } from './GetAllPlatformsFeature';

export class GetAllPlatformsController {
	constructor(
		private getAllPlatformFeature: GetAllPlatformsFeature,
	) {}

	handle = async () => {
		const platforms = await this.getAllPlatformFeature.execute();
		return platforms;
	};
}
