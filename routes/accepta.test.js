const request = require('supertest');
const express = require('express');
const router = require('./accepta');

//checking if the accept route returns correct response status
describe('GET /accept', () => {
    it('should return 200 OK', async () => {
      const app = express();
      app.use('/', router);
  
      const response = await request(app).get('/accept');
      expect(response.status).toBe(200);
    });
  });
  
  // Mock the database module
jest.mock('../database', () => ({
    query: jest.fn((query, callback) => {
      // Simulate successful query execution
      if (query.includes('UPDATE')) {
        callback();
      }
      // Simulate fetching the updated abstract
      if (query.includes('SELECT')) {
        const data = [{ ABS_ID: '123', title: 'Updated Abstract' }];
        callback(null, data);
      }
      // Handle other queries as needed
    }),
  }));
  
  describe('POST /accepta', () => {
    it('should update abstract status and redirect to /accept', async () => {
      const app = express();
      app.use('/', router);
  
      // Simulate the request by creating a mock session
      const session = { absId: '123' };
  
      const response = await request(app)
        .post('/accepta')
        .send({})
        .set('Cookie', [`session=${JSON.stringify(session)}`])
        .redirects(1);
  
      // Verify the response
      expect(response.status).toBe(200);
      expect(response.header.location).toBe('/accept');
      // You can also check the session or other data if needs be
    });
  
    // Add more test cases to cover for different scenarios
  });
  
  describe('GET /accept', () => {
    it('should render the addAuth template', async () => {
      const app = express();
      app.use('/', router);
  
      const response = await request(app).get('/accept');
  
      // Verification of the response
      expect(response.status).toBe(200);
      // You can check the rendered template or other data if needed
    });
  
    // Add more test cases to cover different scenarios
  });
