import { PrismaGameRepository } from '../../modules/games/repositories/implementations/PrismaGameRepository';
import { RemoveGameSituationController } from './RemoveGameSituationController';
import { RemoveGameSituationFeature } from './RemoveGameSituationFeature';

const gameRepository = new PrismaGameRepository();
const removeGameSituationFeature = new RemoveGameSituationFeature(gameRepository);
const removeGameSituationController = new RemoveGameSituationController(removeGameSituationFeature);

export {
	removeGameSituationFeature,
	removeGameSituationController,
};
