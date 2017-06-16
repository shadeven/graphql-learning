var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var pgp = require('pg-promise');
var db = pgp('postgres://eqadmin:Eque11a@flextra.dcs.flinders.edu.au:5432/flextra-dev');

var schema = buildSchema(`
  type Dice {
    num: Int
    color: String
  }

  type Query {
    quoteOfTheDay: String
    rollDice(num: Int!): Dice
    rollDices: [Int]
  }
  
  type Mutation {
    
  }
`);

var root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },

  rollDice: ({num}) => {
    var dice = {
      num: num,
      color: "Blue"
    }

    return dice;
  },

  rollDices: () => {
    var dices = [1, 2, 3];
    return dices;
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
