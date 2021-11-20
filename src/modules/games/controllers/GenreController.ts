import { prisma } from '../../../db';
import { Genre } from '../types/game';

export const getGenres = () => prisma.genres.findMany();

export const createOrUpdateGenre = (genre: Genre) => prisma.genres.upsert({
	where: { id: genre.id },
	create: genre,
	update: genre,
});
