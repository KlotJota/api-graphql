import { Field, InputType } from "type-graphql"


@InputType()
export class CreateGameInput {
    @Field()
    playerId: string

    @Field()
    release: string;

    @Field()
    name: string
}