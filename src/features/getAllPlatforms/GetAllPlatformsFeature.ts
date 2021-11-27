import { IPlatformRepository } from '../../modules/games/repositories/IPlatoformRepository';

export class GetAllPlatformsFeature {
	constructor(
		private platformRepository: IPlatformRepository,
	) {}

	async execute() {
		return this.platformRepository.getPlatforms();
	}
}
