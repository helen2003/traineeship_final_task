import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Category } from '@prisma/client';

@ObjectType()
export class Categoties implements Category {
  @Field((type) => Int, { description: 'Идентификатор категории' })
  id: number;

  @Field({ description: 'Наименование категории' })
  name: string;

  @Field({ description: 'Дата создания категории' })
  created_at: Date;

  @Field({ description: 'Дата обновления категории' })
  update_at: Date;

  @Field({ description: 'Дата удаления категории' })
  delete_at: Date;
}
