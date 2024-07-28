import { Field, ObjectType } from "type-graphql";

/**
 * Aqui definimos apenas as informações que queremos consumir no frontend
 */

@ObjectType()   
export class Game {
    @Field()
    release: Date;

    @Field()
    name: string;
}