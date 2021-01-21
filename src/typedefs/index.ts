import 'graphql-import-node';
import * as Query from './schema.graphql';
import * as Game from './game.graphql';
import * as User from './user.graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from '../resolvers';
import { GraphQLSchema } from 'graphql';

const typeDefs = [Query, Game, User];

const schema: GraphQLSchema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

export default schema;
