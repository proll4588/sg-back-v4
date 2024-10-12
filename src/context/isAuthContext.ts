import { ApolloContext, AuthApolloContext } from './type';

export const isAuthContext = (
  context: ApolloContext
): context is AuthApolloContext => {
  return (context as AuthApolloContext).userId !== undefined;
};
