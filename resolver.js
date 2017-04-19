const Loki = require('lokijs');
const defer = require('@cover-slide/defer');
const db = new Loki('db/loki.db', {autoload: true, autosave: true, autoloadCallback});

const deferredLoad = defer();

async function getCollection (name) {
  await deferredLoad.promise;
  return db.getCollection(name) || db.addCollection(name);
}

function autoloadCallback () {
  deferredLoad.resolve();
}

exports.user = async function (args, context, query) {
  const users = await getCollection('users');
  return users.get(args.id);
}

exports.finduser = async function (args, context, query) {
  const users = await getCollection('users');
  return users.find(args);
}

exports.createUser = async function (args, context, query) {
  const users = await getCollection('users');
  const user = users.insert(args);
  user.id = user.$loki
  return user;
}


