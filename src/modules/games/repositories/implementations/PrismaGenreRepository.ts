import { prisma } from '../../../../config/prisma';
import { Genre } from '../../types/game';
import { IGenreRepository } from '../IGenreRepository';

export class PrismaGenreRepository implements IGenreRepository {
	getGenres = () => prisma.genre.findMany().then((genres) => genres);

	saveOrUpdateGenre = (genre: Genre) => prisma.genre.upsert({
		where: { id: genre.id },
		create: genre,
		update: genre,
	}).then(() => {});
}
