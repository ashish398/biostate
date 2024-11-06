import { Module } from '@nestjs/common';
import { SubstringsService } from './substrings.service';
import { SubstringsController } from './substrings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Substring } from './substring.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Substring]), UsersModule],
  providers: [SubstringsService],
  controllers: [SubstringsController],
})
export class SubstringsModule {}
