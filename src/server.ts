import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import schema from './typedefs';

const app = express();

const server = new ApolloServer({
	schema,
	playground: true,
	cacheControl: true,
});

app.use('*', cors());

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
	console.log('Apollo Server on http://localhost:8000/graphql');
});
