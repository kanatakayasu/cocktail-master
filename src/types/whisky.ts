// ウイスキー蒸留所
export interface WhiskyDistillery {
  id: string;
  name: string;
  nameEn: string;
  country: 'scotland' | 'ireland' | 'usa' | 'canada' | 'japan' | 'other';
  region: string;
  founded?: string;
  owner?: string;
  description: string;
  brands: string[];
  features: string[];
  color: string;
  emoji: string;
  imageUrl?: string;
}

// ウイスキー分類ツリー (BeverageNodeと同じ型を再利用)
export type WhiskyTreeNode = {
  name: string;
  nameEn?: string;
  children?: WhiskyTreeNode[];
  color?: string;
};
