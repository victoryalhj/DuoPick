'use strict'

require('dotenv').config();
require('./models/db');

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors')

const groupRoutes = require('./routes/groupRoutes');
// const walletRoutes = require('');
// const planRoutes = require('');
// const archiveRoutes = require('');

const app = new Koa();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser());

app.use(groupRoutes.routes()).use(groupRoutes.allowedMethods());
// app.use(walletRoutes.routes()).use(walletRoutes.allowedMethods());
// app.use(planRoutes.routes()).use(planRoutes.allowedMethods());
// app.use(archiveRoutes.routes()).use(archiveRoutes.allowedMethods());

app.listen(PORT, () => {
  console.log('Server running')
})
