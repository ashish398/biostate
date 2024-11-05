import { Module } from '@nestjs/common';
import { BinaryTreesService } from './binary-trees.service';
import { BinaryTreesController } from './binary-trees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BinaryTree } from './binary-tree.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([BinaryTree]), UsersModule],
  providers: [BinaryTreesService],
  controllers: [BinaryTreesController],
})
export class BinaryTreesModule {}
