import { Controller } from '@nestjs/common';
import { VtdTableController } from 'src/common/modules/vtdTable/vtdTable.controller';

import { CharacterService } from './character.service';

@Controller('character')
export class CharacterController extends VtdTableController {
  constructor(readonly characterService: CharacterService) {
    super(characterService);
  }
}
