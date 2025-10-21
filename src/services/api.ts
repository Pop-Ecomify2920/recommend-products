// API service layer for Zalando recommendation system
// This will be updated with actual endpoints when the algorithm is ready

import { API_CONFIG, buildApiUrl, shouldUseMockData } from '@/config/api';

export interface Creator {
  account_id: string;
  followers: number;
  engagement_rate: number;
  tier: string;
  language: string;
  has_content: boolean;
}

export interface Recommendation {
  group_id: string;
  title?: string;
  hero_image?: string;
  category?: string;
  region?: string;
  variants_count?: number;
  price_min?: number;
  price_max?: number;
  currency?: string;
  score: number;
}

export interface ProductGroup {
  group_id: string;
  title: string;
  currency: string;
}

export interface ProductVariant {
  "Product Image"?: string;
  "Product Name"?: string;
  "Product Size"?: string;
  "Size"?: string;
  "Product Color"?: string;
  "Color"?: string;
  "Product Price"?: number;
}

export interface CreatorsResponse {
  creators: Creator[];
}

export interface RecommendationsResponse {
  recommendations: Recommendation[];
}

export interface ProductGroupResponse {
  group: ProductGroup;
  variants: ProductVariant[];
}

// Mock data for development/fallback
const mockCreators: Creator[] = [
  {
    account_id: "fashion_influencer_01",
    followers: 1250000,
    engagement_rate: 0.0485,
    tier: "Premium",
    language: "en",
    has_content: true,
  },
  {
    account_id: "style_guru_22",
    followers: 890000,
    engagement_rate: 0.0623,
    tier: "Elite",
    language: "de",
    has_content: true,
  },
  {
    account_id: "trendsetter_99",
    followers: 2100000,
    engagement_rate: 0.0391,
    tier: "Premium",
    language: "en",
    has_content: true,
  },
];

const mockRecommendations: Recommendation[] = [
  {
    group_id: "sneakers_001",
    title: "Premium Sneakers",
    hero_image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
    category: "Footwear",
    region: "EU",
    variants_count: 12,
    price_min: 89.99,
    price_max: 129.99,
    currency: "€",
    score: 0.942,
  },
  {
    group_id: "jacket_042",
    title: "Designer Winter Jacket",
    hero_image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
    category: "Outerwear",
    region: "EU",
    variants_count: 8,
    price_min: 149.99,
    price_max: 199.99,
    currency: "€",
    score: 0.918,
  },
  {
    group_id: "dress_133",
    title: "Elegant Summer Dress",
    hero_image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop",
    category: "Dresses",
    region: "EU",
    variants_count: 15,
    price_min: 59.99,
    price_max: 89.99,
    currency: "€",
    score: 0.895,
  },
  {
    group_id: "jeans_089",
    title: "Classic Denim Jeans",
    hero_image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
    category: "Bottoms",
    region: "EU",
    variants_count: 20,
    price_min: 69.99,
    price_max: 99.99,
    currency: "€",
    score: 0.887,
  },
  {
    group_id: "bag_255",
    title: "Leather Handbag",
    hero_image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop",
    category: "Accessories",
    region: "EU",
    variants_count: 6,
    price_min: 119.99,
    price_max: 179.99,
    currency: "€",
    score: 0.871,
  },
  {
    group_id: "watch_201",
    title: "Smart Fitness Watch",
    hero_image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    category: "Accessories",
    region: "EU",
    variants_count: 4,
    price_min: 249.99,
    price_max: 349.99,
    currency: "€",
    score: 0.856,
  },
  {
    group_id: "shirt_078",
    title: "Premium Cotton Shirt",
    hero_image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop",
    category: "Tops",
    region: "EU",
    variants_count: 18,
    price_min: 39.99,
    price_max: 79.99,
    currency: "€",
    score: 0.834,
  },
  {
    group_id: "boots_312",
    title: "Leather Ankle Boots",
    hero_image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
    category: "Footwear",
    region: "EU",
    variants_count: 10,
    price_min: 119.99,
    price_max: 159.99,
    currency: "€",
    score: 0.812,
  },
];

// API Service Class
export class RecommendationAPI {
  /**
   * Fetch all available creators
   */
  static async fetchCreators(limit: number = 100): Promise<Creator[]> {
    // Use mock data if configured or if API is not available
    if (shouldUseMockData()) {
      console.log('Using mock data for creators');
      return mockCreators;
    }

    try {
      const response = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.CREATORS}?limit=${limit}`));
      
      if (!response.ok) {
        throw new Error(`Failed to fetch creators: ${response.status} ${response.statusText}`);
      }
      
      const data: CreatorsResponse = await response.json();
      return (data.creators || []).filter(creator => creator.has_content);
    } catch (error) {
      console.error('Error fetching creators:', error);
      console.log('Falling back to mock data');
      return mockCreators;
    }
  }

  /**
   * Get product recommendations for a specific creator
   */
  static async getCreatorRecommendations(
    creatorId: string, 
    limit: number = 5
  ): Promise<Recommendation[]> {
    // Use mock data if configured or if API is not available
    if (shouldUseMockData()) {
      console.log('Using mock data for recommendations');
      return mockRecommendations;
    }

    try {
      const response = await fetch(
        buildApiUrl(`${API_CONFIG.ENDPOINTS.RECOMMENDATIONS}/${encodeURIComponent(creatorId)}/product-groups?limit=${limit}`)
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch recommendations: ${response.status} ${response.statusText}`);
      }
      
      const data: RecommendationsResponse = await response.json();
      return data.recommendations || [];
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      console.log('Falling back to mock data');
      return mockRecommendations;
    }
  }

  /**
   * Get detailed product group information with variants
   */
  static async getProductGroup(groupId: string): Promise<ProductGroupResponse> {
    // Use mock data if configured or if API is not available
    if (shouldUseMockData()) {
      console.log('Using mock data for product group');
      const mockVariants: ProductVariant[] = Array.from({ length: 6 }, (_, i) => ({
        "Product Image": `https://images.unsplash.com/photo-${1542291026 + i}-7eec264c27ff?w=300&h=300&fit=crop`,
        "Product Name": `Variant ${i + 1}`,
        "Size": ["S", "M", "L", "XL"][i % 4],
        "Color": ["Black", "White", "Blue", "Red"][i % 4],
        "Product Price": 89.99 + i * 10,
      }));

      const mockGroup: ProductGroup = {
        group_id: groupId,
        title: `Product Group ${groupId}`,
        currency: "€",
      };

      return {
        group: mockGroup,
        variants: mockVariants,
      };
    }

    try {
      const response = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.PRODUCT_GROUPS}/${encodeURIComponent(groupId)}`));
      
      if (!response.ok) {
        throw new Error(`Failed to fetch product group: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching product group:', error);
      console.log('Falling back to mock data');
      
      // Fallback to mock data
      const mockVariants: ProductVariant[] = Array.from({ length: 6 }, (_, i) => ({
        "Product Image": `https://images.unsplash.com/photo-${1542291026 + i}-7eec264c27ff?w=300&h=300&fit=crop`,
        "Product Name": `Variant ${i + 1}`,
        "Size": ["S", "M", "L", "XL"][i % 4],
        "Color": ["Black", "White", "Blue", "Red"][i % 4],
        "Product Price": 89.99 + i * 10,
      }));

      const mockGroup: ProductGroup = {
        group_id: groupId,
        title: `Product Group ${groupId}`,
        currency: "€",
      };

      return {
        group: mockGroup,
        variants: mockVariants,
      };
    }
  }

  /**
   * Get a random creator with their recommendations
   */
  static async getRandomCreatorWithRecommendations(): Promise<{
    creator: Creator;
    recommendations: Recommendation[];
  }> {
    try {
      // First, get all available creators
      const creators = await this.fetchCreators();
      
      if (creators.length === 0) {
        throw new Error('No creators available');
      }

      // Select a random creator
      const randomCreator = creators[Math.floor(Math.random() * creators.length)];
      
      // Get recommendations for this creator
      const recommendations = await this.getCreatorRecommendations(randomCreator.account_id);
      
      return {
        creator: randomCreator,
        recommendations
      };
    } catch (error) {
      console.error('Error getting random creator with recommendations:', error);
      throw error;
    }
  }
}

// Utility functions for data formatting
export const formatPrice = (
  min?: number,
  max?: number,
  currency?: string
): string => {
  if (min == null && max == null) return "";
  const fmt = (v: number) => v.toFixed(2);
  const cur = currency?.trim() || "";
  
  if (min != null && max != null) {
    if (min === max) return `${cur}${fmt(min)}`;
    return `${cur}${fmt(min)} - ${cur}${fmt(max)}`;
  }
  return `${cur}${fmt(min ?? max!)}`;
};

export const formatNumber = (n: number): string => {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n.toString();
};

export const formatPercent = (v: number): string => (v * 100).toFixed(2);
