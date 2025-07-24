import { BadRequestException } from '@nestjs/common';
import { isUUID } from 'class-validator';

export function validateUUIDOrThrow(id: string, fieldName = 'ID') {
  if (!isUUID(id)) {
    throw new BadRequestException(`Invalid UUID format for ${fieldName}.`);
  }
}