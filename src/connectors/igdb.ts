import apicalypse, { ApicalypseConfig } from 'apicalypse';
import Bottleneck from 'bottleneck';
import { getConnection } from 'typeorm';
import { App } from '../entity/App';
import { APIGame, Genre, Platform } from '../types/game';

const configs = require('../../config.json');

const BASE_URL = 'https://api.igdb.com/v4';

const clientId = configs.clientId;

const limiter = new Bottleneck({
	minTime: 250,
	maxConcurrent: 8,
});

export const requestOptions = async (): Promise<ApicalypseConfig> => {
	const result = await getConnection()
		.createQueryBuilder()
		.select('app.value')
		.from(App, 'app')
		.where('app.propName = :prop', { prop: 'igdb_auth_token' })
		.getOne();
	const auth = result?.value;
	return {
		baseURL: `${BASE_URL}`,
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Client-ID': clientId,
			Authorization: `Bearer ${auth}`,
		},
	};
};

const makeCondition = (platforms?: any[], genres?: any[]) => {
	const whereStatement = ['cover!=null'];
	if (genres) {
		whereStatement.push(`genres=(${genres.join(',')})`);
	}
	if (platforms) {
		whereStatement.push(`platforms=(${platforms.join(',')})`);
	}
	return whereStatement.join('&');
};

export const searchGames = async (
	search: string,
	genres?: number[],
	platforms?: number[],
	limit: number = 50,
	offset: number = 0,
): Promise<APIGame[]> => {
	const query = apicalypse(await requestOptions())
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

export const countGames = async (
	search: string,
	genres?: number[],
	platforms?: number[],
): Promise<Count> => {
	const query = apicalypse(await requestOptions())
		.fields('id')
		.search(search);

	const whereStatement = makeCondition(platforms, genres);

	if (whereStatement) query.where(whereStatement);

	return limiter
		.schedule(() => query.request('/games/count'))
		.then((res) => res.data);
};

export const getPlatforms = async (): Promise<Platform[]> => {
	const query = apicalypse(await requestOptions())
		.fields('name,abbreviation')
		.sort('name', 'asc')
		.limit(500);

	return limiter
		.schedule(() => query.request('/platforms'))
		.then((res) => res.data);
};

export const getGenres = async (): Promise<Genre[]> => {
	const query = apicalypse(await requestOptions())
		.fields('name')
		.sort('name', 'asc')
		.limit(500);

	return limiter
		.schedule(() => query.request('/genres'))
		.then((res) => res.data);
};

export const getGameByID = async (id: number): Promise<APIGame> => {
	const query = apicalypse(await requestOptions())
		.fields('name,cover.url,genres.name,platforms.name,platforms.abbreviation')
		.where(`id=${id}`);
	return limiter
		.schedule(() => query.request('/games'))
		.then((res) => res.data[0]);
};
