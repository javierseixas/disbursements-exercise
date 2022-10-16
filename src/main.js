const app = require('./infrastructure/koa/app');

// require('./drivers')(app);
// require('./routes')(app);

module.exports = app.listen(process.env.PORT || 3000);