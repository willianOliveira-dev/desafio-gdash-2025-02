import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { QueryParamApiExternal } from '../dto/query-param-api-external.dto';
import type { CharacterSchema } from '../interfaces/character-schema.interface';
import type { CharacterSchemaPagination } from '../interfaces/character-schema-paginationl.interface';
import type { LocationSchema } from '../interfaces/location-schema.interface';

@Injectable()
export class ExploreService {
    private readonly baseURL: string = 'https://rickandmortyapi.com/api';
    constructor(private readonly httpService: HttpService) {}

    private async fetchLocation(url: string | null): Promise<LocationSchema> {
        try {
            if (!url) {
                return {
                    id: 0,
                    name: 'unknown',
                    type: 'unknown',
                    dimension: 'unknown',
                    created: 'unknown',
                };
            }

            const responseLocation = this.httpService
                .get(url)
                .pipe(map((res) => res.data));
            const locationData = await firstValueFrom(responseLocation);

            const location: LocationSchema = {
                id: locationData.id,
                name: locationData.name,
                type: locationData.type,
                dimension: locationData.dimension,
                created: locationData.created,
            };

            return location;
        } catch (error) {
            throw new HttpException(
                'Houve um erro ao buscar localização.',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async searchForCharacters({
        page,
        name,
        gender,
        status,
    }: QueryParamApiExternal): Promise<CharacterSchemaPagination | []> {
        try {
            const params = new URLSearchParams();

            if (page) params.append('page', page.toString());
            if (name) params.append('name', name);
            if (gender) params.append('gender', gender);
            if (status) params.append('status', status);

            const url: string = `${this.baseURL}/character?${params.toString()}`;

            const responseCharacter = this.httpService
                .get(url)
                .pipe(map((res) => res.data));

            const characterData = await firstValueFrom(responseCharacter);
            
            const [next, prev] = [
                characterData.info.next,
                characterData.info.prev,
            ];

            const nextPage = next
                ? Number(new URL(next).searchParams.get('page'))
                : null;
            const prevPage = prev
                ? Number(new URL(prev).searchParams.get('page'))
                : null;

            const characters = await Promise.all(
                characterData.results.map(async (char: any) => {
                    const origin = await this.fetchLocation(char.origin.url);
                    const location = await this.fetchLocation(
                        char.location.url
                    );

                    const character: CharacterSchema = {
                        id: char.id,
                        name: char.name,
                        status: char.status,
                        species: char.species,
                        type: char.type,
                        gender: char.gender,
                        origin,
                        location,
                        image: char.image,
                        created: char.created,
                    };

                    return character;
                }) as CharacterSchema[]
            );

            const filteredCharacterData: CharacterSchemaPagination = {
                info: {
                    count: characterData.info.count,
                    pages: characterData.info.pages,
                    next: nextPage,
                    prev: prevPage,
                },
                results: characters,
            };

            return filteredCharacterData;
        } catch (error) {
            return [];
        }
    }

    async searchForCharacterById(id: number): Promise<CharacterSchema> {
        try {
            const responseCharacter = this.httpService.get(`${this.baseURL}/character/${id}`).pipe(map((res) => res.data));
            const characterData = await firstValueFrom(responseCharacter);

            const location = await this.fetchLocation(
                characterData.location.url
            );
            const origin = await this.fetchLocation(characterData.origin.url);

            const filteredCharacterData: CharacterSchema = {
                id: characterData.id,
                name: characterData.name,
                status: characterData.status,
                species: characterData.species,
                type: characterData.type,
                gender: characterData.gender,
                origin,
                location,
                image: characterData.image,
                created: characterData.created,
            };

            return filteredCharacterData;
        } catch (error) {
            throw new HttpException(
                'Personagem não encontrado.',
                HttpStatus.NOT_FOUND
            );
        }
    }
}
