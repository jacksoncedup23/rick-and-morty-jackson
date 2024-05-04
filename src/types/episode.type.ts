export type EpisodeType = {
    id: number;
    name: string;
    air_date: string;
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