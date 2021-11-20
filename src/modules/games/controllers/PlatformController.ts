import { prisma } from '../../../db';
import { Platform } from '../types/game';

export const getPlatforms = () => prisma.platforms.findMany();

export const saveOrUpdatePlatform = (platform: Platform) => prisma.platforms.upsert({
	where: { id: platform.id },
	create: platform,
	update: platform,
});
