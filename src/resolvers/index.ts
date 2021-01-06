import { IResolvers } from 'graphql-tools';

const resolvers: IResolvers = {
	Query: {
		game: () => ({
			id: 1,
			name: 'mario bros',
			coverURL: 'http://cover.url.com',
			genres: [],
			platforms: [],
		}),
	},
};

export default resolvers;
