export type CharacterType = {
  id: number;
  name: string;
  image: string;
  status: string;
  gender: string;
  species: string;
    location: string[];
  episode: string[];
  url: string;
};


export type PageableCharacterType = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: CharacterType[];
} | null;