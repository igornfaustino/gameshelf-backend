import { IgdbGameService } from '../src/modules/games/services/implementations/igdbGameService';
import { getGenres } from '../src/modules/igdb/services/igdb';
import { prisma } from '../src/config/prisma';
import { PrismaPlatformRepository } from '../src/modules/games/repositories/implementations/PrismaPlatformRepository';
import { PrismaGenreRepository } from '../src/modules/games/repositories/implementations/PrismaGenreRepository'
import { saveIgdbToken } from '../src/modules/shared/controllers/app';
import { requestAccessToken } from '../src/modules/shared/helpers/request';

const toPlay = 'to play';
const playing = 'playing';
const completed = 'completed';
const abandoned = 'abandoned';


const setupInitialData = async () => {
	const res = await requestAccessToken();
	await saveIgdbToken(res.data.access_token);
	
	const igdbGameService = new IgdbGameService()
	
	const genres = await getGenres();
	const genreRepository = new PrismaGenreRepository()
	for (const genre of genres) {
		await genreRepository.saveOrUpdateGenre(genre);
	}
	
	
	const platforms = await igdbGameService.getPlatforms();
	const platformRepository = new PrismaPlatformRepository()
	for (const platform of platforms) {
		await platformRepository.saveOrUpdatePlatform(platform);
	}

	await prisma.situation.upsert({
		where: { name: toPlay },
		create: { name: toPlay },
		update: { name: toPlay },
	});
	await prisma.situation.upsert({
		where: { name: playing },
		create: { name: playing },
		update: { name: playing },
	});
	await prisma.situation.upsert({
		where: { name: completed },
		create: { name: completed },
		update: { name: completed },
	});
	await prisma.situation.upsert({
		where: { name: abandoned },
		create: { name: abandoned },
		update: { name: abandoned },
	});
};

setupInitialData();
