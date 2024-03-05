import { Module } from '@nestjs/common';
import { BondController } from './bond.controller';
import { BondService } from './bond.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [BondController],
  providers: [BondService],
})
export class BondModule {}
