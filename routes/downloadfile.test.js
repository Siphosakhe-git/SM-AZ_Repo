const request = require('supertest');
const express = require('express');
const router = require('./router');

// Mock the database module
jest.mock('../database', () => ({
  query: jest.fn(),
}));

describe('POST /downloadfile', () => {
  it('should set the filename in session and redirect to /download', async () => {
    const app = express();
    app.use(express.urlencoded({ extended: false })); // To parse request body
    app.use('/', router);

    const response = await request(app)
      .post('/downloadfile')
      .send({ download: 'example.txt' })
      .redirects(1);

    // Verify the response
    expect(response.status).toBe(200);
    expect(response.header.location).toBe('/download');

    // Verify the session data
    expect(response.req.session.filename).toBe('example.txt');
  });

  
});

describe('GET /download', () => {
  it('should download the file', async () => {
    const app = express();
    app.use('/', router);

    const response = await request(app)
      .get('/download');

    // Verify the response
    expect(response.status).toBe(200);
    expect(response.header['content-disposition']).toBe('attachment; filename="example.txt"');
  });


});
