export interface Book {
  id: number;
  title: string;
  formats: {
    "image/jpeg"?: string;
  };
  authors: Author[];
  download_count: number;
}

export interface Author {
  name: string;
  birth_year?: number;
  death_year?: number;
}
