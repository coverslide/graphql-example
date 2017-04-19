const {
  buildSchema
} = require('graphql');
const fs = require('fs');

const schema = buildSchema(fs.readFileSync(__dirname + '/schema.gql', 'utf8'));

module.exports = schema;
