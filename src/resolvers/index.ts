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
	Game: {
		status: (obj, _args, context) => GameModel.getGameStatus(obj, context),
	},
	Query: {
		game: (_obj, args) => IgdbModel.searchGame(args),
		countGames: (_obj, args) => IgdbModel.countGames(args),
		platforms: () => GameModel.getPlatforms(),
		genres: () => GameModel.getGenres(),
	},
	Mutation: {
		createUser: (_obj, args) => UserModel.createUser(args),
		login: (_obj, args) => UserModel.Login(args),
		addStatusToGame: (_obj, args, context) =>
			GameModel.addStatusToGame(args, context),
		removeStatusToGame: (_obj, args, context) =>
			GameModel.removeStatusToGame(args, context),
	},
};

export default resolvers;
