import GenreModel from '../models/genreModel';

export const getGenres = () => GenreModel.query();
