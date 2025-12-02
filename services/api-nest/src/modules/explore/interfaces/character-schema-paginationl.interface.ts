import { CharacterSchema } from './character-schema.interface';

export interface CharacterSchemaPagination {
    info: {
        count: number;
        pages: number;
        next: number | null;
        prev: number | null;
    };
    results: CharacterSchema[];
}
