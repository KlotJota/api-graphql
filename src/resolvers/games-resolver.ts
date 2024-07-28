import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { CreateGameInput } from "../dtos/inputs/create-game-input";
import { Game } from "../dtos/models/game-model";
import { Player } from "../dtos/models/player-models";

// abordagem code first

@Resolver(() => Game)
export class GamesResolver {
    @Query(() => [Game])
    async games() {
        return [
            {
                release: new Date(),
                name: "The witcher"
            }
        ]
    }

    @Mutation(() => Game)
    async createGame(@Arg('data') data: CreateGameInput) {  // @Arg indicar o argumento que sera passado (CreateGameInput)
        const game = {
            release: new Date(data.release),    // converte a data de string para Date
            name: data.name,
        }

        return game
    }

    @FieldResolver(() => Player)    // relação: 1 player joga 1 jogo. Necessario para trazer as infos de player junto com os games
    async player(@Root() game: Game) {  // indica o "pai", no caso, o game
        console.log(game)

        return {
            name: 'billy bruto'
        }
    }
}