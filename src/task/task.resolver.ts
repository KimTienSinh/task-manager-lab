// task.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Resolver(of => Task)
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  @Query(returns => [Task])
  async tasks() {
    return this.taskService.findAll();
  }

  @Mutation(returns => Task)
  async createTask(@Args('title') title: string) {
    return this.taskService.create({ title });
  }
}