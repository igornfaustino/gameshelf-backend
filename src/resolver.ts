import { IResolvers } from 'graphql-tools';
import * as IgdbController from './modules/igdb/controllers/igdb';
import * as GameController from './modules/games/controllers/GameController';
import * as UserController from './modules/user/controllers/userController';
import { searchGameController } from './features/searchGames';
import { getAllPlatformController } from './features/getAllPlatforms';
import { getAllGenresController } from './features/getAllGenres';

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
		game: searchGameController.handle,
		countGames: (_obj, args) => IgdbController.countGames(args),
		platforms: getAllPlatformController.handle,
		genres: getAllGenresController.handle,
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
