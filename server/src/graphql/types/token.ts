import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AccessToken {
  @Field()
  accessToken: string;

  @Field()
  expiresIn: number;

  constructor(accessToken: string, expiresIn: number) {
    this.accessToken = accessToken;
    this.expiresIn = expiresIn;
  }
}
