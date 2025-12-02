import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Query,
} from '@nestjs/common';
import { ExploreService } from '../services/explore.service';
import { QueryParamApiExternal } from '../dto/query-param-api-external.dto';
import type { ResponseApi } from 'src/common/interfaces/response-api.interface';
import type { CharacterSchema } from '../interfaces/character-schema.interface';
import type { CharacterSchemaPagination } from '../interfaces/character-schema-paginationl.interface';

@Controller('explore')
export class ExploreController {
    constructor(private readonly exploreService: ExploreService) {}
    @Get('character')
    async searchForCharacter(
        @Query() dto: QueryParamApiExternal
    ): Promise<ResponseApi<CharacterSchemaPagination | []>> {
        const characters = await this.exploreService.searchForCharacters(dto);
        return {
            message: 'Personagens encontrados com sucesso.',
            data: characters,
        };
    }

    @Get('character/:id')
    async searchForCharacterById(
        @Param(
            'id',
            new ParseIntPipe({
                exceptionFactory: () =>
                    new HttpException(
                        'O ID do personagem deve ser um valor inteiro.',
                        HttpStatus.BAD_REQUEST
                    ),
            })
        )
        id: number
    ): Promise<ResponseApi<CharacterSchema>> {
        const character = await this.exploreService.searchForCharacterById(id);
        return {
            message: 'Personagem encontrado com sucesso.',
            data: character,
        };
    }
}
