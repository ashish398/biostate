import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { SubstringsService } from './substrings.service';
import { CreateSubstringDto } from './dto/create-substring.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SaveResultDto } from './dto/save-result.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('substring')
export class SubstringsController {
  constructor(
    private substringsService: SubstringsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('calculate')
  async calculate(@Body() createSubstringDto: CreateSubstringDto) {
    const { input } = createSubstringDto;
    const cacheKey = `ss-calculate:${input}`;

    const cachedResult = await this.cacheManager.get(cacheKey);
    if (cachedResult) {
      return cachedResult;
    }

    const substring = this.substringsService.calculateSubstringResult(input);

    await this.cacheManager.set(cacheKey, substring);
    return substring;
  }

  @UseGuards(JwtAuthGuard)
  @Post('save')
  async saveResult(@Body() saveResultDto: SaveResultDto, @Request() req) {
    const user = req.user;
    console.log('saveResultDto', saveResultDto);
    const savedResult = await this.substringsService.saveSubstringResult(
      saveResultDto,
      user,
    );
    const cacheKey = `ss-history:${user.id}`;
    await this.cacheManager.del(cacheKey);
    return savedResult;
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  async getHistory(@Request() req) {
    const user = req.user;
    const cacheKey = `ss-history:${user.id}`;
    const cachedHistory = await this.cacheManager.get(cacheKey);
    if (cachedHistory) {
      return cachedHistory;
    }
    const history = await this.substringsService.getSubstringsForUser(user);
    await this.cacheManager.set(cacheKey, history);
    return history;
  }
}
