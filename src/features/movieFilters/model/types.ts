export interface FilterOptions {
  genres: string[];
  ratings: number[];
  years: string[];
}

export interface ActiveFilters {
  genres: string[];
  minRating: number | null;
  fromYear: number | null;
  toYear: number | null;
}
