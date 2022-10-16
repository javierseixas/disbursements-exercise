const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(bodyParser({
  enableTypes: ['json'],
  jsonLimit: '4mb',
  strict: true,
}));

module.exports = app;