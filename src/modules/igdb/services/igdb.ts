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

export const getGameByID = async (id: number): Promise<APIGame> => {
	const query = apicalypse(await requestOptions())
		.fields(GAME_FIELDS)
		.where(`id=${id}`);
	return igdbTokenMiddleware(query.request('/games')).then((res) => res.data[0]);
};
