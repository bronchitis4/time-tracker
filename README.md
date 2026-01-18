# Mini Time Tracker

A simple time tracking application built with NestJS and Prisma.

## Technologies Used

- NestJS - Progressive Node.js framework
- TypeScript - Type-safe JavaScript
- Prisma - Modern ORM for PostgreSQL
- PostgreSQL - Database
- class-validator - Request validation
- class-transformer - Data transformation

## Project Structure

```
mini-time-tracker/
├── src/
│   ├── main.ts                    # Application entry point
│   ├── app.module.ts              # Root module
│   ├── app.controller.ts          # Root controller
│   ├── app.service.ts             # Root service
│   ├── entries/                   # Time entries module
│   │   ├── entries.module.ts      # Module definition
│   │   ├── entries.controller.ts  # REST API endpoints
│   │   ├── entries.service.ts     # Business logic
│   │   ├── entries.repository.ts  # Data access layer
│   │   └── dto/                   # Data transfer objects
│   │       └── createEntriesDto.ts
│   └── prisma/                    # Prisma module
│       ├── prisma.module.ts       # Module definition
│       └── prisma.service.ts      # Prisma client service
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── migrations/                # Database migrations
├── test/                          # E2E tests
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the root directory:
```
DATABASE_URL="postgresql://user:password@localhost:5432/mini_time_tracker"
```

3. Set up the database:
```bash
npx prisma migrate dev
```

4. Generate Prisma client:
```bash
npx prisma generate
```

### Running the Application

Development mode with hot-reload:
```bash
npm run start:dev
```

Production mode:
```bash
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`

## Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in watch mode
- `npm run start:prod` - Start in production mode
- `npm run build` - Build the application
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Lint the codebase
- `npx prisma studio` - Open Prisma Studio for database management

## API Endpoints

### Entries
- `POST /entries` - Create a new time entry
- `GET /entries` - Get all time entries
- Additional endpoints as per implementation

## Database Schema

The application uses a single `Entry` table with the following fields:
- `id` - Auto-incrementing integer
- `date` - Entry date (string)
- `project` - Project name
- `hours` - Hours worked (decimal)
- `description` - Entry description
- `createdAt` - Timestamp of creation
