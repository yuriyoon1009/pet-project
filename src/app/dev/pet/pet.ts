

export class PetList {
  constructor(
    public owner: {
      pk: number,
      user_type: string,
      email: string,
      nickname: string,
      is_active: string,
      date_joined: string
    },
    public pets: Array<Pet>
  ) { }
}

export interface Pet {
  pk: number;
  species: string;
  breeds: string;
  name: string;
  birth_date: string;
  gender: string;
  body_color: string;
  identified_number?: string;
  is_neutering?: string;
  is_active: boolean;
  ages: string;
  image: string;
}

export interface BreedsList {
  breeds: Array<BreedsName>;
}
export interface BreedsName {
  breeds_name: string;
}

export class PetAges {
  pet_age: string;
  conversed_age: string;
}
/*export interface list {
  owner: object;
  pets: Array<pet>;
}

export interface pet {
  pk: number;
  species: string;
  breeds: string;
  name: string;
}*/
