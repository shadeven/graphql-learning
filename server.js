var express = require('express');
var graphqlHTTP = require('express-graphql');
var { graphql, GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLList } = require('graphql');
var pgp = require('pg-promise')();
var db = pgp('postgres://eqadmin:Eque11a@flextra.dcs.flinders.edu.au:5432/flextra-dev');

const Supervisor = new GraphQLObjectType({
  name: 'Supervisor',
  fields: () => ({
    id: {
      type: GraphQLID
    },

    supv_fan: {
      type: GraphQLString
    },

    family_name: {
      type: GraphQLString
    },

    given_name: {
      type: GraphQLString
    }
  })
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    viewer: {
      type: Supervisor,
      resolve(parent, args, {id}) {
        return db.one("select * from tbl_rhd_supervisors where id = $1", id);
      }
    },

    supervisor: {
      type: Supervisor,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(parent, {id}) {
        return db.one("select * from tbl_rhd_supervisors where id = $1", id);
      }
    }
  })
});

const Schema = new GraphQLSchema({
  query: Query
});

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: Schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
