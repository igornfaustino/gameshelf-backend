import { IgdbGameService } from '../../modules/games/services/implementations/igdbGameService';
import { SearchGameController } from './CountGamesController';
import { CountGamesFeature } from './CountGamesFeature';

const igdbService = new IgdbGameService();
const countGamesFeature = new CountGamesFeature(igdbService);

const countGameController = new SearchGameController(countGamesFeature);

export { countGamesFeature, countGameController };
