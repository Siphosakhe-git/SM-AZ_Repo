const request = require('supertest');
const express = require('express');
const router = require('./router');

describe('POST /home', () => {
  it('should redirect to /hm', async () => {
    const app = express();
    app.use('/', router);

    const response = await request(app)
      .post('/home')
      .redirects(1);

    // Verify the response
    expect(response.status).toBe(200);
    expect(response.req.path).toBe('/hm');
  });


});

describe('GET /hm', () => {
  it('should render the home view', async () => {
    const app = express();
    app.use('/', router);

    const response = await request(app)
      .get('/hm');

    // Verify the response
    expect(response.status).toBe(200);
    expect(response.text).toContain('Home Page'); // Assuming the rendered view contains "Home Page" text

    // Verify the session data
    expect(response.req.session).toBeDefined();
  
  });


});
