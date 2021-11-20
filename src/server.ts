import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import schema from './typedefs';
import { parserJWT } from './modules/shared/helpers/jwt';

require('dotenv').config('.env');

const initServer = async () => {
	const app = express();

	const server = new ApolloServer({
		schema,
		context: ({ req }) => {
			const token = req.headers.authorization || '';
			const user = parserJWT(token);
			return { user };
		},
		playground: true,
		cacheControl: true,
	});

	server.applyMiddleware({ app, path: '/graphql', cors: true });

	app.listen({ port: 8000 }, () => {
		console.log('Apollo Server on http://localhost:8000/graphql');
	});
};

initServer();
