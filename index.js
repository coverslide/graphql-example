const http = require('http');
const Koa = require('koa');
const mount = require('koa-mount');
const bodyParser = require('koa-bodyparser');
const { graphql } = require('graphql');
const schema = require('./schema');
const resolver = require('./resolver');

const app = new Koa();
const gapp = new Koa();

gapp.use(bodyParser({enableTypes: ['text'], extendTypes: {text: ["application/graphql"]}}));

gapp.use(async function (ctx, next) {
  ctx.body = await graphql(schema, ctx.request.body, resolver, ctx.request);
});

app.use(mount("/graphql", gapp));

const server = http.createServer(app.callback());

server.listen(5454, (...args) => {
  console.log('Listening on', server.address());
})
