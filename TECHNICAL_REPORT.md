# Technical Report: Zalando Recommendation UI (LIKETIK X ZALANDO)

## 1. Overview
A modern, responsive React + Vite + Tailwind + shadcn/ui + Framer Motion application showcasing an AI-powered creator-to-product recommendation experience. The UI is optimized for performance, accessibility, and a premium Zalando-style aesthetic.

Tech stack:
- React + TypeScript (Vite)
- Tailwind CSS + shadcn/ui
- Framer Motion (animations)
- Lucide Icons

Key goals:
- Beautiful, branded UI with micro-interactions
- Mobile-first responsiveness
- Seamless switch between mock data and real API

---

## 2. App Architecture

```
src/
  components/
    CreatorCard.tsx          // Creator summary and metrics
    ProductCard.tsx          // Product group card with score and price
    KPIScoringSection.tsx    // KPI modules with progress bars
    ProductModal.tsx         // Variant details modal
  pages/
    Index.tsx                // Main page composition and flow
  services/
    api.ts                   // API types, config usage, and service methods
  config/
    api.ts                   // API base config + helpers
  index.css                  // Design tokens, utilities, animations
```

Data flow:
- `Index.tsx` orchestrates fetching creators and recommendations (service layer), renders `CreatorCard` → Products Grid → `KPIScoringSection`, and opens `ProductModal` for variants.
- `services/api.ts` centralizes all HTTP calls and mock fallbacks.
- `config/api.ts` controls base URL, feature flags, and URL builder.

---

## 3. Core Components & Logic

### 3.1 Index.tsx (Main Page)
Responsibilities:
- Fetch a random creator and their product-group recommendations
- Display creator info, recommended product groups, KPIs
- Handle loading, error states, and product-group modal

Key handlers:
- `fetchRandomCreator()` → `RecommendationAPI.getRandomCreatorWithRecommendations()`
- `handleOpenGroup(groupId)` → `RecommendationAPI.getProductGroup(groupId)`

Rendering order (as requested):
1) Creator header
2) Products grid (Kurierte Produkte)
3) KPI Scoring Section

### 3.2 CreatorCard.tsx
- Presents creator identity and four metrics (Follower, Engagement, Tier, Sprache)
- Subtle motion + shine hover

### 3.3 ProductCard.tsx
- Clean white card with hero image, score badge, details, and price
- Responsive, hover-lift, and shine effect

### 3.4 KPIScoringSection.tsx
- Six KPI modules with animated progress bars and per-metric colors
- Overall score summary

### 3.5 ProductModal.tsx
- Shows product group variants (images, name, color, size, price)
- Displays loading state while fetching

---

## 4. Service Layer (src/services/api.ts)

Types:
- `Creator`, `Recommendation`, `ProductGroup`, `ProductVariant`

Public methods:
- `fetchCreators()` → GET `/api/v1/creators?limit=100`
- `getCreatorRecommendations(creatorId)` → GET `/api/v1/recommendations/creators/{id}/product-groups?limit=5`
- `getProductGroup(groupId)` → GET `/api/v1/product-groups/{group_id}`
- `getRandomCreatorWithRecommendations()` → convenience method that fetches creators, picks one, then fetches recommendations

Mock fallback:
- Controlled via `shouldUseMockData()` from `config/api.ts`
- Returns curated mock creators, recommendations, and variants if API base is missing or mock flag is enabled

---

## 5. API Configuration (src/config/api.ts)

- `API_CONFIG.BASE_URL`: `import.meta.env.VITE_API_BASE || 'http://localhost:8080'`
- `API_CONFIG.USE_MOCK_DATA`: `import.meta.env.VITE_USE_MOCK_DATA === 'true'`
- `buildApiUrl(path)`: builds full URL safely
- `shouldUseMockData()`: returns true if mock flag on or no base URL

Environment examples:
```
# .env.local
VITE_API_BASE=https://your-backend.example.com
VITE_USE_MOCK_DATA=false
```

Vercel:
- Set `VITE_API_BASE` (and optionally `VITE_USE_MOCK_DATA=false`) in Project → Settings → Environment Variables

---

## 6. How to Implement/Connect the Real API

1) Configure base URL
- Local: create `.env.local` with `VITE_API_BASE=http://localhost:8080`
- Vercel: set the same in environment variables

2) Disable mock data (optional)
- Set `VITE_USE_MOCK_DATA=false` in env to force real API usage

3) Ensure backend routes match the expected contract:
- `GET /api/v1/creators?limit=100` → `{ creators: Creator[] }`
- `GET /api/v1/recommendations/creators/{account_id}/product-groups?limit=5` → `{ recommendations: Recommendation[] }`
- `GET /api/v1/product-groups/{group_id}` → `{ group: ProductGroup, variants: ProductVariant[] }`

4) Cross-Origin (CORS)
- If the backend is on a different domain, enable CORS or use a reverse proxy (Vite, Vercel rewrites) to avoid CORS issues during local dev.

5) Error handling
- Service methods throw on non-2xx responses; UI shows error state with retry and optionally logs fallback usage

6) Testing
- Start frontend: `npm run dev`
- Verify network calls in browser DevTools → Network
- Check console logs for "Using mock data" when mocks are active

---

## 7. Styling & Animations

- Design tokens in `src/index.css` (Zalando orange palette)
- Utilities: buttons, cards, glassmorphism, motion helpers
- Framer Motion for entrance, hover, and decorative animations

Accessibility:
- Motion respects reduced-motion where supported by browser
- Color contrast optimized for legibility on primary surfaces

---

## 8. Deployment Notes

- Vercel: build command `npm run build`, output `dist/`
- Ensure env vars are set for Preview/Production
- Open Graph and favicons configured in `index.html` and `/public`

---

## 9. Quick FAQ

- "How do I switch to real data?" → Set `VITE_API_BASE`, ensure routes respond, set `VITE_USE_MOCK_DATA=false`.
- "Where do I add a new endpoint?" → Add a method in `services/api.ts`, import and call it from the component.
- "Can I change the branding?" → Update header/footer labels in `src/pages/Index.tsx` and color tokens in `src/index.css`.

---

## 10. Next Steps (Optional)
- Add skeletons for cards and modal items
- Integrate toast notifications for modal errors
- Add unit tests for `services/api.ts` and UI smoke tests
