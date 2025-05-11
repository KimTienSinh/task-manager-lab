import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dtos/create-task.input';
import { UpdateTaskInput } from './dtos/update-task.input';
import { TaskFilterInput } from './dtos/task-filter.input';
import { PaginationInput } from './dtos/pagination.input';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task])
  async tasks(
    @Args('filter', { nullable: true }) filter?: TaskFilterInput,
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,) 
  {
    return this.taskService.findAll(filter, pagination);
  }


  @Query(() => Task)
  async task(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.findOne(id);
  }

  @Mutation(returns => Task)
  async createTask(@Args('input') input: CreateTaskInput) {
    return this.taskService.create(input);
  }

  @Mutation(() => Task)
  async updateTask(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateTaskInput,
  ) {
    return this.taskService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteTask(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.delete(id);
  }
}
