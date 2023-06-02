const request = require('supertest');
const express = require('express');
const router = require('./index');

describe('GET /', () => {
  it('should render the login page', async () => {
    const app = express();
    app.set('view engine', 'ejs'); // Assuming you are using EJS as the template engine
    app.set('views', __dirname + '/views'); // Assuming your views directory is ./views
    app.use('/', router);

    const response = await request(app).get('/');

    // Verify the response
    expect(response.status).toBe(200);
    expect(response.text).toContain('<h1>Login Page</h1>');
    // You can add more assertions to check for specific elements or content in the rendered view
  });


});
