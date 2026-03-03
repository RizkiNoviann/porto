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
  UploadedFiles,
  Req,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';
import { ProjectService } from './project.service';

const storage = (folder: string) =>
  diskStorage({
    destination: `./public/uploads/${folder}`,
    filename: (req, file, cb) => {
      const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, unique + extname(file.originalname));
    },
  });

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
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './public/uploads/projects',
          filename: (req, file, cb) => {
            const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, unique + extname(file.originalname));
          },
        }),
      },
    ),
  )
  create(
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; video?: Express.Multer.File[] },
    @Body() body: { title: string; description: string; tags: string },
    @Req() req: any,
  ) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const dto: any = { ...body };
    if (files?.image?.[0])
      dto.image = `${baseUrl}/uploads/projects/${files.image[0].filename}`;
    if (files?.video?.[0])
      dto.video = `${baseUrl}/uploads/projects/${files.video[0].filename}`;
    return this.projectService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './public/uploads/projects',
          filename: (req, file, cb) => {
            const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, unique + extname(file.originalname));
          },
        }),
      },
    ),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; video?: Express.Multer.File[] },
    @Body() body: { title?: string; description?: string; tags?: string },
    @Req() req: any,
  ) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const dto: any = { ...body };
    if (files?.image?.[0])
      dto.image = `${baseUrl}/uploads/projects/${files.image[0].filename}`;
    if (files?.video?.[0])
      dto.video = `${baseUrl}/uploads/projects/${files.video[0].filename}`;
    return this.projectService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.remove(id);
  }
}
