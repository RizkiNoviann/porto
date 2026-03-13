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
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { mkdirSync } from 'fs';
import { AuthGuard } from '@nestjs/passport';
import { ToolService } from './tool.service';

const toolsUploadDir = join(__dirname, '..', '..', 'public', 'uploads', 'tools');
mkdirSync(toolsUploadDir, { recursive: true });

const storage = diskStorage({
  destination: toolsUploadDir,
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + extname(file.originalname));
  },
});

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
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { name: string; category: string },
  ) {
    const imageUrl = file ? `/uploads/tools/${file.filename}` : undefined;
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
    if (file) dto.image = `/uploads/tools/${file.filename}`;
    return this.toolService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.toolService.remove(id);
  }
}
