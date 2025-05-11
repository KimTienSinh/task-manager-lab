import { BadRequestException } from '@nestjs/common';

export class CustomBadRequestException extends BadRequestException {
  constructor(message: string | string[]) {
    super({
      statusCode: 400,
      error: 'Bad Request',
      message: Array.isArray(message) ? message : [message],
    });
  }
}