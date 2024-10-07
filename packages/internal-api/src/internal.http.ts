import { Post, applyDecorators } from '@nestjs/common';

export function InternalHttp(event: string) {
  const arr = event.split('/');
  return applyDecorators(Post(arr[arr.length - 1]));
}
