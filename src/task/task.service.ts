import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dtos/create-task.input';
import { UpdateTaskInput } from './dtos/update-task.input';
import { TaskFilterInput } from './dtos/task-filter.input';
import { PaginationInput } from './dtos/pagination.input';
import { CustomBadRequestException } from '../common/exceptions/bad-request.exception';
import { validate } from 'class-validator';


@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(filter?: TaskFilterInput, pagination?: PaginationInput): Promise<Task[]> {
    const where: FindOptionsWhere<Task> = {};

    if (filter?.completed !== undefined) {
      where.completed = filter.completed;
    }

    if (filter?.titleContains) {
      where.title = Like(`%${filter.titleContains}%`);
    }

    if (pagination?.limit && pagination.limit > 50) {
    throw new CustomBadRequestException('limit must not be greater than 50');
    }

    return this.taskRepository.find({
      where,
      skip: pagination?.offset ?? 0,
      take: pagination?.limit ?? 10,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    return task;
  }

  async create(input: CreateTaskInput): Promise<Task> {
  const task = this.taskRepository.create({
    ...input,               
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return this.taskRepository.save(task);
}

  async update(id: number, input: UpdateTaskInput): Promise<Task> {
    const task = await this.findOne(id);
    Object.assign(task, input);
    return this.taskRepository.save(task);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.taskRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}