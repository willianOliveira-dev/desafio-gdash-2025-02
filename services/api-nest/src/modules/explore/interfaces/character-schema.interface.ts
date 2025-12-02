import { LocationSchema } from './location-schema.interface'

export interface CharacterSchema {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  type: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  origin: LocationSchema
  location: LocationSchema
  image: string
  created: string
}
