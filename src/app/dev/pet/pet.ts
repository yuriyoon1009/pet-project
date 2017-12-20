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
  is_neutering?: boolean;
  is_active: boolean;
  ages: string;
  image: string;
}

export class PetAges {
  pet_age: number;
  conversed_age: number;
}
