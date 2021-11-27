import apicalypse, { ApicalypseConfig } from 'apicalypse';
import { getIgdbToken } from '../../../shared/controllers/app';
import { CLIENT_ID } from '../../../shared/helpers/env';
import { igdbTokenMiddleware } from '../../../shared/helpers/request';
import { GameConvertHelper } from '../../helpers/GameConvertHelper';
import { APIGame, Platform } from '../../types/game';
import { IGameService, ISearchArgs } from '../IGameService';

const BASE_URL = 'https://api.igdb.com/v4';
const GAME_FIELDS = 'name,cover.url,genres.name,platforms.name,platforms.abbreviation';

export class IgdbGameService implements IGameService {
	private async getRequestOptions(): Promise<ApicalypseConfig> {
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
	}

	private makeSearchGameCondition(platforms?: number[], genres?: number[]) {
		const whereStatement = ['cover!=null'];
		if (genres) {
			whereStatement.push(`genres=(${genres.join(',')})`);
		}
		if (platforms) {
			whereStatement.push(`platforms=(${platforms.join(',')})`);
		}
		return whereStatement.join('&');
	}

	async searchGames(filterOptions: ISearchArgs) {
		const {
			search, genres, platforms, limit = 50, offset = 0,
		} = filterOptions;

		const query = apicalypse(await this.getRequestOptions())
			.fields(GAME_FIELDS)
			.search(search)
			.limit(limit)
			.offset(offset);

		const whereStatement = this.makeSearchGameCondition(platforms, genres);
		if (whereStatement) query.where(whereStatement);

		return igdbTokenMiddleware(query.request('/games'))
			.then((res): Promise<APIGame[]> => res.data)
			.then((games) => games.map((game) => GameConvertHelper.GameAPI2GameModel(game)));
	}

	async countGames(filters: ISearchArgs): Promise<number> {
		const {
			search, genres, platforms,
		} = filters;

		const query = apicalypse(await this.getRequestOptions())
			.fields('id')
			.search(search);

		const whereStatement = this.makeSearchGameCondition(platforms, genres);

		if (whereStatement) query.where(whereStatement);

		return igdbTokenMiddleware(query.request('/games/count'))
			.then((res) => res.data?.count || 0);
	}

	async getPlatforms(): Promise<Platform[]> {
		const query = apicalypse(await this.getRequestOptions())
			.fields('name,abbreviation')
			.sort('name', 'asc')
			.limit(500);

		return igdbTokenMiddleware(query.request('/platforms')).then((res) => res.data);
	}
}
