import supertest from 'supertest';
import { mongoCreateUser } from '../../src/repositories';
import app from '../../src/server';
import * as areaRepository from '../../src/repositories/areaRepository';

//request bodies
import validRegisterUserRequestBody from '../resources/json/requests/registerUserRequest_valid.json';
import validAuthenticateUserRequestBody from '../resources/json/requests/authenticateUserRequest_valid.json';
import validCreateAreaRequestBody from '../resources/json/requests/createAreaRequest_valid.json';
import invalidCreateAreaRequestBody from '../resources/json/requests/createAreaRequest_invalid.json';
import validUpdateAreaRequestBody from '../resources/json/requests/updateAreaRequest_valid.json';
import invalidUpdateAreaRequestBody from '../resources/json/requests/updateAreaRequest_invalid.json';
import validCreateProjectRequestBody from '../resources/json/requests/createProjectRequest_valid.json';

describe('Area', () => {
  let token: string;

  // Create user and log in before each test
  beforeEach(async () => {
    await mongoCreateUser(validRegisterUserRequestBody);

    const login = await supertest(app).post('/api/users/login').send(validAuthenticateUserRequestBody).expect(200);
    token = login.body.token;
  });

  describe('Create Area', () => {
    it('should return 200 if an area is successfully created', async () => {
      //ACT/ASSERT
      await supertest(app).post('/api/areas').send(validCreateAreaRequestBody).set('Authorization', `Bearer ${token}`).expect(200);
    });

    it('should return 400 if area already exists', async () => {
      //ARRANGE
      await supertest(app).post('/api/areas').send(validCreateAreaRequestBody).set('Authorization', `Bearer ${token}`).expect(200);

      //ACT/ASSERT
      await supertest(app).post('/api/areas').send(validCreateAreaRequestBody).set('Authorization', `Bearer ${token}`).expect(400);
    });

    it('should return 400 if error happens when creating area', async () => {
      //ARRANGE
      jest.spyOn(areaRepository, 'mongoCreateArea').mockResolvedValueOnce(null as any);

      //ACT/ASSSERT
      await supertest(app).post('/api/areas').send(validCreateAreaRequestBody).set('Authorization', `Bearer ${token}`).expect(400);
    });

    it('should return 400 if invalid request body', async () => {
      //ACT/ASSSERT
      await supertest(app).post('/api/areas').send(invalidCreateAreaRequestBody).set('Authorization', `Bearer ${token}`).expect(400);
    });
  });

  describe('Get Areas', () => {
    it('should return 200 and returns areas for user', async () => {
      //ARRANGE
      await supertest(app).post('/api/areas').send(validCreateAreaRequestBody).set('Authorization', `Bearer ${token}`).expect(200);

      //ACT/ASSERT
      const areas = await supertest(app).get('/api/areas').set('Authorization', `Bearer ${token}`).expect(200);
      expect(areas.body.length).toBe(1);
    });
  });

  describe('Update Area', () => {
    it('should return 200 if an area is successfully update', async () => {
      //ARRANGE
      await supertest(app).post('/api/areas').send(validCreateAreaRequestBody).set('Authorization', `Bearer ${token}`).expect(200);

      const areas = await supertest(app).get('/api/areas').set('Authorization', `Bearer ${token}`).expect(200);

      validUpdateAreaRequestBody.id = areas.body[0].id;

      //ACT/ASSERT
      await supertest(app).put('/api/areas').send(validUpdateAreaRequestBody).set('Authorization', `Bearer ${token}`).expect(200);
    });

    it('should return 400 if error happens when updating area', async () => {
      //ARRANGE
      jest.spyOn(areaRepository, 'mongoUpdateArea').mockResolvedValueOnce(null as any);

      //ACT/ASSSERT
      await supertest(app).put('/api/areas').send(validUpdateAreaRequestBody).set('Authorization', `Bearer ${token}`).expect(400);
    });

    it('should return 400 if invalid request body', async () => {
      //ACT/ASSSERT
      await supertest(app).put('/api/areas').send(invalidUpdateAreaRequestBody).set('Authorization', `Bearer ${token}`).expect(400);
    });
  });

  describe('Delete Area', () => {
    it('should return 200 if an area is successfully deleted', async () => {
      //ARRANGE
      await supertest(app).post('/api/areas').send(validCreateAreaRequestBody).set('Authorization', `Bearer ${token}`).expect(200);

      const areas = await supertest(app).get('/api/areas').set('Authorization', `Bearer ${token}`).expect(200);

      const id = areas.body[0].id;

      //ACT/ASSERT
      await supertest(app).delete(`/api/areas/${id}`).send().set('Authorization', `Bearer ${token}`).expect(200);
    });

    it('should return 400 if error happens when deleting area', async () => {
      //ARRANGE
      await supertest(app).post('/api/areas').send(validCreateAreaRequestBody).set('Authorization', `Bearer ${token}`).expect(200);

      const areas = await supertest(app).get('/api/areas').send(validCreateAreaRequestBody).set('Authorization', `Bearer ${token}`).expect(200);

      const id = areas.body[0].id;

      jest.spyOn(areaRepository, 'deleteAreaById').mockResolvedValueOnce(null as any);

      //ACT/ASSSERT
      await supertest(app).delete(`/api/areas/${id}`).set('Authorization', `Bearer ${token}`).expect(400);
    });

    it('should return 400 if area does not exist', async () => {
      //ARRANGE
      const invalidAreaId = '68b871d8317decc56a9fe802';

      //ACT/ASSSERT
      await supertest(app).delete(`/api/areas/${invalidAreaId}`).set('Authorization', `Bearer ${token}`).expect(400);
    });
  });

  describe('Get Area Details', () => {
    it('should return 200 if an area details are successfully fetched', async () => {
      //ARRANGE
      await supertest(app).post('/api/areas').send(validCreateAreaRequestBody).set('Authorization', `Bearer ${token}`).expect(200);

      const areas = await supertest(app).get('/api/areas').set('Authorization', `Bearer ${token}`).expect(200);
      const id = areas.body[0].id;

      //add project to area
      validCreateProjectRequestBody.areaId = id;

      await supertest(app).post('/api/projects').send(validCreateProjectRequestBody).set('Authorization', `Bearer ${token}`).expect(200);

      //ACT/ASSERT
      await supertest(app).get(`/api/areas/${id}`).send().set('Authorization', `Bearer ${token}`).expect(200);
    });

    it('should return 400 if an area does not exist', async () => {
      //ARRANGE
      const invalidAreaId = '68b871d8317decc56a9fe802';

      //ACT/ASSERT
      await supertest(app).get(`/api/areas/${invalidAreaId}`).send().set('Authorization', `Bearer ${token}`).expect(400);
    });
  });

  describe('Get Area Summary', () => {
    it('should return 200 if area summary successfully generated', async () => {
      //ARRANGE
      const id = 'placeholder';

      //ACT/ASSERT
      await supertest(app).get(`/api/areas/summary/${id}`).send().set('Authorization', `Bearer ${token}`).expect(200);
    });
  });
});
