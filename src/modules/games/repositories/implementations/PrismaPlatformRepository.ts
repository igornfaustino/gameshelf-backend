import { prisma } from '../../../../config/prisma';
import { Platform } from '../../types/game';
import { IPlatformRepository } from '../IPlatoformRepository';

export class PrismaPlatformRepository implements IPlatformRepository {
	getPlatforms() {
		return prisma.platform.findMany().then((platforms) => platforms);
	}

	saveOrUpdatePlatform(platform: Platform) {
		return prisma.platform.upsert({
			where: { id: platform.id },
			create: platform,
			update: platform,
		}).then(() => {});
	}
}
