// src/common/filters/graphql-exception.filter.ts
import { Catch, ArgumentsHost } from '@nestjs/common';
import { GqlExceptionFilter, GqlExecutionContext } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';

@Catch()
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = exception?.response;

    const message = response?.message || 'Unexpected error';

    return new ApolloError(
      Array.isArray(message) ? message[0] : message,
      undefined, // để không trả về code mặc định như INTERNAL_SERVER_ERROR
      {
        statusCode: response?.statusCode || 500,
        error: response?.error || 'Internal Server Error',
        message: Array.isArray(message) ? message : [message],
      },
    );
  }
}
