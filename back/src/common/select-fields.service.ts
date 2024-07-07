// select-fields.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class SelectFieldsService {
  getDataSelectFields(filed?:'post') {
    const data = {
      author: {
        select: {
          name: true,
          id:true
        }
      },
      id: true,
      content: true,
      createdAt: true,
      postId:true,
      countComments:true
    };
    if(filed=='post'){
      const{postId,...object}=data
      return object
    }
    return data
  }
  
}
