import { PrismaGameRepository } from '../../modules/games/repositories/implementations/PrismaGameRepository';
import { GetSituationsByGameController } from './GetSituationByGameController';
import { GetSituationByGameFeature } from './GetSituationByGameFeature';

const gameRepository = new PrismaGameRepository();
const getSituationByGameFeature = new GetSituationByGameFeature(gameRepository);
const getSituationsByGameController = new GetSituationsByGameController(getSituationByGameFeature);

export {
	getSituationByGameFeature,
	getSituationsByGameController,
};
