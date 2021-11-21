import 'graphql-import-node';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import * as Schema from './schema.graphql';
import resolvers from './resolver';

const typeDefs = [Schema];

const schema: GraphQLSchema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

export default schema;
