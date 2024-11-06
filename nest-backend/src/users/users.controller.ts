import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserRole } from './user.entity';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all users' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Put(':id/role')
  @ApiOperation({ summary: 'Change user role' })
  @ApiParam({ name: 'id', description: 'User ID', type: Number })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        role: {
          enum: ['Admin', 'User', 'Guest'],
          description: 'New role for the user',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'User role updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid role specified' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async changeUserRole(
    @Param('id') userId: number,
    @Body('role') role: UserRole,
  ) {
    return this.usersService.updateUserRole(userId, role);
  }
}
