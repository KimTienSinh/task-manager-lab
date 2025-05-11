import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class TaskFilterInput {
  @Field(() => Boolean, { nullable: true })
  completed?: boolean;

  @Field(() => String, { nullable: true })
  titleContains?: string;
}