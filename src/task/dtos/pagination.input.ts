import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, Min, Max, IsOptional } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number;
}