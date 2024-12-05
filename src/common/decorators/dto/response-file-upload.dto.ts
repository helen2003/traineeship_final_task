import { ApiProperty } from '@nestjs/swagger';

export class ResponseFileUploadDto {
  @ApiProperty({ example: '1', description: 'Идентификатор файла' })
  id: number;

  @ApiProperty({ example: '7ad01000-9a14-49be-a2e5-a248100a00e0.jpg', description: 'Имя файла' })
  name: string;

  @ApiProperty({ example: 'null', description: 'Идентификатор продукта изображения' })
  productId: any;
}
