import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { schemas, configs } from './config';
import { AuthModule } from './core/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { GraphQLError } from 'graphql';
import { UsersModule } from './app/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configs,
      envFilePath: ['.env.development'],
      validationSchema: schemas,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.get<any>('database.type'),
        host: config.get<string>('database.host'),
        port: config.get<number>('database.port'),
        username: config.get<string>('database.username'),
        password: config.get<string>('database.password'),
        database: config.get<string>('database.database'),
        synchronize: config.get('synchronize'),
        autoLoadEntities: true,
        // entities: [join(__dirname, './', '/**/*.entity{.ts,.js}')],
      }),
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        typePaths: [join(__dirname, '../', '/**/*.graphql')],
        autoSchemaFile: 'schema.gql',
        // engine: {
        //     apiKey: '',
        //     schemaTag: ''
        // },
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
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
