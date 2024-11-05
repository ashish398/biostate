// users.controller.int.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from './users.module'; // Make sure UsersModule is correctly imported
import { AuthModule } from '../auth/auth.module'; // Import AuthModule to mock authentication
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, AuthModule], // Include Users and Auth modules
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context) => {
          // Mock the guard to always allow access
          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/users (GET)', () => {
    it('should return an array of users', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      // You can add more checks to validate the structure of the user objects
    });
  });

  describe('/users/:id/role (PUT)', () => {
    it('should update the user role and return the updated user', async () => {
      const userId = 1; // Example user ID, update as needed
      const role = 'manager'; // Example role, ensure it's valid based on your `UserRole` enum

      const response = await request(app.getHttpServer())
        .put(`/users/${userId}/role`)
        .send({ role })
        .expect(200);

      expect(response.body).toHaveProperty('id', userId);
      expect(response.body).toHaveProperty('role', role);
    });
  });
});
