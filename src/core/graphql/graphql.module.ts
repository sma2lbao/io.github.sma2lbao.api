import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { join } from 'path';
import { PUB_SUB } from './constants/graphql.constant';
import { PubSub } from 'graphql-subscriptions';
// import { JsonScalar } from './scalars/json.scalar';
import { DateScalar } from './scalars/date.scalar';

@Global()
@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        // typePaths: [join(__dirname, '../', '/**/*.graphql')],
        autoSchemaFile: 'schema.gql',
        debug: true,
        playground: true,
        introspection: true,
        resolverValidationOptions: {
          requireResolversForResolveType: false,
        },
        installSubscriptionHandlers: true, // subscription
        subscriptions: {
          keepAlive: 5000,
        },
        engine: {
          apiKey: config.get<string>('apollo.apiKey'),
          graphVariant: config.get<string>('apollo.graphVariant'),
        },
        context: ({ req }) => ({ req }),
        formatError: (error: GraphQLError) => {
          const {
            message,
            path,
            extensions: {
              exception: { status, description },
            },
          } = error;
          return {
            message: message,
            path: path,
            status,
            description,
          };
        },
        buildSchemaOptions: {
          dateScalarMode: 'timestamp',
        },
        uploads: {
          maxFieldSize: 1024 * 1024 * 5,
        },
      }),
    }),
  ],
  providers: [
    {
      provide: PUB_SUB,
      useValue: new PubSub(),
    },
    DateScalar,
  ],
  exports: [PUB_SUB],
})
export class GraphqlModule {}
