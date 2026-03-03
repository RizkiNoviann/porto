import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from './experience.entity';

export class ExperienceDto {
  company: string;
  position: string;
  year: string;
  period: string;
  description: string;
}

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private experienceRepo: Repository<Experience>,
  ) {}

  findAll(): Promise<Experience[]> {
    return this.experienceRepo.find();
  }

  async findOne(id: number): Promise<Experience> {
    const exp = await this.experienceRepo.findOne({ where: { id } });
    if (!exp) throw new NotFoundException(`Experience #${id} not found`);
    return exp;
  }

  create(dto: ExperienceDto): Promise<Experience> {
    const experience = this.experienceRepo.create(dto);
    return this.experienceRepo.save(experience);
  }

  async update(id: number, dto: Partial<ExperienceDto>): Promise<Experience> {
    await this.findOne(id);
    await this.experienceRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.experienceRepo.delete(id);
  }
}
