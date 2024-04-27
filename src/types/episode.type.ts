export type EpisodeType = {
    id: number;
    name: string;
    date: Date;
    episode: string;
    characters: string[];
    url: string;
  };
  
  export type PageableEpisodeType = {
    info: {
      count: number;
      pages: number;
      next: string;
      prev: string;
    };
    results: EpisodeType[];
  } | null;