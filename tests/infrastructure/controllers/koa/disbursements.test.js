const request = require('supertest');
const server = require('../main.js');

afterAll(() => {
  server.close();
});

describe('GET /', () => {
  test('Returns BFF health and info', async () => {
    const response = await request(server).get('/api/v1/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('node-version');
    expect(response.body).toHaveProperty('appVersion');
  });
});