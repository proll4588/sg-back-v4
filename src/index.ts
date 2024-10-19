import * as dotenv from 'dotenv';
dotenv.config();

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloContext } from './context/type.js';
import { context } from './context/context.js';
import typeDefs from './type-defs/typeDefs.js';
import { resolvers } from './resolvers/resolvers.js';
import express from 'express';
import http from 'http';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';

const server = new ApolloServer<ApolloContext>({
  typeDefs,
  // @ts-ignore
  resolvers: resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  introspection: true,
});

const app = express();
const httpServer = http.createServer(app);

await server.start();

app.use(
  '/graphql',
  // highlight-start
  cors<cors.CorsRequest>({
    origin: '*',
  }),
  // highlight-end
  express.json(),
  expressMiddleware(server, { context })
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);
console.log(`🚀 Server ready at http://localhost:4000/graphql`);

// const { url } = await startStandaloneServer(server, {
//   listen: { port: 4000 },
//   context: context,
// });

// console.log(`🚀  Server ready at: ${url}`);
