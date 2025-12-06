export interface Character {
    id: number;
    name: string;
    status: 'Alive' | 'Dead' | 'unknown';
    species: string;
    type: string;
    gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
    origin: Location;
    location: Location;
    image: string;
    created: string;
}

export interface Location {
    id: number;
    name: string;
    type: string;
    dimension: string;
    created: string;
}
