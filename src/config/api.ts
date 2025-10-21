// API Configuration for Zalando Recommendation System
// Update these endpoints when your algorithm is ready on the 23rd

export const API_CONFIG = {
  // Base URL for the recommendation API
  // When your algorithm is ready, update this with the actual endpoint
  BASE_URL: import.meta.env.VITE_API_BASE || '',
  
  // Development mode - set to true to use mock data when API is not available
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA === 'true' || false,
  
  // API Endpoints
  ENDPOINTS: {
    CREATORS: '/api/v1/creators',
    RECOMMENDATIONS: '/api/v1/recommendations/creators',
    PRODUCT_GROUPS: '/api/v1/product-groups',
  },
  
  // Request timeout in milliseconds
  TIMEOUT: 10000,
  
  // Retry configuration
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  const base = API_CONFIG.BASE_URL || window.location.origin;
  return `${base}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

// Helper function to check if we should use mock data
export const shouldUseMockData = (): boolean => {
  return API_CONFIG.USE_MOCK_DATA || !API_CONFIG.BASE_URL;
};
