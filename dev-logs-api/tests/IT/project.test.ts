import supertest from 'supertest';
import { mongoCreateProject, mongoCreateUser } from '../../src/repositories';
import app from '../../src/server';
import * as projectRepository from '../../src/repositories/projectRepository';
import { AreaModel } from '../../src/models';

//request bodies
import validRegisterUserRequestBody from '../resources/json/requests/registerUserRequest_valid.json';
import validAuthenticateUserRequestBody from '../resources/json/requests/authenticateUserRequest_valid.json';
import validCreateAreaRequestBody from '../resources/json/requests/createAreaRequest_valid.json';
import validCreateProjectRequestBody from '../resources/json/requests/createProjectRequest_valid.json';
import invalidCreateProjectRequestBody from '../resources/json/requests/createProjectRequest_invalid.json';
import validUpdateProjectRequestBody from '../resources/json/requests/updateProjectRequest_valid.json';
import invalidUpdateProjectRequestBody from '../resources/json/requests/updateProjectRequest_invalid.json';
import { CreateProjectRequestBody, Project } from '../../src/interfaces';

describe('Project', () => {
  let token: string;
  //   let areaId: string;

  // Create user, log in before each test, and create area
  beforeEach(async () => {
    await mongoCreateUser(validRegisterUserRequestBody);

    const login = await supertest(app).post('/api/users/login').send(validAuthenticateUserRequestBody).expect(200);
    token = login.body.token;

    await supertest(app).post('/api/areas').send(validCreateAreaRequestBody).set('Authorization', `Bearer ${token}`).expect(200);
    const area = await AreaModel.findOne({});
    // areaId = area?._id;
    validCreateProjectRequestBody.areaId = area?._id;
  });

  describe('Create Project', () => {
    it('should return 200 if a project is successfully created', async () => {
      //ACT/ASSERT
      await supertest(app).post('/api/projects').send(validCreateProjectRequestBody).set('Authorization', `Bearer ${token}`).expect(200);
    });

    it('should return 400 if project already exists', async () => {
      //ARRANGE
      await supertest(app).post('/api/projects').send(validCreateProjectRequestBody).set('Authorization', `Bearer ${token}`).expect(200);

      //ACT/ASSERT
      await supertest(app).post('/api/projects').send(validCreateProjectRequestBody).set('Authorization', `Bearer ${token}`).expect(400);
    });

    it('should return 400 if error happens when creating area', async () => {
      //ARRANGE
      jest.spyOn(projectRepository, 'mongoCreateProject').mockResolvedValueOnce(null as any);

      //ACT/ASSSERT
      await supertest(app).post('/api/projects').send(validCreateProjectRequestBody).set('Authorization', `Bearer ${token}`).expect(400);
    });

    it('should return 400 if invalid request body', async () => {
      //ACT/ASSSERT
      await supertest(app).post('/api/projects').send(invalidCreateProjectRequestBody).set('Authorization', `Bearer ${token}`).expect(400);
    });

    it('should return 400 if a area is invalid', async () => {
      //ARRANGE
      validCreateProjectRequestBody.areaId = '68b985c4e343d6c1aaf23d6e';

      //ACT/ASSERT
      await supertest(app).post('/api/projects').send(validCreateProjectRequestBody).set('Authorization', `Bearer ${token}`).expect(400);
    });
  });

  describe('Get Projects', () => {
    it('should return 200 and returns projects for user', async () => {
      //ARRANGE
      await supertest(app).post('/api/projects').send(validCreateProjectRequestBody).set('Authorization', `Bearer ${token}`).expect(200);

      //ACT/ASSERT
      const projects = await supertest(app).get('/api/projects').set('Authorization', `Bearer ${token}`).expect(200);
      expect(projects.body.length).toBe(1);
    });
  });

  describe('Update Project', () => {
    it('should return 200 if an project is successfully update', async () => {
      //ARRANGE
      await supertest(app).post('/api/projects').send(validCreateProjectRequestBody).set('Authorization', `Bearer ${token}`).expect(200);

      const projects = await supertest(app).get('/api/projects').set('Authorization', `Bearer ${token}`).expect(200);
      validUpdateProjectRequestBody.id = projects.body[0].id;

      //ACT/ASSERT
      await supertest(app).put('/api/projects').send(validUpdateProjectRequestBody).set('Authorization', `Bearer ${token}`).expect(200);
    });

    it('should return 400 if error happens when updating project', async () => {
      //ARRANGE
      await supertest(app).post('/api/projects').send(validCreateProjectRequestBody).set('Authorization', `Bearer ${token}`).expect(200);
      const projects = await supertest(app).get('/api/projects').set('Authorization', `Bearer ${token}`).expect(200);
      validUpdateProjectRequestBody.id = projects.body[0].id;

      jest.spyOn(projectRepository, 'mongoUpdateProject').mockResolvedValueOnce(null as any);

      //ACT/ASSSERT
      await supertest(app).put('/api/projects').send(validUpdateProjectRequestBody).set('Authorization', `Bearer ${token}`).expect(400);
    });

    it('should return 400 if invalid request body', async () => {
      //ACT/ASSSERT
      await supertest(app).put('/api/projects').send(invalidUpdateProjectRequestBody).set('Authorization', `Bearer ${token}`).expect(400);
    });

    it('should return 400 if project does not belong to user ', async () => {
      jest.spyOn(projectRepository, 'getProjectsForUser').mockResolvedValueOnce([] as any);

      //ACT/ASSSERT
      await supertest(app).put('/api/projects').send(validUpdateProjectRequestBody).set('Authorization', `Bearer ${token}`).expect(400);
    });
  });

  describe('Delete Project', () => {
    it('should return 200 if an area is successfully deleted', async () => {
      //ARRANGE
      await supertest(app).post('/api/projects').send(validCreateProjectRequestBody).set('Authorization', `Bearer ${token}`).expect(200);

      const projects = await supertest(app).get('/api/projects').set('Authorization', `Bearer ${token}`).expect(200);

      const id = projects.body[0].id;

      //ACT/ASSERT
      await supertest(app).delete(`/api/projects/${id}`).set('Authorization', `Bearer ${token}`).expect(200);
    });

    it('should return 400 if error happens when deleting project', async () => {
      //ARRANGE
      await supertest(app).post('/api/projects').send(validCreateProjectRequestBody).set('Authorization', `Bearer ${token}`).expect(200);

      const projects = await supertest(app).get('/api/projects').set('Authorization', `Bearer ${token}`).expect(200);

      const id = projects.body[0].id;

      jest.spyOn(projectRepository, 'deleteProjectById').mockResolvedValueOnce(null as any);

      //ACT/ASSSERT
      await supertest(app).delete(`/api/projects/${id}`).set('Authorization', `Bearer ${token}`).expect(400);
    });

    it('should return 400 if project does not exist', async () => {
      //ARRANGE
      const invalidProjectId = '68b871d8317decc56a9fe802';

      //ACT/ASSSERT
      await supertest(app).delete(`/api/projects/${invalidProjectId}`).set('Authorization', `Bearer ${token}`).expect(400);
    });
  });

  describe('Get Project Details', () => {
    it('should return 200 if an projects are successfully fetched', async () => {
      //ARRANGE
      const id = 'placeholder';

      //ACT/ASSERT
      await supertest(app).get(`/api/projects/${id}`).send().set('Authorization', `Bearer ${token}`).expect(200);
    });
  });

  describe('Get Project Summary', () => {
    it('should return 200 if project summary successfully generated', async () => {
      //ARRANGE
      const id = 'placeholder';

      //ACT/ASSERT
      await supertest(app).get(`/api/projects/summary/${id}`).send().set('Authorization', `Bearer ${token}`).expect(200);
    });
  });
});
