import 'reflect-metadata';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { applyDecorators, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { validateSync } from 'class-validator';
import { targetConstructorToSchema } from 'class-validator-jsonschema';

interface ISwaggerApiDoc {
  statusCode?: HttpStatus;
  responseExample?: string | number | object;
  responseType?: any;
  summary: string;
  exceptions?: HttpException[];
  bodyModel?: any;
  description?: string;
}

const tests = ['', '1', 'a', 1, -1, true, undefined, null];

const generateValidationExceptions = (model: any): (string | object)[] => {
  const errors = new Set<HttpException>();
  const set: { [key: string]: Set<string> } = {};
  const { properties } = targetConstructorToSchema(model); // validationMetadatasToSchemas()[model.name].properties;
  Object.keys(properties).forEach((key) => {
    tests.forEach((test) => {
      // eslint-disable-next-line new-cap
      const instance = new model();
      instance[key] = test;
      const errors = validateSync(instance, { stopAtFirstError: false });
      // eslint-disable-next-line no-restricted-syntax
      for (const e of errors) {
        if (e.constraints) {
          Object.keys(e.constraints).forEach((c) => {
            if (!set[e.property]) {
              set[e.property] = new Set();
            }
            set[e.property].add(e.constraints[c]);
          });
        }
      }
    });
  });

  if (Object.keys(set).length !== 0) {
    Object.keys(set).forEach((key) => {
      errors.add(
        new BadRequestException({
          property: key,
          errors: Array.from(set[key].values()),
        }),
      );
    });
    return Array.from(errors.values()).map((e) => e.getResponse());
  }
  return [];
};

export function SwaggerDoc({
  statusCode = HttpStatus.OK,
  responseExample,
  responseType,
  summary,
  exceptions,
  bodyModel,
  description = summary,
}: // eslint-disable-next-line @typescript-eslint/ban-types
ISwaggerApiDoc): Function {
  const allErrors: { [key: number]: (string | object)[] } = {};
  const errorDecorators = [];

  if (bodyModel && responseExample) {
    const validationErrors = generateValidationExceptions(bodyModel);
    if (validationErrors.length !== 0) {
      allErrors[400] = allErrors[400] || [];
      allErrors[400].push(...validationErrors);
    }
  }

  if (exceptions)
    exceptions.forEach((e) => {
      allErrors[e.getStatus()] = allErrors[e.getStatus()] || [];
      allErrors[e.getStatus()].push(e.message);
    });

  Object.keys(allErrors).forEach((key) => {
    errorDecorators.push(
      ApiException(() => new HttpException(key, Number(key)), {
        template: {
          errors: allErrors[key].map((e) => e),
          statusCode: 400,
          apiVersion: 'v1',
          responseTime: '1.62911ms',
        },
      }),
    );
  });

  const apiResOpts = {
    // : ApiResponseOptions
    status: statusCode,
    description,
  } as any;

  if (responseExample) {
    apiResOpts.schema = {
      example: {
        data: responseExample,
        errors: [''],
        apiVersion: 'v1',
        statusCode,
        responseTime: '3.3212479999999998ms',
      },
    };
  } else if (responseType) {
    class WrapperDto {
      @ApiProperty({ type: responseType })
      data;

      @ApiProperty({ type: [String], example: [''] })
      errors: string[];

      @ApiProperty({ type: String, example: 'v1' })
      apiVersion: string;

      @ApiProperty({ type: Number, example: statusCode })
      statusCode: number;

      @ApiProperty({ type: String, example: '3.3212479999999998ms' })
      responseTime: string;
    }

    apiResOpts.type = WrapperDto;
  }

  return applyDecorators(ApiResponse(apiResOpts), ...errorDecorators, ApiOperation({ summary }));
}
