import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema/type-defs.js";
import { resolvers } from "./schema/resolvers.js";
import express from 'express'

import cors from 'cors'

const app = express()


const server = new ApolloServer({
    typeDefs,
    resolvers,
    graphiql : true
});

app.use('/',
cors(),
)

server.listen().then(({ url }) => {
    console.log(`API is running at : ${url} `);
});