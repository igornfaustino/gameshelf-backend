import { IResolvers } from 'graphql-tools';
import { GameModel } from '../models/game';

const resolvers: IResolvers = {
	Query: {
		game: (obj, args) => GameModel.searchGame(args),
	},
};

export default resolvers;
