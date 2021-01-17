import { IResolvers } from 'graphql-tools';
import { GameModel } from '../models/game';

const resolvers: IResolvers = {
	Query: {
		game: (obj, args) => GameModel.searchGame(args),
		countGames: (obj, args) => GameModel.countGames(args),
		platforms: () => GameModel.getPlatforms(),
		genres: () => GameModel.getGenres(),
	},
};

export default resolvers;
