import { PrismaClient } from '.prisma/client';
import { Genre } from '../types/game';

const prisma = new PrismaClient();

export const getGenres = () => prisma.genres.findMany();

export const createOrUpdateGenre = (genre: Genre) => prisma.genres.upsert({
	where: { id: genre.id },
	create: genre,
	update: genre,
});
