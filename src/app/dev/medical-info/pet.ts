export interface list {
    owner: object;
    pets: Array<pet>;
}
export interface pet {
   pk: number;
   spaecies: string;
   breeds: string;
   name: string;
}