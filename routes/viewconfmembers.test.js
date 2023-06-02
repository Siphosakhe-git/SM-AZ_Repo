const request = require('supertest');
const express = require('express');
const router = require('./router');

// Mock the database module
jest.mock('../database', () => ({
  query: jest.fn((query, callback) => {
    // Simulate successful query execution
    if (query.includes('SELECT * FROM conference WHERE CONF_ID')) {
      const conference = { CONF_ID: 1, CONF_NAME: 'Conference 1' };
      callback(null, [conference]);
    }
   
  }),
}));

describe('POST /viewconfmembers', () => {
  it('should fetch conference data and redirect to /viewm', async () => {
    const app = express();
    app.use(express.urlencoded({ extended: false })); // To parse request body
    app.use('/', router);

    const response = await request(app)
      .post('/viewconfmembers')
      .send({ session: { confid: 1 } })
      .redirects(1);

    // Verify the response
    expect(response.status).toBe(200);
    expect(response.header.location).toBe('/viewm');
   
  });

});
