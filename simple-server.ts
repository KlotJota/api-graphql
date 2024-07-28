import { ApolloServer, gql } from 'apollo-server'
import { randomUUID } from 'node:crypto'

/**
 *  Problemas que graphql resolve:
 * 
 * Under Fetching
 * em requisições onde em teoria fosse preciso que mais dados fossem retornados, mais requisições precisariam ser
 * feitas, requisitando mais do sistema. O Graphl resolve isso, pois nele temos um controler de manipulação nos
 * retornos muito melhor
 * 
 * Over Fetching
 * caso contrario do under. Em rotas onde os mesmos dados mencionados no exemplo anterior nao fossem necessarios,
 * eles estariam sendo trazidos desnecessariamente. Ou seja, mais do que precisamos
 */

/**
 * Schema first approach
 * mexemos primeiro no schema, depois no codigo em si
 * 
 * Code first
 * abordagem reversa onde o schema é criado de modo automatico com base no codigo escrito
 */

const typeDefs = gql`
    type User {
        id: String!
        name: String!
    }

    type Query {
        users: [User!]!
    }

    type Mutation {
        createUser(name: String!): User!
    }
`
// A rota helloWorld vai retornar um texto. ! indica obrigatoriedade
// buscar algo = Query
// Criar alterar ou deletar = Mutation
// Cada query em tese representaria uma rota numa api

interface User {
    id: string
    name: string
}

const users: User[] = []

const server = new ApolloServer({
    typeDefs,
    resolvers: { // são tipo controllers
        Query: {
            users: () => {
                return users
            }
        },

        Mutation: {
            createUser: (_, args ) => {
                const user = {
                    id: randomUUID(),   // inserimos um user com id aleatorio
                    name: args.name     // inserimos o nome inserido em name de args no apollo server
                }

                users.push(user)

                return user
            }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`receba rodando em em ${url}`)
})