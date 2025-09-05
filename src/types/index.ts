export interface Product {
  brand: string;
  product_name: string;
  price: number;
  category: string;
  description: string;
}

export interface AIRecommendation {
  product: Product;
  reason: string;
  matchScore: number;
}

export interface AppState {
  query: string;
  recommendations: AIRecommendation[];
  loading: boolean;
  hasSearched: boolean;
  refreshing: boolean;
}
