import { IResolvers } from 'graphql-tools';
import { IgdbModel } from '../models/igdb';
import { UserModel } from '../models/user';

const resolvers: IResolvers = {
	Query: {
		game: (obj, args) => IgdbModel.searchGame(args),
		countGames: (obj, args) => IgdbModel.countGames(args),
		platforms: () => IgdbModel.getPlatforms(),
		genres: () => IgdbModel.getGenres(),
	},
	Mutation: {
		createUser: (obj, args) => UserModel.createUser(args),
		login: (obj, args) => UserModel.Login(args),
	},
};

export default resolvers;
