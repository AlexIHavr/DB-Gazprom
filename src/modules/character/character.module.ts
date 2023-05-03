import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vtd } from 'src/modules/vtd/models/vtd.model';

import { Character } from './models/character.model';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService],
  imports: [SequelizeModule.forFeature([Character, Vtd])],
})
export class CharacterModule {}
