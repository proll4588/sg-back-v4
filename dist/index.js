import * as dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { context } from './context/context.js';
import typeDefs from './type-defs/typeDefs.js';
import { resolvers } from './resolvers/resolvers.js';
const server = new ApolloServer({
    typeDefs,
    // @ts-ignore
    resolvers: resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    introspection: true,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: context,
});
console.log(`🚀  Server ready at: ${url}`);
