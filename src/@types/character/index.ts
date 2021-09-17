interface Location {
    name: string;
    url: string;
}

export interface Character {
    id: number;
    name: string,
    image: string,
    status: 'Alive' | 'Dead' | 'unknown',
    species: string,
    location: Location,
    episode: Array<string>
}

