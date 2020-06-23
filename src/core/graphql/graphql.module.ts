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
        typePaths: [join(__dirname, '../', '/**/*.graphql')],
        autoSchemaFile: 'schema.gql',
        debug: true,
        // resolvers: { JSON: GraphQLJSON },
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
            extensions: { code },
          } = error;
          return {
            message: message,
            code: code,
            path: path,
          };
        },
        buildSchemaOptions: {
          dateScalarMode: 'timestamp',
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
