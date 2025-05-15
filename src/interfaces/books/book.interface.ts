export interface Book {
  id: number;
  title: string;
  formats: {
    "image/jpeg"?: string;
  };
  authors: Array<{
    name: string;
    birth_year?: number;
    death_year?: number;
  }>;
  download_count: number;
}
