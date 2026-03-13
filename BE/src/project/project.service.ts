import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export class ProjectDto {
  title: string;
  description: string;
  tags: string; // JSON string
  image?: string;
  video?: string;
}

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.project.findMany();
  }

  async findOne(id: number) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) throw new NotFoundException(`Project #${id} not found`);
    return project;
  }

  create(dto: ProjectDto) {
    return this.prisma.project.create({ data: dto });
  }

  async update(id: number, dto: Partial<ProjectDto>) {
    await this.findOne(id);
    return this.prisma.project.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.project.delete({ where: { id } });
  }
}
