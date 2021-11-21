import { IResolvers } from 'graphql-tools';
import * as IgdbController from './modules/igdb/controllers/igdb';
import * as GameController from './modules/games/controllers/GameController';
import * as UserController from './modules/user/controllers/userController';
import * as GenreController from './modules/games/controllers/GenreController';
import * as PlatformController from './modules/games/controllers/PlatformController';

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
		status: (obj, _args, context) => GameController.getGameStatus(obj, context),
	},
	Query: {
		game: (_obj, args) => IgdbController.searchGame(args),
		countGames: (_obj, args) => IgdbController.countGames(args),
		platforms: () => PlatformController.getPlatforms(),
		genres: () => GenreController.getGenres(),
		gamesByStatus: (_obj, args, context) => GameController.getGamesByStatus(args, context),
		home: () => IgdbController.getHomeGames(),
	},
	Mutation: {
		createUser: (_obj, args) => UserController.createUser(args),
		login: (_obj, args) => UserController.login(args),
		addStatusToGame: (_obj, args, context) => GameController.addStatusToGame(args, context),
		removeStatusToGame: (_obj, args, context) => GameController.removeStatusToGame(args, context),
	},
};

export default resolvers;