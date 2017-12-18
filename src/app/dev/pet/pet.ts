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

export interface breedsList {
  breeds: Array<breedsName>;
}
export interface breedsName {
  breeds_name: string;
}
