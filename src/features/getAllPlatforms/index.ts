import { PrismaPlatformRepository } from '../../modules/games/repositories/implementations/PrismaPlatformRepository';
import { GetAllPlatformsFeature } from './GetAllPlatformsFeature';
import { GetAllPlatformsController } from './GetAllPlatoformsController';

const platformRepository = new PrismaPlatformRepository();
const getAllPlatformsFeature = new GetAllPlatformsFeature(platformRepository);
const getAllPlatformController = new GetAllPlatformsController(getAllPlatformsFeature);

export {
	getAllPlatformController,
	getAllPlatformsFeature,
};
