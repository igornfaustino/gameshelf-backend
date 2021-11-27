import { PrismaGameRepository } from '../../modules/games/repositories/implementations/PrismaGameRepository';
import { GetUsersGamesBySituationsController } from './GetUserGamesByStituationsController';
import { GetUsersGamesBySituationsFeature } from './GetUsersGamesBySituationsFeature';

const gameRepository = new PrismaGameRepository();
const getUsersGamesBySituationFeature = new GetUsersGamesBySituationsFeature(gameRepository);
const getUsersGamesBySituationController = new GetUsersGamesBySituationsController(
	getUsersGamesBySituationFeature,
);

export {
	getUsersGamesBySituationController,
	getUsersGamesBySituationFeature,
};
