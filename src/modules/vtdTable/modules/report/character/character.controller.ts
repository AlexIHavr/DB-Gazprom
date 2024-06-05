import { Controller } from '@nestjs/common';
import { VtdTableController } from '@vtdTable/vtdTable.controller';

import { CharacterService } from './character.service';

@Controller('character')
export class CharacterController extends VtdTableController {
  constructor(private readonly characterService: CharacterService) {
    super(characterService);
  }
}
