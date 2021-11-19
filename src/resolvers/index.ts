import { IResolvers } from 'graphql-tools';
import { GameModel } from '../models/game';
import { IgdbModel } from '../models/igdb';
import * as UserController from '../modules/user/controllers/userController';
import * as GenreController from '../modules/games/controllers/GenreController';
import * as PlatformController from '../modules/games/controllers/PlatformController';

const resolvers: IResolvers = {
	UserResult: {
		__resolveType(obj: { token?: string }) {
			if (obj.token) {
				return 'Authorized';
			}

			return 'Unauthorized';
		},
	},
	GameResult: {
		__resolveType(obj: { reason?: string }) {
			if (obj.reason) {
				return 'Unauthorized';
			}

			return 'Game';
		},
	},
	GamesByStatusResult: {
		__resolveType(obj: { reason?: string }) {
			if (obj.reason) {
				return 'Unauthorized';
			}

			return 'GamesByStatus';
		},
	},
	Game: {
		status: (obj, _args, context) => GameModel.getGameStatus(obj, context),
	},
	Query: {
		game: (_obj, args) => IgdbModel.searchGame(args),
		countGames: (_obj, args) => IgdbModel.countGames(args),
		platforms: () => PlatformController.getPlatforms(),
		genres: () => GenreController.getGenres(),
		gamesByStatus: (_obj, args, context) => GameModel.getGamesByStatus(args, context),
		home: () => IgdbModel.getHomeGames(),
	},
	Mutation: {
		createUser: (_obj, args) => UserController.createUser(args),
		login: (_obj, args) => UserController.login(args),
		addStatusToGame: (_obj, args, context) => GameModel.addStatusToGame(args, context),
		removeStatusToGame: (_obj, args, context) => GameModel.removeStatusToGame(args, context),
	},
};

export default resolvers;
