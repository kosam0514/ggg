
export interface Character {
  id: string;
  name: string;
  age: number;
  position: string;
  description: string;
  appearance: string;
  personality: string;
  imageRange: [number, number];
  themeColor: string;
  accentColor: string;
}

export interface ImageMemo {
  id: number;
  content: string;
}

export type ViewMode = 'all' | 'character' | 'common';
