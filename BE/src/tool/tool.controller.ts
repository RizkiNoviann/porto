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
import { ToolService } from './tool.service';
import { uploadToBlob } from '../blob.util';

const storage = memoryStorage();

@Controller('tools')
export class ToolController {
  constructor(private toolService: ToolService) {}

  @Get()
  findAll() {
    return this.toolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.toolService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FileInterceptor('image', { storage }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { name: string; category: string },
  ) {
    const imageUrl = file
      ? await uploadToBlob(file.buffer, 'tools', file.originalname)
      : undefined;
    return this.toolService.create({ ...body, image: imageUrl });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @UseInterceptors(FileInterceptor('image', { storage }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { name?: string; category?: string },
  ) {
    const dto: any = { ...body };
    if (file) dto.image = await uploadToBlob(file.buffer, 'tools', file.originalname);
    return this.toolService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.toolService.remove(id);
  }
}
