/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { getGenres, getPlatforms } from '../src/modules/igdb/services/igdb';
import { prisma } from '../src/config/prisma';
import { createOrUpdateGenre } from '../src/modules/games/controllers/GenreController';
import { saveOrUpdatePlatform } from '../src/modules/games/controllers/PlatformController';
import { saveIgdbToken } from '../src/modules/shared/controllers/app';
import { requestAccessToken } from '../src/modules/shared/helpers/request';

const toPlay = 'to play';
const playing = 'playing';
const completed = 'completed';
const abandoned = 'abandoned';

export const setupInitialData = async () => {
	const res = await requestAccessToken();
	await saveIgdbToken(res.data.access_token);

	const genres = await getGenres();
	for (const genre of genres) {
		await createOrUpdateGenre(genre);
	}

	const platforms = await getPlatforms();
	for (const platform of platforms) {
		await saveOrUpdatePlatform(platform);
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
