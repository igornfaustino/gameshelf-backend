import { prisma } from '../../../../prisma';
import { Genre } from '../types/game';

export const getGenres = () => prisma.genre.findMany();

export const createOrUpdateGenre = (genre: Genre) => prisma.genre.upsert({
	where: { id: genre.id },
	create: genre,
	update: genre,
});
