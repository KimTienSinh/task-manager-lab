import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength, IsOptional, IsBoolean } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @Field()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field({ defaultValue: false })
  @IsBoolean()
  completed: boolean;
}
