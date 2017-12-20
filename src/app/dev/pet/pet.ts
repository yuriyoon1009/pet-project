export interface list {
  owner: object;
  pets: Array<pet>;
}

export interface pet {
  pk: number;
  species: string;
  breeds: string;
  name: string;
}

export interface BreedsList {
  breeds: Array<BreedsName>;
}
export interface BreedsName {
  breeds_name: string;
}
