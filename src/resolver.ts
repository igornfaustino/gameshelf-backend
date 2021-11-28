import { IResolvers } from 'graphql-tools';
import { searchGameController } from './features/searchGames';
import { getAllPlatformController } from './features/getAllPlatforms';
import { getAllGenresController } from './features/getAllGenres';
import { getUsersGamesBySituationController } from './features/getUsersGamesBySituations';
import { getSituationsByGameController } from './features/getSituationByGame';
import { createUserController } from './features/createUser';
import { loginController } from './features/login';
import { countGameController } from './features/countGames';
import { getHomePageGamesController } from './features/getHomePageGames';
import { addSituationsToGameController } from './features/addSituationToGame';
import { removeGameSituationController } from './features/removeGameSituation';

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
		status: getSituationsByGameController.handle,
	},
	Query: {
		game: searchGameController.handle,
		countGames: countGameController.handle,
		platforms: getAllPlatformController.handle,
		genres: getAllGenresController.handle,
		gamesByStatus: getUsersGamesBySituationController.handle,
		home: getHomePageGamesController.handle,
	},
	Mutation: {
		createUser: createUserController.handle,
		login: loginController.handle,
		addStatusToGame: addSituationsToGameController.handle,
		removeStatusToGame: removeGameSituationController.handle,
	},
};

export default resolvers;
