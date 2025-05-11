import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength, IsOptional, IsBoolean } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @Field()
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field({ defaultValue: false })
  @IsBoolean()
  completed: boolean;
}
