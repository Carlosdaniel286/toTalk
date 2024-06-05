// select-fields.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class SelectFieldsService {
  getDataSelectFields() {
    return {
      author: {
        select: {
          name: true
        }
      },
      id: true,
      content: true,
      createdAt: true
    };
  }
}
