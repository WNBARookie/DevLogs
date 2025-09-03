import supertest from 'supertest';
import app from '../../src/server';
import { userExists } from '../../src/services/userService';
import { createUser } from '../../src/repositories/userRepository';
import * as userRepository from '../../src/repositories/userRepository';

describe('User', () => {
  describe('Register User', () => {
    let validRegisterUserRequestBody = {
      username: 'testUser',
      email: 'testUser@Test.com',
      password: '123456',
      name: 'Test User',
    };

    it('should return 200 if user is successfully created', async () => {
      //ARRANGE

      //ACT
      await supertest(app).post('/api/users/register').send(validRegisterUserRequestBody).expect(200);

      //ASSERT
      const userAlreadyExists = await userExists('testUser@Test.com', 'testUser');

      expect(userAlreadyExists).toBe(true);
    });

    it('should return 400 if user already exists', async () => {
      //ARRANGE
      await createUser(validRegisterUserRequestBody);

      //ACT
      await supertest(app).post('/api/users/register').send(validRegisterUserRequestBody).expect(400);

      //ASSERT
      const userAlreadyExists = await userExists('testUser@Test.com', 'testUser');

      expect(userAlreadyExists).toBe(true);
    });

    it('should return 400 if error happens when creating user', async () => {
      //ARRANGE
      jest.spyOn(userRepository, 'createUser').mockResolvedValueOnce(null as any);

      //ACT/ASSSERT
      await supertest(app).post('/api/users/register').send(validRegisterUserRequestBody).expect(400);
    });

    it('should return 400 if invalid request body', async () => {
      //ARRANGE

      //make request body
      let invalidRegisterUserRequestBody = {
        username: 'testUser',
        email: 'testUser@Test.com',
        password: '123456',
      };

      //ACT/ASSSERT
      await supertest(app).post('/api/users/register').send(invalidRegisterUserRequestBody).expect(400);
    });
  });

  describe('Login User', () => {
    let validRegisterUserRequestBody = {
      username: 'testUser',
      email: 'testUser@Test.com',
      password: '123456',
      name: 'Test User',
    };

    it('should return 200 if user is successfully authenticated', async () => {
      //ARRANGE

      await createUser(validRegisterUserRequestBody);

      let validAuthenticateUserRequestBody = {
        email: 'testUser@Test.com',
        password: '123456',
      };

      //ACT/ASSERT
      await supertest(app).post('/api/users/login').send(validAuthenticateUserRequestBody).expect(200);
    });

    it('should return 400 if user  credentials are invalid', async () => {
      //ARRANGE

      await createUser(validRegisterUserRequestBody);

      let invalidAuthenticateUserRequestBody = {
        email: 'testUser@Test.com',
        password: 'abc',
      };

      //ACT/ASSERT
      await supertest(app).post('/api/users/login').send(invalidAuthenticateUserRequestBody).expect(400);
    });
  });

  describe('Get user data', () => {
    let validRegisterUserRequestBody = {
      username: 'testUser',
      email: 'testUser@Test.com',
      password: '123456',
      name: 'Test User',
    };

    it('should return 200 if user data is successfully fetched', async () => {
      //ARRANGE

      await createUser(validRegisterUserRequestBody);

      let validAuthenticateUserRequestBody = {
        email: 'testUser@Test.com',
        password: '123456',
      };

      const login = await supertest(app).post('/api/users/login').send(validAuthenticateUserRequestBody).expect(200);
      const token = login.body.token;

      //ACT
      const userInfo = await supertest(app).get('/api/users/me').send(validAuthenticateUserRequestBody).set('Authorization', `Bearer ${token}`).expect(200);

      //ASSERT
      expect(userInfo.body).not.toBeNull();
    });

    it('should return 401 if user  credentials are invalid', async () => {
      //ARRANGE
      let validAuthenticateUserRequestBody = {
        email: 'testUser@Test.com',
        password: '123456',
      };
      const token = 'invalid';

      //ACT
      const userInfo = await supertest(app).get('/api/users/me').send(validAuthenticateUserRequestBody).set('Authorization', `Bearer ${token}`).expect(401);
      expect(userInfo.body.status).toBe(401);
    });
  });
});
