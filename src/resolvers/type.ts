import { GraphQLResolveInfo } from 'graphql';
import { ApolloContext } from '../context';

export type ResolverFn<Args, ReturnType> = (
  parent: unknown,
  args: Args,
  context: ApolloContext,
  info: GraphQLResolveInfo
) => Promise<ReturnType> | ReturnType;

export interface Resolvers {
  Query: {
    getUsers: ResolverFn<{}, { id: number }[]>;
  };
  Mutation: {
    hello: ResolverFn<{}, string>;
  };
}

export type ResolverCallbackFn<Args, ReturnType> = (
  context: ApolloContext,
  args: Args
) => ReturnType | Promise<ReturnType>;
