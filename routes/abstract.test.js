const request = require('supertest');
const express = require('express');
const router = require('./router');

// Mock the database module
jest.mock('../database', () => ({
  query: jest.fn((query, callback) => {
    // Simulate successful query execution
    if (query.includes('INSERT INTO conf_abstract')) {
      const insertedId = 1;
      callback(null, { insertId: insertedId });
    } else if (query.includes('SELECT * FROM conf_abstract WHERE ABS_ID')) {
      const abstract = { ABS_ID: 1 };
      callback(null, [abstract]);
    } else if (query.includes('INSERT INTO abs_authors')) {
      callback(null); // No error
    } else if (query.includes('SELECT * FROM abs_authors WHERE ABS_ID')) {
      const authors = [{ USER_ID: 1, USER_NAME: 'John Doe', USER_EMAIL: 'johndoe@example.com', ABS_ID: 1 }];
      callback(null, authors);
    }
   
  }),
}));

describe('POST /abstract', () => {
  it('should submit an abstract and redirect to /valid', async () => {
    const app = express();
    app.use(express.urlencoded({ extended: false })); // To parse request body
    app.use('/', router);

    const response = await request(app)
      .post('/abstract')
      .send({ abs: 'Abstract content' })
      .redirects(1);

    // Verify the response
    expect(response.status).toBe(200);
    expect(response.header.location).toBe('/valid');
    
  });

  it('should send an error message for empty abstract field', async () => {
    const app = express();
    app.use(express.urlencoded({ extended: false })); // To parse request body
    app.use('/', router);

    const response = await request(app)
      .post('/abstract')
      .send({ abs: '' });

    // Verify the response
    expect(response.status).toBe(200);
    expect(response.text).toBe('Empty Field Not Required!');
  });

 
});

describe('GET /valid', () => {
  it('should render the "addAuth" view', async () => {
    const app = express();
    app.set('views', '/path/to/views'); // Set the views directory
    app.set('view engine', 'ejs'); // Set the view engine

    app.use('/', router);

    const response = await request(app)
      .get('/valid');

    // Verify the response
    expect(response.status).toBe(200);
    expect(response.text).toContain('addAuth');
  
  });

 
});
