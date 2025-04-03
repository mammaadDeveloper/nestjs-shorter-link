import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isURL } from 'class-validator';

@Injectable()
export class ValidateUrlPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'string' || !isURL(value, { require_protocol: true }))
      throw new BadRequestException(
        'Invalid URL format! URL must include http:// or https://',
      );
    return value;
  }
}
