import { PipeTransform, Injectable, ArgumentMetadata, HttpException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipeError implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) console.log(errors);
    const details = errors
      .map(error => {
        if (error.constraints) {
          return error.constraints[Object.keys(error.constraints)[0]];
        }
        if (error.children) {
          return error.children.map(errChild => {
            errChild.children.map(err => {
              return err.constraints[Object.keys(err.constraints)[0]];
            });
            if (errChild.constraints) {
              return errChild.constraints[Object.keys(errChild.constraints)[0]];
            }
          })
        }
      })
      .join(', ');
    if (errors.length > 0) {
      throw new HttpException({ message: 'Datos inválidos', errors: details }, 422);
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}