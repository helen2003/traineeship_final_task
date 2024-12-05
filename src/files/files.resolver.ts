import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { FileModel } from './model/files.model';
import { FilesService } from './files.service';
import { name } from 'ejs';
import { File } from '@prisma/client';

@Resolver(() => FileModel)
export class FilesResolver {
  constructor(private readonly filesService: FilesService) {}

  @Mutation(() => Int)
  updateFileId(
    @Args('idFiles', { type: () => [Int] }) idFiles: Array<number>,
    @Args('idProduct', { type: () => Int }) idProduct: number,
  ): Promise<number> {
    return this.filesService.updateIdProductFile(idFiles, idProduct);
  }

  @Mutation(() => FileModel)
  deleteFile(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<File> {
    return this.filesService.delete(id);
  }
}
