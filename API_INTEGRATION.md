# API Integration Guide

## Overview
The Zalando Recommendation System is now ready for API integration. The system includes fallback to mock data when the API is not available, making it perfect for development and demonstration.

## Current Status
- ✅ **Mock Data Mode**: Currently using mock data for demonstration
- ✅ **API Ready**: All endpoints configured and ready for your algorithm
- ✅ **Fallback System**: Automatic fallback to mock data if API fails
- ✅ **Error Handling**: Comprehensive error handling with user-friendly messages

## API Endpoints Required

When your algorithm is ready on the 23rd, you'll need to provide these endpoints:

### 1. Get Creators
```
GET /api/v1/creators?limit=100
```
**Response:**
```json
{
  "creators": [
    {
      "account_id": "string",
      "followers": number,
      "engagement_rate": number,
      "tier": "string",
      "language": "string",
      "has_content": boolean
    }
  ]
}
```

### 2. Get Creator Recommendations
```
GET /api/v1/recommendations/creators/{creatorId}/product-groups?limit=5
```
**Response:**
```json
{
  "recommendations": [
    {
      "group_id": "string",
      "title": "string",
      "hero_image": "string",
      "category": "string",
      "region": "string",
      "variants_count": number,
      "price_min": number,
      "price_max": number,
      "currency": "string",
      "score": number
    }
  ]
}
```

### 3. Get Product Group Details
```
GET /api/v1/product-groups/{groupId}
```
**Response:**
```json
{
  "group": {
    "group_id": "string",
    "title": "string",
    "currency": "string"
  },
  "variants": [
    {
      "Product Image": "string",
      "Product Name": "string",
      "Size": "string",
      "Color": "string",
      "Product Price": number
    }
  ]
}
```

## Configuration

### Environment Variables
Create a `.env.local` file in the project root:

```env
# Set your API base URL
VITE_API_BASE=https://your-api-endpoint.com

# Set to true to force mock data mode
VITE_USE_MOCK_DATA=false
```

### API Configuration
The API configuration is in `src/config/api.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE || '',
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA === 'true' || false,
  ENDPOINTS: {
    CREATORS: '/api/v1/creators',
    RECOMMENDATIONS: '/api/v1/recommendations/creators',
    PRODUCT_GROUPS: '/api/v1/product-groups',
  },
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};
```

## Integration Steps

### Step 1: Update API Base URL
1. Set your API base URL in `.env.local`:
   ```env
   VITE_API_BASE=https://your-algorithm-api.com
   ```

### Step 2: Test API Endpoints
The system will automatically:
- Try to connect to your API
- Fall back to mock data if API is unavailable
- Show appropriate error messages if API fails

### Step 3: Verify Integration
1. Check browser console for API calls
2. Verify data is coming from your API (not mock data)
3. Test error handling by temporarily breaking API

## Features

### ✅ Automatic Fallback
- If API is not available, system uses mock data
- No breaking changes to the UI
- Seamless transition when API becomes available

### ✅ Error Handling
- User-friendly error messages in German
- Retry functionality
- Loading states for all API calls

### ✅ Loading States
- Professional loading animations
- Zalando-branded loading indicators
- Smooth transitions between states

### ✅ Type Safety
- Full TypeScript support
- Type-safe API responses
- IntelliSense for all API calls

## Testing

### Test with Mock Data
```bash
# Force mock data mode
VITE_USE_MOCK_DATA=true npm run dev
```

### Test with API
```bash
# Use real API
VITE_API_BASE=https://your-api.com npm run dev
```

## Deployment

The system is ready for deployment to Vercel with your API endpoints. Simply:

1. Set environment variables in Vercel dashboard
2. Deploy the application
3. Your algorithm endpoints will be automatically integrated

## Support

The system includes comprehensive logging and error handling. Check the browser console for:
- API call logs
- Fallback notifications
- Error details

All API calls are logged with timestamps and response data for debugging.
