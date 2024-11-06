import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SubstringsModule } from './substrings/substrings.module';
import { BinaryTreesModule } from './binary-trees/binary-trees.module';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false, // Allows connection even if SSL certificates are self-signed
        },
      }),
      inject: [ConfigService],
    }),

    CacheModule.register({
      isGlobal: true,
      ttl: 50, // Default time-to-live (in seconds)
      max: 100, // Maximum number of items in cache
    }),
    UsersModule,
    SubstringsModule,
    BinaryTreesModule,
    AuthModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60, // Time to live (in seconds)
        limit: 10, // Maximum requests per ttl
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
