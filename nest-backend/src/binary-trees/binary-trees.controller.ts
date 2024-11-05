import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Inject,
} from '@nestjs/common';
import { BinaryTreesService } from './binary-trees.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateBinaryTreeDto } from './dto/create-binary-tree.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('binary-trees')
export class BinaryTreesController {
  constructor(
    private binaryTreesService: BinaryTreesService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('calculate-max-path-any')
  async calculateAny(@Body() createBinaryTreeDto: CreateBinaryTreeDto) {
    const { input } = createBinaryTreeDto;
    const cacheKey = `bt-calculate-any:${JSON.stringify(input)}`;
    const cachedResult = await this.cacheManager.get(cacheKey);

    if (cachedResult) {
      return cachedResult;
    }

    const binaryTree = this.binaryTreesService.maxPathSumAny(
      createBinaryTreeDto.input,
    );

    await this.cacheManager.set(cacheKey, binaryTree);
    return binaryTree;
  }

  @UseGuards(JwtAuthGuard)
  @Post('calculate-max-path-leaf')
  async calculateLeaf(@Body() createBinaryTreeDto: CreateBinaryTreeDto) {
    const { input } = createBinaryTreeDto;
    const cacheKey = `bt-calculate-leaf:${JSON.stringify(input)}`;
    const cachedResult = await this.cacheManager.get(cacheKey);
    if (cachedResult) {
      return cachedResult;
    }

    const binaryTree = this.binaryTreesService.maxLeafToNodePathSum(
      createBinaryTreeDto.input,
    );
    await this.cacheManager.set(cacheKey, binaryTree);
    return binaryTree;
  }

  @UseGuards(JwtAuthGuard)
  @Post('save')
  async save(@Body() body: any, @Request() req) {
    const user = req.user;
    const { input } = body;

    const binaryTree = await this.binaryTreesService.saveBinaryTree(
      input,
      user,
    );

    const cacheKey = `bt-history:${user.id}`;
    await this.cacheManager.del(cacheKey);

    return binaryTree;
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  async getHistory(@Request() req) {
    const user = req.user;
    const cacheKey = `bt-history:${user.id}`;
    const cachedHistory = await this.cacheManager.get(cacheKey);
    if (cachedHistory) {
      return cachedHistory;
    }
    const history = await this.binaryTreesService.getBinaryTreesForUser(user);
    await this.cacheManager.set(cacheKey, history);
    return history;
  }
}
