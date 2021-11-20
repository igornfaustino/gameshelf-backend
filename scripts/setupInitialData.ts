import { getGenres, getPlatforms } from '../src/connectors/igdb';
import { requestAccessToken } from '../src/helpers/request';
import { createOrUpdateGenre } from '../src/modules/games/controllers/GenreController';
import { saveOrUpdatePlatform } from '../src/modules/games/controllers/PlatformController';
import { saveIgdbToken } from '../src/modules/shared/controllers/app';

export const setupInitialData = async () => {
	const res = await requestAccessToken();
	await saveIgdbToken(res.data.access_token);

	const genres = await getGenres();
	genres.map(async (genre) => {
		await createOrUpdateGenre(genre);
	});

	const platforms = await getPlatforms();
	platforms.map(async (platform) => {
		await saveOrUpdatePlatform(platform);
	});
};

setupInitialData();
