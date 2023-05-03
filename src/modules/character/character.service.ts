import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VtdTableService } from 'src/common/modules/vtdTable/vtdTable.service';

import { Character } from './models/character.model';

@Injectable()
export class CharacterService extends VtdTableService {
  constructor(@InjectModel(Character) readonly characterModel: typeof Character) {
    super(characterModel);
  }
}
