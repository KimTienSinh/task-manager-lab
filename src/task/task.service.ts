import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
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