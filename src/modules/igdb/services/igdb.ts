import apicalypse, { ApicalypseConfig } from 'apicalypse';
import { APIGame } from '../../games/types/game';
import { CLIENT_ID } from '../../shared/helpers/env';
import { getIgdbToken } from '../../shared/controllers/app';
import { igdbTokenMiddleware } from '../../shared/helpers/request';

const BASE_URL = 'https://api.igdb.com/v4';
const GAME_FIELDS = 'name,cover.url,genres.name,platforms.name,platforms.abbreviation';

export const requestOptions = async (): Promise<ApicalypseConfig> => {
	const auth = await getIgdbToken();
	return {
		baseURL: `${BASE_URL}`,
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Client-ID': CLIENT_ID,
			Authorization: `Bearer ${auth}`,
		},
	};
};

const makeSearchGameCondition = (platforms?: any[], genres?: any[]) => {
	const whereStatement = ['cover!=null'];
	if (genres) {
		whereStatement.push(`genres=(${genres.join(',')})`);
	}
	if (platforms) {
		whereStatement.push(`platforms=(${platforms.join(',')})`);
	}
	return whereStatement.join('&');
};

export const getGameByID = async (id: number): Promise<APIGame> => {
	const query = apicalypse(await requestOptions())
		.fields(GAME_FIELDS)
		.where(`id=${id}`);
	return igdbTokenMiddleware(query.request('/games')).then((res) => res.data[0]);
};

export const getLast10ReleasedGames = async (): Promise<any[]> => {
	const currentTimestamp = Math.floor(Date.now() / 1000);
	const query = apicalypse(await requestOptions())
		.fields(GAME_FIELDS)
		.where(`first_release_date<${currentTimestamp} & cover!=null`)
		.sort('first_release_date', 'desc')
		.limit(10);
	return igdbTokenMiddleware(query.request('/games')).then((res) => res.data);
};

export const getTopRatingGames = async (): Promise<any[]> => {
	const query = apicalypse(await requestOptions())
		.fields(GAME_FIELDS)
		.where('cover!=null')
		.sort('rating', 'desc')
		.limit(10);
	return igdbTokenMiddleware(query.request('/games')).then((res) => res.data);
};
