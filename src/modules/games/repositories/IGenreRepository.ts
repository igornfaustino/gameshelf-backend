import { Genre } from '../types/game';

export interface IGenreRepository {
	getGenres(): Promise<Genre[]>

	saveOrUpdateGenre(genre: Genre): Promise<void>
}
