import { PrismaGameRepository } from '../../modules/games/repositories/implementations/PrismaGameRepository';
import { IgdbGameService } from '../../modules/games/services/implementations/igdbGameService';
import { AddSituationsToGameController } from './AddSituationToGameController';
import { AddSituationToGameFeature } from './AddSituationToGameFeature';

const gameRepository = new PrismaGameRepository();
const gameService = new IgdbGameService();
const addSituationToGameFeature = new AddSituationToGameFeature(gameRepository, gameService);
const addSituationsToGameController = new AddSituationsToGameController(addSituationToGameFeature);

export {
	addSituationToGameFeature,
	addSituationsToGameController,
};
