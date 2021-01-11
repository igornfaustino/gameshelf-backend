import apicalypse, { ApicalypseConfig } from 'apicalypse';
import Bottleneck from 'bottleneck';
import { APIGame } from '../types/game';

const configs = require('../../config.json');

const BASE_URL = 'https://api.igdb.com/v4';

const clientId = configs.clientId;
const authorization = configs.authorization;

const limiter = new Bottleneck({
	minTime: 250,
	maxConcurrent: 8,
});

const requestOptions: ApicalypseConfig = {
	baseURL: `${BASE_URL}`,
	method: 'POST',
	headers: {
		Accept: 'application/json',
		'Client-ID': clientId,
		Authorization: authorization,
	},
};

const makeCondition = (platforms?: any[], genres?: any[]) => {
	const whereStatement = [];
	if (genres) {
		whereStatement.push(`genres=(${genres.join(',')})`);
	}
	if (platforms) {
		whereStatement.push(`platforms=(${platforms.join(',')})`);
	}
	return whereStatement.join('&');
};

export const searchGames = (
	search: string,
	genres?: number[],
	platforms?: number[],
	limit: number = 50,
	offset: number = 0,
): Promise<APIGame[]> => {
	const query = apicalypse(requestOptions)
		.fields('name,cover.url,genres.name,platforms.name,platforms.abbreviation')
		.search(search)
		.limit(limit)
		.offset(offset);

	const whereStatement = makeCondition(platforms, genres);

	if (whereStatement) query.where(whereStatement);

	return limiter
		.schedule(() => query.request('/games'))
		.then((res) => res.data);
};

type Count = {
	count: number;
};

export const countGames = (
	search: string,
	genres?: number[],
	platforms?: number[],
): Promise<Count> => {
	const query = apicalypse(requestOptions).fields('id').search(search);

	const whereStatement = makeCondition(platforms, genres);

	if (whereStatement) query.where(whereStatement);

	return limiter
		.schedule(() => query.request('/games/count'))
		.then((res) => res.data);
};
