import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import cors from 'cors';

import schema from './typedefs';
import { parserJWT } from './helpers/jwt';

require('dotenv').config('.env');

const initServer = async () => {
	const connection = await createConnection();

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

	app.use('*', cors());

	server.applyMiddleware({ app, path: '/graphql' });

	app.listen({ port: 8000 }, () => {
		console.log('Apollo Server on http://localhost:8000/graphql');
	});
};

initServer();
