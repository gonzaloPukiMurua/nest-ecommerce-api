import { Module } from '@nestjs/common';
import { AdressesService } from './adresses.service';
import { AdressesController } from './adresses.controller';

@Module({
  providers: [AdressesService],
  controllers: [AdressesController],
})
export class AdressesModule {}
