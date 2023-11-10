import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Person)
    private readonly productRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    try {
      const person = this.productRepository.create(createPersonDto);
      await this.productRepository.save(person);

      return person;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: string) {
    const person = await this.productRepository.findOneBy({ id });

    if (!person) {
      throw new NotFoundException(`Product with term ${id} not found`);
    }

    return person;
  }

  async update(id: string, updatePersonDto: UpdatePersonDto) {
    const person = await this.productRepository.preload({
      id: id,
      ...updatePersonDto,
    });

    if (!person) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }

    await this.productRepository.save(person);

    return person;
  }

  async remove(id: string) {
    const person = await this.findOne(id);

    await this.productRepository.remove(person);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
