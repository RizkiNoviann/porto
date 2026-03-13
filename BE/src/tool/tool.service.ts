import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export class ToolDto {
  name: string;
  image?: string;
  category: string;
}

@Injectable()
export class ToolService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.tool.findMany();
  }

  async findOne(id: number) {
    const tool = await this.prisma.tool.findUnique({ where: { id } });
    if (!tool) throw new NotFoundException(`Tool #${id} not found`);
    return tool;
  }

  create(dto: ToolDto) {
    return this.prisma.tool.create({ data: dto });
  }

  async update(id: number, dto: Partial<ToolDto>) {
    await this.findOne(id);
    return this.prisma.tool.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.tool.delete({ where: { id } });
  }
}
