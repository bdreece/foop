import type { Context } from 'types/context';

import { User } from '@generated/type-graphql';
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { hashPassword } from '../../../utils/password';

@InputType()
export class RegisterUserInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  phone: string;
  @Field()
  password: string;
}

@Resolver()
class RegisterResolver {
  @Mutation(returns => User)
  async registerUser(
    @Arg('input') { firstName, lastName, phone, password }: RegisterUserInput,
    @Ctx() { prisma: db }: Context,
  ) {
    const userExists =
      (await db.user.findUnique({
        where: {
          phone,
        },
        select: {
          id: true,
        },
      })) !== null;

    if (userExists) throw 'User already exists!';

    const { hash, salt } = await hashPassword(password);
    const user = await db.user.create({
      data: {
        firstName,
        lastName,
        phone,
        hash,
        salt,
        roles: {
          create: {
            role: {
              connectOrCreate: {
                where: {
                  name: 'user',
                },
                create: {
                  name: 'user',
                },
              },
            },
          },
        },
      },
    });

    return user;
  }
}

export default RegisterResolver;
