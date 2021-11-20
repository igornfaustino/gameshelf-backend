import { PrismaClient } from '.prisma/client';
import { Platform } from '../types/game';

const prisma = new PrismaClient();

export const getPlatforms = () => prisma.platforms.findMany();

export const saveOrUpdatePlatform = (platform: Platform) => prisma.platforms.upsert({
	where: { id: platform.id },
	create: platform,
	update: platform,
});
