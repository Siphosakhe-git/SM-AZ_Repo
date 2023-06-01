
module.exports = {
    query: jest.fn((query, callback) => {
      // Implement the desired behavior based on the query
  
      // Simulate a successful query
      if (query === 'UPDATE conf_abstract SET ABS_STATUS="Accepted" WHERE ABS_ID = ?') {
        callback(null); // No error
      }
  
      // Simulate a query that returns data
      if (query === 'SELECT * FROM conf_abstract WHERE ABS_ID = ?') {
        const data = [{ ABS_ID: '123', ABS_STATUS: 'Accepted' }];
        callback(null, data);
      }
  
      
    }),
  };
  