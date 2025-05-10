import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // Thêm ConfigModule
import { TaskModule } from './task/task.module';
import { Task } from './task/task.entity';

@Module({
  imports: [
    // Thêm ConfigModule để nạp file .env
    ConfigModule.forRoot({
      envFilePath: '.env', // Đường dẫn tới file .env
      isGlobal: true, // Đảm bảo cấu hình có thể sử dụng ở mọi nơi
    }),

    GraphQLModule.forRoot({
      autoSchemaFile: true, // tự động tạo schema từ code-first
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST, // Lấy từ biến môi trường
      port: 5432, // Chuyển đổi thành số
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Task],
      synchronize: false, // Đảm bảo chỉ sử dụng migration
    }),

    TaskModule,
  ],
})
export class AppModule {}