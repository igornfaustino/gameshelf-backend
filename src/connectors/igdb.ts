import apicalypse, { ApicalypseConfig } from 'apicalypse';
import Bottleneck from 'bottleneck';
import { getConnection } from 'typeorm';
import { App } from '../entity/App';
import { igdbTokenMiddleware } from '../helpers/request';
import { APIGame, Genre, Platform } from '../types/game';
import { CLIENT_ID } from '../helpers/env';

const BASE_URL = 'https://api.igdb.com/v4';
const GAME_FIELDS =
	'name,cover.url,genres.name,platforms.name,platforms.abbreviation';

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

export const searchGames = async (
	search: string,
	genres?: number[],
	platforms?: number[],
	limit: number = 50,
	offset: number = 0,
): Promise<APIGame[]> => {
	const query = apicalypse(await requestOptions())
		.fields(GAME_FIELDS)
		.search(search)
		.limit(limit)
		.offset(offset);

	const whereStatement = makeSearchGameCondition(platforms, genres);

	if (whereStatement) query.where(whereStatement);

	return igdbTokenMiddleware(query.request('/games')).then((res) => res.data);
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

	const whereStatement = makeSearchGameCondition(platforms, genres);

	if (whereStatement) query.where(whereStatement);

	return igdbTokenMiddleware(query.request('/games/count')).then(
		(res) => res.data,
	);
};

export const getPlatforms = async (): Promise<Platform[]> => {
	const query = apicalypse(await requestOptions())
		.fields('name,abbreviation')
		.sort('name', 'asc')
		.limit(500);

	return igdbTokenMiddleware(query.request('/platforms')).then(
		(res) => res.data,
	);
};

export const getGenres = async (): Promise<Genre[]> => {
	const query = apicalypse(await requestOptions())
		.fields('name')
		.sort('name', 'asc')
		.limit(500);

	return igdbTokenMiddleware(query.request('/genres')).then((res) => res.data);
};

export const getGameByID = async (id: number): Promise<APIGame> => {
	const query = apicalypse(await requestOptions())
		.fields(GAME_FIELDS)
		.where(`id=${id}`);
	return igdbTokenMiddleware(query.request('/games')).then(
		(res) => res.data[0],
	);
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
		.where(`cover!=null`)
		.sort('rating', 'desc')
		.limit(10);
	return igdbTokenMiddleware(query.request('/games')).then((res) => res.data);
};
