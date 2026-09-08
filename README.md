<div align="center">

<img src="https://s3.login.no/beehive/img/logo/logo-white-small.svg" alt="Login logo" width="80" height="80" />

<h1>QueenBee</h1>

<p>
  <img src="https://img.shields.io/badge/TypeScript-fd8738?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Bun-fd8738?style=flat-square&logo=bun&logoColor=white" alt="Bun" />
  <img src="https://img.shields.io/badge/Next.js-fd8738?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-fd8738?style=flat-square&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-fd8738?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Docker-fd8738?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Authentik-fd8738?style=flat-square&logo=authentik&logoColor=white" alt="Authentik" />
</p>

</div>

---

QueenBee is the admin interface for [Login](https://login.no). It gives the organization a single place to manage Beehive content such as events, jobs, and announcements, while also providing internal tooling for monitoring infrastructure, inspecting traffic, and managing services.

The application connects to several internal APIs including Workerbee, Beekeeper, TekKom-Bot, and the Internal API, and uses Authentik for authentication.

## Features

- **Log in via Authentik** (OAuth2)
- **CMS** for events, jobs, announcements, albums, organizations, locations, and more
- **Internal tooling** for monitoring, traffic, logs, load balancing, and vulnerability tracking
- **Integrates with** Workerbee, Beekeeper, TekKom-Bot, and the Internal API

## Getting Started

1. **Configure environment**

   Create a `.env` file in the repo root. See [Configuration](#configuration) below or grab the values from 1Password.

2. **Start**

   ```bash
   docker compose up --build
   ```

   | Service  | URL                   |
   |----------|-----------------------|
   | QueenBee | http://localhost:8000 |

   For local development without Docker:

   ```bash
   bun install
   bun run dev
   ```

   | Service  | URL                   |
   |----------|-----------------------|
   | QueenBee | http://localhost:3000 |

## Configuration

All variables go in the root `.env` file.

| Name                            | Default                             | Notes                                |
|---------------------------------|-------------------------------------|--------------------------------------|
| `AUTHENTIK_URL`                 | `https://authentik.login.no`        | Base URL for your Authentik instance |
| `AUTHENTIK_CLIENT_ID`           |                                     | OAuth2 client ID from Authentik      |
| `AUTHENTIK_CLIENT_SECRET`       |                                     | OAuth2 client secret from Authentik  |
| `AUTHENTIK_API_TOKEN`           |                                     | Authentik API token                  |
| `WORKERBEE_API_URL`             | `https://workerbee.login.no/api/v2` | Workerbee API base URL               |
| `BEEKEEPER_API_URL`             | `https://beekeeper.login.no/api`    | Beekeeper API base URL               |
| `NEXT_PUBLIC_BEEKEEPER_API_URL` | `https://beekeeper.login.no/api`    | Beekeeper API URL (client-side)      |
| `TEKKOM_BOT_API_URL`            | `https://bot.login.no/api`          | TekKom-Bot API base URL              |
| `APP_API_URL`                   | `https://app.login.no/api`          | Internal app API base URL            |
| `CDN_URL`                       | `https://s3.login.no/beehive`       | CDN base URL for media assets        |
| `GIT_URL`                       | `https://gitlab.login.no`           | GitLab instance URL                  |

## Project Structure

- `src/app/(main)/` - CMS pages (events, jobs, announcements, albums, organizations, etc.)
- `src/app/internal/` - Internal tooling (monitoring, traffic, logs, load balancing, etc.)
- `src/app/api/` - API routes for authentication
- `src/components/` - React components
- `src/utils/` - Helper functions
- `src/hooks/` - Custom React hooks
