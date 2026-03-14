import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { ProjectService } from './project.service';
import { uploadToBlob } from '../blob.util';

const storage = memoryStorage();

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FileInterceptor('image', { storage }))
  async create(
    @UploadedFile() imageFile: Express.Multer.File,
    @Body() body: { title: string; description: string; tags: string; link?: string },
  ) {
    const dto: any = { ...body };
    if (imageFile) dto.image = await uploadToBlob(imageFile.buffer, 'projects', imageFile.originalname);
    return this.projectService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @UseInterceptors(FileInterceptor('image', { storage }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() imageFile: Express.Multer.File,
    @Body() body: { title?: string; description?: string; tags?: string; link?: string },
  ) {
    const dto: any = { ...body };
    if (imageFile) dto.image = await uploadToBlob(imageFile.buffer, 'projects', imageFile.originalname);
    return this.projectService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.remove(id);
  }
}
