import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import schema from './typedef';
import { PORT } from './modules/shared/helpers/env';
import { JWTTokenProvider } from './modules/auth/providers/implementations/JWTTokenProvider';

require('dotenv').config('.env');

const port = PORT || 8000;

const app = express();

const server = new ApolloServer({
	schema,
	context: ({ req }) => {
		const token = req.headers.authorization || '';
		const user = JWTTokenProvider.parserJWT(token);
		return { user };
	},
	playground: true,
	cacheControl: true,
});

server.applyMiddleware({ app, path: '/graphql', cors: true });

app.listen({ port }, () => {
	console.log(`Apollo Server running on port ${port}`);
});
