import { PrismaGenreRepository } from '../../modules/games/repositories/implementations/PrismaGenreRepository';
import { GetAllGenresFeature } from './GetAllGenresFeature';
import { GetAllGenresController } from './GetAllPlatoformsController';

const genreRepository = new PrismaGenreRepository();
const getAllGenreFeature = new GetAllGenresFeature(genreRepository);
const getAllGenresController = new GetAllGenresController(getAllGenreFeature);

export {
	getAllGenresController,
	getAllGenreFeature,
};
