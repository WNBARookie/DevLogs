import supertest from 'supertest';
import { mongoCreateProject, mongoCreateUser } from '../../src/repositories';
import app from '../../src/server';
import * as itemRepository from '../../src/repositories/itemRepository';
import { AreaModel, ItemModel, ProjectModel } from '../../src/models';

//request bodies
import validRegisterUserRequestBody from '../resources/json/requests/registerUserRequest_valid.json';
import validAuthenticateUserRequestBody from '../resources/json/requests/authenticateUserRequest_valid.json';
import validCreateAreaRequestBody from '../resources/json/requests/createAreaRequest_valid.json';
import validCreateProjectRequestBody from '../resources/json/requests/createProjectRequest_valid.json';
import validCreateItemRequestBody from '../resources/json/requests/createItemRequest_valid.json';
import invalidCreateItemRequestBody from '../resources/json/requests/createItemRequest_invalid.json';
import validUpdateItemRequestBody from '../resources/json/requests/updateItemRequest_valid.json';
import invalidUpdateItemRequestBody from '../resources/json/requests/updateItemRequest_invalid.json';

describe('Project', () => {
  let token: string;

  // Create user, log in before each test, and create area and project
  beforeEach(async () => {
    await mongoCreateUser(validRegisterUserRequestBody);

    const login = await supertest(app).post('/api/users/login').send(validAuthenticateUserRequestBody).expect(200);
    token = login.body.token;

    await supertest(app).post('/api/areas').send(validCreateAreaRequestBody).set('Authorization', `Bearer ${token}`).expect(200);
    const area = await AreaModel.findOne({});
    validCreateProjectRequestBody.areaId = area?._id;

    await supertest(app).post('/api/projects').send(validCreateProjectRequestBody).set('Authorization', `Bearer ${token}`).expect(200);
    const project = await ProjectModel.findOne({});
    validCreateItemRequestBody.projectId = project?._id;
  });

  describe('Create Item', () => {
    it('should return 200 if a item is successfully created', async () => {
      //ACT/ASSERT
      await supertest(app).post('/api/items').send(validCreateItemRequestBody).set('Authorization', `Bearer ${token}`).expect(200);
    });

    it('should return 400 if item already exists', async () => {
      //ARRANGE
      await supertest(app).post('/api/items').send(validCreateItemRequestBody).set('Authorization', `Bearer ${token}`).expect(200);

      //ACT/ASSERT
      await supertest(app).post('/api/items').send(validCreateItemRequestBody).set('Authorization', `Bearer ${token}`).expect(400);
    });

    it('should return 400 if error happens when creating item', async () => {
      //ARRANGE
      jest.spyOn(itemRepository, 'mongoCreateItem').mockResolvedValueOnce(null as any);

      //ACT/ASSSERT
      await supertest(app).post('/api/items').send(validCreateItemRequestBody).set('Authorization', `Bearer ${token}`).expect(400);
    });

    it('should return 400 if invalid request body', async () => {
      //ACT/ASSSERT
      await supertest(app).post('/api/items').send(invalidCreateItemRequestBody).set('Authorization', `Bearer ${token}`).expect(400);
    });

    it('should return 400 if a area is invalid', async () => {
      //ARRANGE
      validCreateItemRequestBody.projectId = '68b985c4e343d6c1aaf23d6e';

      //ACT/ASSERT
      await supertest(app).post('/api/items').send(validCreateItemRequestBody).set('Authorization', `Bearer ${token}`).expect(400);
    });
  });

  describe('Get Items', () => {
    it('should return 200 and returns items for user', async () => {
      //ARRANGE
      await supertest(app).post('/api/items').send(validCreateItemRequestBody).set('Authorization', `Bearer ${token}`).expect(200);

      //ACT/ASSERT
      const items = await supertest(app).get('/api/items').set('Authorization', `Bearer ${token}`).expect(200);
      expect(items.body.length).toBe(1);
    });
  });

  describe('Update Item', () => {
    it('should return 200 if an item is successfully update', async () => {
      //ARRANGE
      await supertest(app).post('/api/items').send(validCreateItemRequestBody).set('Authorization', `Bearer ${token}`).expect(200);

      const items = await supertest(app).get('/api/items').set('Authorization', `Bearer ${token}`).expect(200);
      validUpdateItemRequestBody.id = items.body[0].id;

      //ACT/ASSERT
      await supertest(app).put('/api/items').send(validUpdateItemRequestBody).set('Authorization', `Bearer ${token}`).expect(200);
    });

    it('should return 400 if error happens when updating item', async () => {
      //ARRANGE
      await supertest(app).post('/api/items').send(validCreateItemRequestBody).set('Authorization', `Bearer ${token}`).expect(200);
      const items = await supertest(app).get('/api/items').set('Authorization', `Bearer ${token}`).expect(200);
      validUpdateItemRequestBody.id = items.body[0].id;

      jest.spyOn(itemRepository, 'mongoUpdateItem').mockResolvedValueOnce(null as any);

      //ACT/ASSSERT
      await supertest(app).put('/api/items').send(validUpdateItemRequestBody).set('Authorization', `Bearer ${token}`).expect(400);
    });

    it('should return 400 if invalid request body', async () => {
      //ACT/ASSSERT
      await supertest(app).put('/api/items').send(invalidUpdateItemRequestBody).set('Authorization', `Bearer ${token}`).expect(400);
    });

    it('should return 400 if item does not belong to user ', async () => {
      jest.spyOn(itemRepository, 'getItemsForUser').mockResolvedValueOnce([] as any);

      //ACT/ASSSERT
      await supertest(app).put('/api/items').send(validUpdateItemRequestBody).set('Authorization', `Bearer ${token}`).expect(400);
    });
  });

  describe('Delete Item', () => {
    it('should return 200 if an item is successfully deleted', async () => {
      //ARRANGE
      await supertest(app).post('/api/items').send(validCreateItemRequestBody).set('Authorization', `Bearer ${token}`).expect(200);

      const items = await supertest(app).get('/api/items').set('Authorization', `Bearer ${token}`).expect(200);

      const id = items.body[0].id;

      //ACT/ASSERT
      await supertest(app).delete(`/api/items/${id}`).set('Authorization', `Bearer ${token}`).expect(200);
    });

    it('should return 400 if error happens when deleting item', async () => {
      //ARRANGE
      await supertest(app).post('/api/items').send(validCreateItemRequestBody).set('Authorization', `Bearer ${token}`).expect(200);

      const items = await supertest(app).get('/api/items').set('Authorization', `Bearer ${token}`).expect(200);

      const id = items.body[0].id;

      jest.spyOn(itemRepository, 'deleteItemById').mockResolvedValueOnce(null as any);

      //ACT/ASSSERT
      await supertest(app).delete(`/api/items/${id}`).set('Authorization', `Bearer ${token}`).expect(400);
    });

    it('should return 400 if item does not exist', async () => {
      //ARRANGE
      const invalidItemId = '68b871d8317decc56a9fe802';

      //ACT/ASSSERT
      await supertest(app).delete(`/api/items/${invalidItemId}`).set('Authorization', `Bearer ${token}`).expect(400);
    });
  });
});
