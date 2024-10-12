import { GraphQLResolveInfo } from 'graphql';
import { ApolloContext } from '../context';
import { ResolverCallbackFn } from './type.js';
import { isAuthContext } from '../context/isAuthContext.js';
import { throwNewGQLError } from '../GraphQLError/GraphQLError.js';
import { ServerExceptions } from '../GraphQLError/type.js';

// endpoint: (...resArgs) => checkResolver(...resArgs)([1, 2, 3])(callback)
export const checkResolver = <Args, ReturnType>(
  parent: unknown,
  args: Args,
  context: ApolloContext,
  info: GraphQLResolveInfo
) => {
  return (permRoleIds: number[]) => {
    if (permRoleIds.length !== 0) {
      if (!isAuthContext(context)) {
        throwNewGQLError(ServerExceptions.NO_PERMISSION);
      }

      //   @ts-ignore
      const { roleId } = context;

      if (!permRoleIds.some((permRoleId) => permRoleId === roleId)) {
        throwNewGQLError(ServerExceptions.NO_PERMISSION);
      }
    }

    return async (callback: ResolverCallbackFn<Args, ReturnType>) => {
      return await callback(context, args);
    };
  };
};
