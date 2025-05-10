import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  // Phương thức findAll để lấy tất cả task
  async findAll(): Promise<Task[]> {
    return this.taskRepository.find(); // Lấy tất cả các task từ database
  }

  // Phương thức create để thêm task mới
  async create(createTaskDto: { title: string }): Promise<Task> {
    const task = this.taskRepository.create({
      title: createTaskDto.title,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.taskRepository.save(task);
  }
}
