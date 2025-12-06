import type { Character } from './character.interface';

export interface ExplorePagination {
    info: {
        count: number;
        pages: number;
        next: number | null;
        prev: number | null;
    };
    results: Character[];
}
