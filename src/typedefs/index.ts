import 'graphql-import-node';
import * as Query from './schema.graphql';
import * as Game from './game.graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from '../resolvers';
import { GraphQLSchema } from 'graphql';

const typeDefs = [Query, Game];

const schema: GraphQLSchema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

export default schema;
