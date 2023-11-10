import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';

@Module({
  controllers: [PersonsController],
  imports: [TypeOrmModule.forFeature([Person])],
  providers: [PersonsService],
})
export class PersonsModule {}
