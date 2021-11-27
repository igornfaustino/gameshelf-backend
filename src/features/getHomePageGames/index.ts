import { IgdbGameService } from '../../modules/games/services/implementations/igdbGameService';
import { GetHomePageGamesController } from './GetHomePageGamesController';
import { GetHomePageGamesFeature } from './GetHomePageGamesFeature';

const igdbService = new IgdbGameService();
const getHomePageGamesFeature = new GetHomePageGamesFeature(igdbService);

const getHomePageGamesController = new GetHomePageGamesController(getHomePageGamesFeature);

export { getHomePageGamesFeature, getHomePageGamesController };
