import { Arg, Query, Resolver } from 'type-graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  public async hello(
    @Arg('name', { nullable: true, defaultValue: 'World!' }) name?: string
  ) {
    return `Hello ${name}`;
  }
}
