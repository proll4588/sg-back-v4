import { ContextFunction } from '@apollo/server';
import { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone';

export type ContextFn = ContextFunction<
  [StandaloneServerContextFunctionArgument],
  ApolloContext
>;

export interface AuthApolloContext {
  userId: number;
  roleId: number;
}
export interface UnAuthApolloContext {}
export type ApolloContext = AuthApolloContext | UnAuthApolloContext;
