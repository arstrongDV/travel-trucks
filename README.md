# TravelTrucks

TravelTrucks is a full-stack camper rental catalog built with Next.js (App Router). Users can browse a paginated catalog of campervans, filter by location, vehicle type, engine, and transmission, view detailed camper pages with photo galleries and reviews, and submit a booking request directly from the vehicle's page.

## Features

- **Camper catalog** with infinite scroll pagination and skeleton loading states
- **Filtering** by location, vehicle form (alcove, panel van, integrated, semi-integrated), engine type, and transmission, synced to the URL query string
- **Camper detail pages** with an image gallery, specifications, amenities, and reviews
- **Booking form** with client-side validation (React Hook Form + Yup) and toast notifications
- **Server-side rendering & metadata** — catalog pages generate dynamic `<title>` / Open Graph tags based on active filters
- **API proxy layer** — internal Next.js route handlers forward requests to the upstream TravelTrucks API, keeping the base URL and error handling centralized

## Tech Stack

| Category         | Technology                                 |
| ----------------- | ------------------------------------------ |
| Framework         | [Next.js 16](https://nextjs.org) (App Router) |
| Language          | TypeScript                                 |
| UI                | React 19, CSS Modules, Tailwind CSS 4      |
| Data fetching     | TanStack React Query, Axios                |
| Forms             | React Hook Form, Yup                       |
| Carousels         | Swiper                                     |
| Notifications     | react-hot-toast                            |
| Icons             | react-icons                                |

## Project Structure

```
app/
  api/campers/            # Internal API routes that proxy the upstream TravelTrucks API
  catalog/(filter)/       # Catalog page, parallel @sidebar slot, filtering UI
  catalog/[id]/           # Camper detail page
components/
  BookForm/               # Booking request form
  CamperGallery/          # Image gallery for camper detail pages
  Comments/               # Reviews list and review cards
  Header/, Hero/          # Layout and landing sections
  Sidebar/                # Catalog filters
  TruckCard/              # Camper card used in the catalog grid
  ui/                     # Shared UI primitives (Avatar, Loader, NotFound)
constans/                 # App-wide constants and filter enums
services/                 # Typed API client functions used by the UI
types/                    # Shared TypeScript types
```

## Getting Started

### Prerequisites

- Node.js 18.18+
- npm (or yarn / pnpm / bun)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```bash
NEXT_PUBLIC_API_URL=<upstream TravelTrucks API base URL>
```

This is used by the internal API routes (`app/api/campers/**`) to proxy requests to the upstream API.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## API Routes

The app exposes internal route handlers under `/api/campers`, which proxy the upstream API and normalize error responses:

| Route                                       | Description                          |
| -------------------------------------------- | ------------------------------------ |
| `GET /api/campers`                           | Paginated, filterable camper list    |
| `GET /api/campers/filters`                   | Available filter options             |
| `GET /api/campers/[id]`                      | Camper details                       |
| `GET /api/campers/[id]/reviews`               | Reviews for a camper                 |
| `POST /api/campers/[id]/booking-requests`     | Submit a booking request             |

## Deployment

The easiest way to deploy this app is via the [Vercel Platform](https://vercel.com/new). Make sure `NEXT_PUBLIC_API_URL` is configured as an environment variable in your deployment settings.
