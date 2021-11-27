import { PrismaPlatformRepository } from '../../modules/games/repositories/implementations/PrismaPlatformRepository';
import { GetAllPlatformsFeature } from './GetAllPlatformsFeature';
import { GetAllPlatformsController } from './GetAllPlatoformsController';

const platformRepository = new PrismaPlatformRepository();
const getAllPlatformFeature = new GetAllPlatformsFeature(platformRepository);
const getAllPlatformController = new GetAllPlatformsController(getAllPlatformFeature);

export {
	getAllPlatformController,
	GetAllPlatformsFeature,
};
