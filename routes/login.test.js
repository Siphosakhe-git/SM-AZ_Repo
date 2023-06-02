const request = require('supertest');
const express = require('express');
const router = require('./login');

// Mock the database module
jest.mock('../database', () => ({
  query: jest.fn((query, callback) => {
    // Simulate successful query execution
    if (query.includes('SELECT * FROM user WHERE USER_EMAIL')) {
      const user = { USER_ID: 1, USER_NAME: 'Madambi Kutama', USER_EMAIL: 'kutamamadambi842@gmail.com', USER_PWORD: 'password' };
      callback(null, [user]);
    }
    // Simulate fetching of conference data
    if (query.includes('SELECT * FROM conference')) {
      const conferences = [{ conferenceId: 1, title: 'Conference 1' }, { conferenceId: 2, title: 'Conference 2' }];
      callback(null, conferences);
    }
    // Simulate fetching of user data
    if (query.includes('SELECT * FROM user')) {
      const users = [{ userId: 1, name: 'Madambi Kutama', email: 'kutamamadambi842@gmail.com' }, { userId: 2, name: 'Muano Makhokha', email: 'kutamamadambi842@gmail.com' }];
      callback(null, users);
    }
    
  }),
}));

describe('POST /login', () => {
  it('should log in the user and redirect to /success', async () => {
    const app = express();
    app.use(express.urlencoded({ extended: false })); // To parse request body
    app.use('/', router);

    const response = await request(app)
      .post('/login')
      .send({ user_email: 'kutamamadambi842@gmail.com', user_pword: 'password' })
      .redirects(1);

    // Verification of the response
    expect(response.status).toBe(200);
    expect(response.header.location).toBe('/success');
    // You can also check the session or other data if needed
  });

  it('should send an error message for incorrect password', async () => {
    const app = express();
    app.use(express.urlencoded({ extended: false })); // To parse request body
    app.use('/', router);

    const response = await request(app)
      .post('/login')
      .send({ user_email: 'kutamamadambi842@gmail.com', user_pword: 'incorrect' });

    // Verification the response
    expect(response.text).toBe('Incorrect Password!');
  });
})
