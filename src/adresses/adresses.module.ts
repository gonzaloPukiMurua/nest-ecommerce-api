import { Module } from '@nestjs/common';
import { AdressesService } from './adresses.service';
import { AdressesController } from './adresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './adresses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  providers: [AdressesService],
  controllers: [AdressesController],
})
export class AdressesModule {}
