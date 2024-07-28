import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { GamesResolver } from "./resolvers/games-resolver";

import path from 'node:path'

async function bootstrap() {
    const schema = await buildSchema({
        resolvers: [
            GamesResolver
        ],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql') // gera uma documentacao dos schemas
    })

    const server = new ApolloServer({
        schema
    })

    const { url } = await server.listen()

    console.log(`receba rodando em em ${url}`)
}

bootstrap()