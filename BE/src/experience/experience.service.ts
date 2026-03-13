import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export class ExperienceDto {
  company: string;
  position: string;
  year: string;
  period: string;
  description: string;
}

@Injectable()
export class ExperienceService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.experience.findMany({ orderBy: { order: 'asc' } });
  }

  async findOne(id: number) {
    const exp = await this.prisma.experience.findUnique({ where: { id } });
    if (!exp) throw new NotFoundException(`Experience #${id} not found`);
    return exp;
  }

  create(dto: ExperienceDto) {
    return this.prisma.experience.create({ data: dto });
  }

  async update(id: number, dto: Partial<ExperienceDto>) {
    await this.findOne(id);
    return this.prisma.experience.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.experience.delete({ where: { id } });
  }

  async reorder(items: { id: number; order: number }[]) {
    await Promise.all(
      items.map(({ id, order }) =>
        this.prisma.experience.update({ where: { id }, data: { order } }),
      ),
    );
  }
}
