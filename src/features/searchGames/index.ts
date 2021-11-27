import { IgdbGameService } from '../../modules/games/services/implementations/igdbGameService';
import { SearchGameController } from './SearchGamesController';
import { SearchGamesFeature } from './SearchGamesFeature';

const igdbService = new IgdbGameService();
const searchGamesFeature = new SearchGamesFeature(igdbService);

const searchGameController = new SearchGameController(searchGamesFeature);

export { searchGamesFeature, searchGameController };
