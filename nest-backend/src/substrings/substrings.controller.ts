import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
  Inject,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { SubstringsService } from './substrings.service';
import { CreateSubstringDto } from './dto/create-substring.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SaveResultDto } from './dto/save-result.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@ApiTags('Substring')
@ApiBearerAuth()
@Controller('substring')
export class SubstringsController {
  constructor(
    private substringsService: SubstringsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('calculate')
  @ApiOperation({ summary: 'Calculate substring result based on input' })
  @ApiBody({ type: CreateSubstringDto })
  @ApiResponse({
    status: 200,
    description: 'Successfully calculated substring result',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
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
  @ApiOperation({ summary: 'Save calculated substring result' })
  @ApiBody({ type: SaveResultDto })
  @ApiResponse({ status: 201, description: 'Result successfully saved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
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
  @ApiOperation({
    summary: 'Get calculation history for the authenticated user',
  })
  @ApiResponse({ status: 200, description: 'Successfully retrieved history' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
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
