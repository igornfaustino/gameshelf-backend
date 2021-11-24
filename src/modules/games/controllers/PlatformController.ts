import { prisma } from '../../../config/prisma';
import { Platform } from '../types/game';

export const getPlatforms = () => prisma.platform.findMany();

export const saveOrUpdatePlatform = (platform: Platform) => prisma.platform.upsert({
	where: { id: platform.id },
	create: platform,
	update: platform,
});
