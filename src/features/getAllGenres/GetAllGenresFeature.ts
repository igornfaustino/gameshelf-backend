import { IGenreRepository } from '../../modules/games/repositories/IGenreRepository';

export class GetAllGenresFeature {
	constructor(
		private genreRepository: IGenreRepository,
	) {}

	async execute() {
		return this.genreRepository.getGenres();
	}
}
