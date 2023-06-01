const request = require('supertest');
const express = require('express');
const router = require('./signup');

// Mock the database module
jest.mock('../database', () => ({
  query: jest.fn((query, callback) => {
    // Simulate successful query execution
    if (query.includes('INSERT INTO user')) {
      callback(null); // No error
    }
   
  }),
}));

describe('POST /signup', () => {
  it('should create a new user account and send success response', async () => {
    const app = express();
    app.use(express.urlencoded({ extended: false })); // To parse request body
    app.use('/', router);

    const response = await request(app)
      .post('/signup')
      .send({
        user_name: 'Madambi Kutama',
        user_email: 'kutamamadambi842@gmail.com',
        user_domain: 'example.com',
        user_pword: 'password',
        cpword: 'password',
      });

    // Verify the response
    expect(response.status).toBe(200);
    expect(response.text).toBe('Account Created! Need to fill Area of Expertise Form.');
  });

  it('should send an error message for passwords that do not match', async () => {
    const app = express();
    app.use(express.urlencoded({ extended: false })); // To parse request body
    app.use('/', router);

    const response = await request(app)
      .post('/signup')
      .send({
        user_name: 'Madambi Kutama',
        user_email: 'kutamamadambi842@gmail.com',
        user_domain: 'example.com',
        user_pword: 'password',
        cpword: 'incorrect',
      });

    // Verify the response
    expect(response.status).toBe(200);
    expect(response.text).toBe('Password does not match!');
  });

  it('should send an error message for missing fields', async () => {
    const app = express();
    app.use(express.urlencoded({ extended: false })); // To parse request body
    app.use('/', router);

    const response = await request(app).post('/signup').send({});

    // Verify the response
    expect(response.status).toBe(200);
    expect(response.text).toBe('All Fields Required!');
  });


});
