import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export class ProjectDto {
  title: string;
  description: string;
  tags: string; // JSON string
  image?: string;
  link?: string;
  order?: number;
}

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.project.findMany({
      orderBy: [{ order: 'asc' }, { id: 'asc' }],
    });
  }

  async findOne(id: number) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) throw new NotFoundException(`Project #${id} not found`);
    return project;
  }

  async create(dto: ProjectDto) {
    const last = await this.prisma.project.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    return this.prisma.project.create({
      data: {
        ...dto,
        order: dto.order ?? (last?.order ?? -1) + 1,
      },
    });
  }

  async update(id: number, dto: Partial<ProjectDto>) {
    await this.findOne(id);
    return this.prisma.project.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.project.delete({ where: { id } });
  }

  async reorder(items: { id: number; order: number }[]) {
    await Promise.all(
      items.map(({ id, order }) =>
        this.prisma.project.update({ where: { id }, data: { order } }),
      ),
    );
  }
}
