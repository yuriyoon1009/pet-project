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