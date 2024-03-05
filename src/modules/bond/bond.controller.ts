import { Controller, Get } from '@nestjs/common';
import { BondService } from './bond.service';

@Controller('bond')
export class BondController {
  constructor(private readonly bondService: BondService) {}

  @Get()
  async getTestBond() {
    return await this.bondService.getBond();
  }
}
