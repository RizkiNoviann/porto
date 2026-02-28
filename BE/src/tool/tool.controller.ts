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
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';
import { ToolService } from './tool.service';

const storage = diskStorage({
  destination: './public/uploads/tools',
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
    @Req() req: any,
  ) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const imageUrl = file
      ? `${baseUrl}/uploads/tools/${file.filename}`
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
    @Req() req: any,
  ) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const dto: any = { ...body };
    if (file) dto.image = `${baseUrl}/uploads/tools/${file.filename}`;
    return this.toolService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.toolService.remove(id);
  }
}
