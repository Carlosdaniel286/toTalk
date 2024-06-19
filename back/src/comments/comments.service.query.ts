import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SelectFieldsService } from 'src/common/select-fields.service';
import { FormatData } from 'src/common/formatData/formatData';


@Injectable()
export class CommentQueryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly formData: FormatData,
    private readonly selectFieldsService: SelectFieldsService,
  ) {}

  async getAllComments(postId: number, user: number) {
    const comments = await this.prisma.comment.findMany({
      where: {
        postId,
        parentId: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: this.selectFieldsService.getDataSelectFields()
    });

    return this.formData.serializeData(comments, user);
  }

  async getAllCommentsOfReponse(parentId: number, user: number) {
    const comments = await this.prisma.comment.findMany({
      where: {
        parentId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: this.selectFieldsService.getDataSelectFields()
    });

    return this.formData.serializeData(comments, user);
  }

}
