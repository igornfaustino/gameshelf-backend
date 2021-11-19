import 'graphql-import-node';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import * as Query from './schema.graphql';
import * as Game from './game.graphql';
import * as User from './user.graphql';
import resolvers from '../resolvers';

const typeDefs = [Query, Game, User];

const schema: GraphQLSchema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

export default schema;
