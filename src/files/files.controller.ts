import { Controller, Post, UploadedFile, UploadedFiles } from '@nestjs/common';
import { FilesService } from './files.service';
import {
  ApiManyFiles,
  ApiOneFile,
} from 'src/common/decorators/api-file.decorator';
import { File } from '@prisma/client';

@Controller('files')
export class FilesController {
  constructor(private fileService: FilesService) {}

  @Post('upload-file')
  @ApiOneFile()
  uploadFile(@UploadedFile() image: Express.Multer.File): Promise<File> {
    return this.fileService.create(image);
  }

  @Post('upload-files')
  @ApiManyFiles()
  uploadFiles(
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<File[]> {
    return this.fileService.createMany(images);
  }
}
