import supertest from 'supertest';
import app from '../../src/server';
import { userExists } from '../../src/services/userService';
import { mongoCreateUser } from '../../src/repositories/userRepository';
import * as userRepository from '../../src/repositories/userRepository';

//request bodies
import validRegisterUserRequestBody from '../resources/json/requests/registerUserRequest_valid.json';
import invalidRegisterUserRequestBody from '../resources/json/requests/registerUserRequest_invalid.json';
import validAuthenticateUserRequestBody from '../resources/json/requests/authenticateUserRequest_valid.json';
import invalidAuthenticateUserRequestBody from '../resources/json/requests/authenticateUserRequest_invalid.json';

describe('User', () => {
  describe('Register User', () => {
    it('should return 200 if user is successfully created', async () => {
      //ACT
      await supertest(app).post('/api/users/register').send(validRegisterUserRequestBody).expect(200);

      //ASSERT
      const userAlreadyExists = await userExists('testUser@Test.com', 'testUser');

      expect(userAlreadyExists).toBe(true);
    });

    it('should return 400 if user already exists', async () => {
      //ARRANGE
      await mongoCreateUser(validRegisterUserRequestBody);

      //ACT
      await supertest(app).post('/api/users/register').send(validRegisterUserRequestBody).expect(400);

      //ASSERT
      const userAlreadyExists = await userExists('testUser@Test.com', 'testUser');

      expect(userAlreadyExists).toBe(true);
    });

    it('should return 400 if error happens when creating user', async () => {
      //ARRANGE
      jest.spyOn(userRepository, 'mongoCreateUser').mockResolvedValueOnce(null as any);

      //ACT/ASSSERT
      await supertest(app).post('/api/users/register').send(validRegisterUserRequestBody).expect(400);
    });

    it('should return 400 if invalid request body', async () => {
      //ACT/ASSSERT
      await supertest(app).post('/api/users/register').send(invalidRegisterUserRequestBody).expect(400);
    });
  });

  describe('Login User', () => {
    it('should return 200 if user is successfully authenticated', async () => {
      //ARRANGE
      await mongoCreateUser(validRegisterUserRequestBody);

      //ACT/ASSERT
      await supertest(app).post('/api/users/login').send(validAuthenticateUserRequestBody).expect(200);
    });

    it('should return 400 if user credentials are invalid', async () => {
      //ARRANGE
      await mongoCreateUser(validRegisterUserRequestBody);

      //ACT/ASSERT
      await supertest(app).post('/api/users/login').send(invalidAuthenticateUserRequestBody).expect(400);
    });
  });

  describe('Get user data', () => {
    it('should return 200 if user data is successfully fetched', async () => {
      //ARRANGE
      await mongoCreateUser(validRegisterUserRequestBody);
      const login = await supertest(app).post('/api/users/login').send(validAuthenticateUserRequestBody).expect(200);
      const token = login.body.token;

      //ACT
      const userInfo = await supertest(app).get('/api/users/me').send(validAuthenticateUserRequestBody).set('Authorization', `Bearer ${token}`).expect(200);

      //ASSERT
      expect(userInfo.body).not.toBeNull();
    });

    it('should return 401 if user  credentials are invalid', async () => {
      //ARRANGE
      const token = 'invalid';

      //ACT
      const userInfo = await supertest(app).get('/api/users/me').send(validAuthenticateUserRequestBody).set('Authorization', `Bearer ${token}`).expect(401);
      expect(userInfo.body.status).toBe(401);
    });
  });
});
