import apicalypse from 'apicalypse';
import { APIGame } from '../types/game';

const BASE_URL = 'https://api.igdb.com/v4';

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
	const query = apicalypse({
		baseURL: `${BASE_URL}`,
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Client-ID': 'CLIENT_ID',
			Authorization: 'TOKEN',
		},
	})
		.fields('name,cover.url,genres.name,platforms.name,platforms.abbreviation')
		.search(search)
		.limit(limit)
		.offset(offset);

	const whereStatement = makeCondition(platforms, genres);

	if (whereStatement) query.where(whereStatement);

	return query.request('/games').then((res) => res.data);
};
