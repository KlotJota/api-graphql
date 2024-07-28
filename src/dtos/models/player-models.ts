import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Player {
    @Field()
    name: string
}