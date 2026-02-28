import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tool } from './tool.entity';

export class ToolDto {
  name: string;
  image?: string;
  category: string;
}

@Injectable()
export class ToolService {
  constructor(
    @InjectRepository(Tool)
    private toolRepo: Repository<Tool>,
  ) {}

  findAll(): Promise<Tool[]> {
    return this.toolRepo.find();
  }

  async findOne(id: number): Promise<Tool> {
    const tool = await this.toolRepo.findOne({ where: { id } });
    if (!tool) throw new NotFoundException(`Tool #${id} not found`);
    return tool;
  }

  create(dto: ToolDto): Promise<Tool> {
    const tool = this.toolRepo.create(dto);
    return this.toolRepo.save(tool);
  }

  async update(id: number, dto: Partial<ToolDto>): Promise<Tool> {
    await this.findOne(id);
    await this.toolRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.toolRepo.delete(id);
  }
}
