import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
class OneOfConstraint implements ValidatorConstraintInterface {
  // eslint-disable-next-line class-methods-use-this
  validate(value: any, args: ValidationArguments): boolean {
    // eslint-disable-next-line no-shadow
    const decorators: ((value: any) => boolean)[] = args.constraints;
    return decorators.some((d) => d(value));
  }
}

export function OneOf(comparators: ((value: any) => boolean)[], validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: comparators,
      validator: OneOfConstraint,
    });
  };
}
