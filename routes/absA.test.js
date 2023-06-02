const request = require('supertest');
const express = require('express');
const router = require('./router');

// Mock the database module
jest.mock('../database', () => ({
  query: jest.fn((query, callback) => {
    // Simulate successful query execution
    if (query.includes('INSERT INTO abs_authors')) {
      callback(null); // No error
    } else if (query.includes('SELECT * FROM conf_abstract WHERE ABS_ID')) {
      const abstract = { ABS_ID: 1 };
      callback(null, [abstract]);
    } else if (query.includes('SELECT * FROM abs_authors WHERE ABS_ID')) {
      const authors = [{ USER_ID: 1, USER_NAME: 'Madambi Kutama', USER_EMAIL: 'kutamamadambi842@gmail.com', ABS_ID: 1 }];
      callback(null, authors);
    }
   
  }),
}));

describe('POST /absA', () => {
  it('should add an abstract author and redirect to /okay', async () => {
    const app = express();
    app.use(express.urlencoded({ extended: false })); // To parse request body
    app.use('/', router);

    const response = await request(app)
      .post('/absA')
      .send({ members: '1,kutamamadambi842@gmail.com,Madambi kutama' })
      .redirects(1);

    // Verify the response
    expect(response.status).toBe(200);
    expect(response.header.location).toBe('/okay');
   
  });

  it('should send an error message if the author already exists', async () => {
    const app = express();
    app.use(express.urlencoded({ extended: false })); // To parse request body
    app.use('/', router);

    // Mock the database module to simulate an error
    jest.mock('../database', () => ({
      query: jest.fn((query, callback) => {
        // Simulate error for INSERT query
        if (query.includes('INSERT INTO abs_authors')) {
          const error = new Error('Author Already Exists!');
          callback(error);
        }
      
      }),
    }));

    const response = await request(app)
      .post('/absA')
      .send({ members: '1,kutamamadambi842@gmail.com,Madambi Kutama' });

    // Verify the response
    expect(response.status).toBe(200);
    expect(response.text).toBe('Author Already Exists!');
  });

});
