import { IResolvers } from 'graphql-tools';
import { GameModel } from '../models/game';
import { IgdbModel } from '../models/igdb';
import { UserModel } from '../models/user';

const resolvers: IResolvers = {
	UserResult: {
		__resolveType(obj: { token?: string }) {
			if (obj.token) {
				return 'Authorized';
			}

			return 'Unauthorized';
		},
	},
	Query: {
		game: (obj, args) => IgdbModel.searchGame(args),
		countGames: (obj, args) => IgdbModel.countGames(args),
		platforms: () => GameModel.getPlatforms(),
		genres: () => GameModel.getGenres(),
	},
	Mutation: {
		createUser: (obj, args) => UserModel.createUser(args),
		login: (obj, args) => UserModel.Login(args),
		addStatusToGame: (obj, args) => GameModel.addStatusToGame(args),
	},
};

export default resolvers;
