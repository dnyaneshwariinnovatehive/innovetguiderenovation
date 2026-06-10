# API Integration Guide

## Backend

The Flask backend runs on `http://localhost:5001` (configurable via `NEXT_PUBLIC_API_URL`).

No backend routes are modified. The frontend consumes existing endpoints as-is.

## Endpoints Consumed

### GET /api/filter_projects

Returns all active projects with filter/sort support.

**Query Params:** `categories`, `project_type`, `price_range`, `difficulty`, `sort`

**Response:**
```json
{
  "projects": [{ "id": 1, "title": "...", "price": 50, "technologies": [...], ... }],
  "total_count": 10,
  "category_counts": { "web_development": 5, ... },
  "project_type_counts": { "mini": 6, "major": 4 }
}
```

### POST /custom_project_request

Submits a custom project request.

**Body:** `application/x-www-form-urlencoded` with fields: `name`, `email`, `project_type`, `budget`, `technologies`, `deadline`, `description`, `additional_info`

### POST /buy_now/<project_id>

Submits a purchase enquiry.

**Body:** `application/x-www-form-urlencoded` with fields: `full_name`, `email`, `mobile`, `college`, `branch`, `year`, `city_state`

### POST /sell_your_project

Submits a student project for review.

**Body:** `multipart/form-data` with student details, project details, screenshots, zip file.

## Axios Instance

Configured in `src/lib/axios.js`:

```js
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});
```

## Key Rules

1. Never modify backend routes
2. Accept API responses as-is
3. Transform on frontend if needed (e.g., fallback images)
4. Handle API errors gracefully with fallback UI
