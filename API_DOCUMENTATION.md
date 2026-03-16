# Portfolio Backend — API Documentation

> **Base URL:** `https://your-domain.com`
> **Version:** 1.0.0
> **Last Updated:** 2026-03-17

---

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Request & Response Format](#request--response-format)
- [Error Handling](#error-handling)
- [Public API Endpoints](#public-api-endpoints)
- [Admin API Endpoints](#admin-api-endpoints)
- [Data Models](#data-models)
- [Constants & Enums](#constants--enums)
- [Maintenance Mode](#maintenance-mode)

---

## Overview

This is a **Portfolio Backend API** built with Express.js and MongoDB. It exposes:

- **Public endpoints** at `/api/*` — no authentication required (subject to maintenance mode)
- **Admin endpoints** at `/admin/*` — require JWT token + App Key

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js (ES Modules) |
| Framework | Express.js 5.x |
| Database | MongoDB (Mongoose) |
| Auth | JWT + bcryptjs |
| File/Image Storage | ImageKit |
| Deployment | Vercel (serverless) |

---

## Authentication

Admin routes are protected by **two layers**:

### 1. JWT Token

Include in every admin request:

```
Authorization: Bearer <token>
```

Obtain a token via `POST /auth/login`.

### 2. App Key Header

```
x-app-key: <your-app-key>
```

This key is provided by the backend administrator.

---

## Request & Response Format

### Content Types

| Request Type | Content-Type |
|---|---|
| JSON body | `application/json` |
| File upload | `multipart/form-data` |

### Standard Success Response

```json
{
  "success": true,
  "data": { ... }
}
```

### Standard Error Response

```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Error Handling

| HTTP Status | Meaning |
|---|---|
| `200` | OK |
| `201` | Created |
| `400` | Bad Request (validation error, invalid ID, duplicate key) |
| `401` | Unauthorized (missing/invalid JWT token) |
| `403` | Forbidden (wrong role or missing app key) |
| `409` | Conflict (resource already exists) |
| `503` | Service Unavailable (maintenance mode active) |
| `500` | Internal Server Error |

---

## Public API Endpoints

> **Base path:** `/api`
> **Authentication:** None required
> **Note:** All public endpoints return `503` when maintenance mode is active.

---

### GET /api/

Health check.

**Response `200`:**
```
Portfolio API running 🚀
```

---

### GET /api/projects

Returns all **published** projects.

**Response `200`:**
```json
[
  {
    "_id": "string",
    "title": "string",
    "description": "string",
    "techStack": [
      { "_id": "string", "name": "string" }
    ],
    "category": [
      { "_id": "string", "name": "string" }
    ],
    "imageUrl": "string (URL)",
    "githubUrl": "string (URL)",
    "liveUrl": "string (URL)",
    "demoUrl": "string (URL)",
    "isPublished": true,
    "createdAt": "ISO date",
    "updatedAt": "ISO date"
  }
]
```

---

### GET /api/skills

Returns all **public** skills.

**Response `200`:**
```json
[
  {
    "_id": "string",
    "name": "string",
    "level": "Beginner | Intermediate | Advanced | Expert",
    "logo": "string (URL)",
    "category": { "_id": "string", "name": "string" },
    "isPublic": true,
    "createdAt": "ISO date",
    "updatedAt": "ISO date"
  }
]
```

---

### GET /api/services

Returns all **published** services.

**Response `200`:**
```json
[
  {
    "_id": "string",
    "title": "string",
    "description": "string",
    "logo": "string (URL)",
    "color": "string (hex color)",
    "colorRGB": "string (rgb value)",
    "isPublished": true,
    "createdAt": "ISO date",
    "updatedAt": "ISO date"
  }
]
```

---

### GET /api/contact-info

Returns all **public** contact info entries.

**Response `200`:**
```json
[
  {
    "_id": "string",
    "name": "string",
    "value": ["string"],
    "link": "string (URL, optional)",
    "icon": "string (optional)",
    "color": "string (optional)",
    "isPublic": true,
    "createdAt": "ISO date",
    "updatedAt": "ISO date"
  }
]
```

---

### GET /api/social-account

Returns all **public** social accounts.

**Response `200`:**
```json
[
  {
    "_id": "string",
    "name": "string",
    "link": "string (URL)",
    "icon": "string (optional)",
    "isPublic": true,
    "createdAt": "ISO date",
    "updatedAt": "ISO date"
  }
]
```

---

### GET /api/blogs

Returns all **published** blogs.

**Response `200`:**
```json
[
  {
    "_id": "string",
    "title": "string",
    "content": "string",
    "image": "string (URL, optional)",
    "author": "string",
    "tags": ["string"],
    "publishedAt": "ISO date",
    "url": "string (optional)",
    "isPublished": true,
    "createdAt": "ISO date",
    "updatedAt": "ISO date"
  }
]
```

---

### GET /api/educations

Returns all **public** education records.

**Response `200`:**
```json
[
  {
    "_id": "string",
    "institute": "string",
    "degree": "string",
    "fieldOfStudy": "string (optional)",
    "startDate": "ISO date",
    "endDate": "ISO date (optional)",
    "grade": "string (optional)",
    "description": "string (optional)",
    "logo": "string (URL, optional)",
    "isPublic": true,
    "createdAt": "ISO date",
    "updatedAt": "ISO date"
  }
]
```

---

### GET /api/work-experiences

Returns all **public** work experiences.

**Response `200`:**
```json
[
  {
    "_id": "string",
    "title": "string",
    "company": "string",
    "company_site": "string (URL, optional)",
    "startDate": "ISO date",
    "endDate": "ISO date (optional, null means current)",
    "logo": "string (URL, optional)",
    "responsibilities": ["string"],
    "isPublic": true,
    "createdAt": "ISO date",
    "updatedAt": "ISO date"
  }
]
```

---

### GET /api/system-features

Returns system/site configuration. Used for site metadata, maintenance status, logos, etc.

**Response `200`:**
```json
[
  {
    "_id": "string",
    "siteName": "string",
    "siteDescription": "string",
    "logo": "string (URL)",
    "favicon": "string (URL)",
    "heroImage": "string (URL)",
    "isMaintenance": false,
    "maintenanceMessage": "string",
    "isActive": true,
    "createdAt": "ISO date",
    "updatedAt": "ISO date"
  }
]
```

---

### GET /api/clients

Returns all **public** clients.

**Response `200`:**
```json
[
  {
    "_id": "string",
    "name": "string",
    "website": "string (URL, optional)",
    "logo": "string (URL)",
    "isPublic": true,
    "createdAt": "ISO date",
    "updatedAt": "ISO date"
  }
]
```

---

### GET /api/testimonials

Returns all **published** testimonials.

**Response `200`:**
```json
[
  {
    "_id": "string",
    "name": "string",
    "review": "string",
    "avatar": "string (URL, optional)",
    "client": {
      "_id": "string",
      "name": "string",
      "logo": "string (URL)"
    },
    "isPublished": true,
    "createdAt": "ISO date",
    "updatedAt": "ISO date"
  }
]
```

---

### GET /api/cv

Returns all **public** CVs.

**Response `200`:**
```json
[
  {
    "_id": "string",
    "name": "string",
    "cv": "string (URL)",
    "isPublic": true,
    "createdAt": "ISO date",
    "updatedAt": "ISO date"
  }
]
```

---

### GET /api/cv/:id

Get a single public CV by ID.

**Response `200`:** Single CV object
**Response `403`:** CV exists but is not public

---

### GET /api/cv/download/:id

Download CV file (PDF).

**Response `200`:** PDF file stream (Content-Disposition: attachment)
**Response `403`:** CV is not public
**Response `404`:** CV not found

---

## Admin API Endpoints

> **Base path:** `/admin`
> **Authentication:** Required — `Authorization: Bearer <token>` + `x-app-key: <key>`

---

## Auth Endpoints

### POST /auth/register

Create a new user account.

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "password": "string (required, min 6 chars)",
  "confirmPassword": "string (required)"
}
```

**Response `201`:**
```json
{
  "token": "string (JWT)",
  "user": {
    "_id": "string",
    "name": "string",
    "email": "string",
    "role": "user"
  }
}
```

**Errors:**
- `400` — Missing fields or passwords don't match
- `409` — Email already registered

---

### POST /auth/login

Login and receive a JWT token.

> **Note:** Only users with `role: "admin"` can successfully log in.

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response `200`:**
```json
{
  "token": "string (JWT)",
  "user": {
    "_id": "string",
    "name": "string",
    "email": "string",
    "role": "admin"
  }
}
```

**Errors:**
- `401` — Invalid credentials or insufficient role

---

## Admin — Projects

### GET /admin/projects

Get all projects (including unpublished).

**Response `200`:** Array of project objects (see [Data Models](#data-models))

---

### GET /admin/projects/:id

Get a single project by ID.

**Response `200`:** Single project object
**Response `404`:** Project not found

---

### POST /admin/projects

Create a new project.

**Content-Type:** `multipart/form-data`

| Field | Type | Required | Description |
|---|---|---|---|
| `image` | File | No | Project image |
| `title` | string | Yes | Project title |
| `description` | string | Yes | Project description |
| `techStack` | string[] | Yes | Array of Skill IDs |
| `category` | string[] | Yes | Array of ProjectCategory IDs |
| `githubUrl` | string | No | GitHub repository URL |
| `liveUrl` | string | No | Live site URL |
| `demoUrl` | string | No | Demo URL |
| `isClient` | boolean | No | Whether this is a client project |
| `client` | string | No | Client ID |
| `isPublished` | boolean | No | Default: `true` |

**Response `201`:** Created project object

---

### PUT /admin/projects/:id

Update a project. Same fields as POST. Providing a new image replaces the old one (old image deleted from ImageKit).

**Response `200`:** Updated project object

---

### DELETE /admin/projects/:id

Delete a project. Also deletes the project image from ImageKit.

**Response `200`:** Success message

---

## Admin — Project Categories

### GET /admin/projects-category

**Response `200`:** Array of `{ _id, name }`

### GET /admin/projects-category/:id

Get a single project category by ID.

**Response `200`:** Single category object
**Response `404`:** Category not found

### POST /admin/projects-category

**Request Body:**
```json
{ "name": "string (required, unique)" }
```
**Response `201`:** Created category

### PUT /admin/projects-category/:id

**Request Body:** Same as POST
**Response `200`:** Updated category

### DELETE /admin/projects-category/:id

**Response `200`:** Success message

---

## Admin — Skills

### GET /admin/skills

**Response `200`:** Array of skill objects (including private ones)

### GET /admin/skills/:id

Get a single skill by ID.

**Response `200`:** Single skill object
**Response `404`:** Skill not found

### POST /admin/skills

**Content-Type:** `multipart/form-data`

| Field | Type | Required | Description |
|---|---|---|---|
| `image` | File | No | Skill logo |
| `name` | string | Yes | Skill name (unique) |
| `level` | string | Yes | `Beginner \| Intermediate \| Advanced \| Expert` |
| `category` | string | Yes | SkillCategory ID |
| `isPublic` | boolean | No | Default: `true` |

**Response `201`:** Created skill

### PUT /admin/skills/:id

Same fields as POST.
**Response `200`:** Updated skill

### DELETE /admin/skills/:id

**Response `200`:** Success message

---

## Admin — Skill Categories

### GET /admin/skills-category

**Response `200`:** Array of `{ _id, name }`

### GET /admin/skills-category/:id

Get a single skill category by ID.

**Response `200`:** Single category object
**Response `404`:** Category not found

### POST /admin/skills-category

**Request Body:** `{ "name": "string (required, unique)" }`
**Response `201`:** Created category

### PUT /admin/skills-category/:id

**Response `200`:** Updated category

### DELETE /admin/skills-category/:id

**Response `200`:** Success message

---

## Admin — Services

### GET /admin/services

**Response `200`:** All services (including unpublished)

### GET /admin/services/:id

Get a single service by ID.

**Response `200`:** Single service object
**Response `404`:** Service not found

### POST /admin/services

**Content-Type:** `multipart/form-data`

| Field | Type | Required | Description |
|---|---|---|---|
| `image` | File | No | Service icon/logo |
| `title` | string | Yes | Service title |
| `description` | string | Yes | Service description |
| `color` | string | No | Hex color (e.g. `#FF5733`) |
| `colorRGB` | string | No | RGB value (e.g. `255, 87, 51`) |
| `isPublished` | boolean | No | Default: `true` |

**Response `201`:** Created service

### PUT /admin/services/:id

Same fields as POST.
**Response `200`:** Updated service

### DELETE /admin/services/:id

**Response `200`:** Success message

---

## Admin — Contact Info

### GET /admin/contact-info

**Response `200`:** All contact info entries (including private)

### GET /admin/contact-info/:id

Get a single contact info entry by ID.

**Response `200`:** Single contact info object
**Response `404`:** Entry not found

### POST /admin/contact-info

**Request Body:**
```json
{
  "name": "string (required)",
  "value": ["string (required)"],
  "link": "string (optional)",
  "icon": "string (optional)",
  "color": "string (optional)",
  "isPublic": "boolean (default: true)"
}
```

**Response `201`:** Created contact info

### PUT /admin/contact-info/:id

Same fields as POST.
**Response `200`:** Updated entry

### DELETE /admin/contact-info/:id

**Response `200`:** Success message

---

## Admin — Social Accounts

### GET /admin/social-account

**Response `200`:** All social accounts (including private)

### GET /admin/social-account/:id

Get a single social account by ID.

**Response `200`:** Single social account object
**Response `404`:** Account not found

### POST /admin/social-account

**Request Body:**
```json
{
  "name": "string (required)",
  "link": "string (required)",
  "icon": "string (optional)",
  "isPublic": "boolean (default: true)"
}
```

**Response `201`:** Created social account

### PUT /admin/social-account/:id

Same fields as POST.
**Response `200`:** Updated account

### DELETE /admin/social-account/:id

**Response `200`:** Success message

---

## Admin — Blogs

### GET /admin/blogs

**Response `200`:** All blogs (including unpublished)

### GET /admin/blogs/:id

Get a single blog by ID.

**Response `200`:** Single blog object
**Response `404`:** Blog not found

### POST /admin/blogs

**Content-Type:** `multipart/form-data`

| Field | Type | Required | Description |
|---|---|---|---|
| `image` | File | No | Blog cover image |
| `title` | string | Yes | Blog title |
| `content` | string | Yes | Blog content |
| `author` | string | No | Default: `"Hasan Chinthaka"` |
| `tags` | string[] | No | Array of tag strings |
| `publishedAt` | date | No | Publication date |
| `url` | string | No | External URL |
| `isPublished` | boolean | No | Default: `true` |

**Response `201`:** Created blog

### PUT /admin/blogs/:id

Same fields as POST.
**Response `200`:** Updated blog

### DELETE /admin/blogs/:id

**Response `200`:** Success message

---

## Admin — Educations

### GET /admin/educations

**Response `200`:** All education records (including private)

### GET /admin/educations/:id

Get a single education record by ID.

**Response `200`:** Single education object
**Response `404`:** Record not found

### POST /admin/educations

**Content-Type:** `multipart/form-data`

| Field | Type | Required | Description |
|---|---|---|---|
| `image` | File | No | Institution logo |
| `institute` | string | Yes | Institution name |
| `degree` | string | Yes | Degree obtained |
| `fieldOfStudy` | string | No | Field/major |
| `startDate` | date | No | Start date |
| `endDate` | date | No | End date (omit if ongoing) |
| `grade` | string | No | Grade/GPA |
| `description` | string | No | Additional info |
| `isPublic` | boolean | No | Default: `true` |

**Response `201`:** Created education record

### PUT /admin/educations/:id

Same fields as POST.
**Response `200`:** Updated record

### DELETE /admin/educations/:id

**Response `200`:** Success message

---

## Admin — Work Experiences

### GET /admin/work-experiences

**Response `200`:** All work experiences (including private)

### GET /admin/work-experiences/:id

Get a single work experience by ID.

**Response `200`:** Single work experience object
**Response `404`:** Record not found

### POST /admin/work-experiences

**Content-Type:** `multipart/form-data`

| Field | Type | Required | Description |
|---|---|---|---|
| `image` | File | No | Company logo |
| `title` | string | Yes | Job title |
| `company` | string | Yes | Company name |
| `company_site` | string | No | Company website URL |
| `startDate` | date | No | Start date |
| `endDate` | date | No | End date (omit if current) |
| `responsibilities` | string[] | No | List of responsibilities |
| `isPublic` | boolean | No | Default: `true` |

**Response `201`:** Created work experience

### PUT /admin/work-experiences/:id

Same fields as POST.
**Response `200`:** Updated experience

### DELETE /admin/work-experiences/:id

**Response `200`:** Success message

---

## Admin — Clients

### GET /admin/clients

**Response `200`:** All clients (including private)

### GET /admin/clients/:id

Get a single client by ID.

**Response `200`:** Single client object
**Response `404`:** Client not found

### POST /admin/clients

**Content-Type:** `multipart/form-data`

| Field | Type | Required | Description |
|---|---|---|---|
| `image` | File | Yes | Client logo |
| `name` | string | Yes | Client name |
| `website` | string | No | Client website URL |
| `isPublic` | boolean | No | Default: `true` |

**Response `201`:** Created client

### PUT /admin/clients/:id

Same fields as POST.
**Response `200`:** Updated client

### DELETE /admin/clients/:id

**Response `200`:** Success message

---

## Admin — Testimonials

### GET /admin/testimonials

**Response `200`:** All testimonials (including unpublished)

### GET /admin/testimonials/:id

Get a single testimonial by ID.

**Response `200`:** Single testimonial object
**Response `404`:** Testimonial not found

### POST /admin/testimonials

**Content-Type:** `multipart/form-data`

| Field | Type | Required | Description |
|---|---|---|---|
| `image` | File | No | Reviewer avatar |
| `name` | string | Yes | Reviewer name |
| `review` | string | Yes | Review text |
| `client` | string | No | Client ID (reference) |
| `isPublished` | boolean | No | Default: `true` |

**Response `201`:** Created testimonial

### PUT /admin/testimonials/:id

Same fields as POST.
**Response `200`:** Updated testimonial

### DELETE /admin/testimonials/:id

**Response `200`:** Success message

---

## Admin — System Features

Global site settings (logo, favicon, hero image, maintenance mode, etc.)

### GET /admin/system-features

**Response `200`:** Array of system configuration objects

### POST /admin/system-features

**Content-Type:** `multipart/form-data`

| Field | Type | Required | Description |
|---|---|---|---|
| `logo` | File | No | Site logo |
| `favicon` | File | No | Favicon |
| `heroImage` | File | No | Hero/banner image |
| `siteName` | string | No | Site name |
| `siteDescription` | string | No | Site description |
| `isMaintenance` | boolean | No | Enable maintenance mode |
| `maintenanceMessage` | string | No | Message shown during maintenance |
| `isActive` | boolean | No | Whether this config is active |

**Response `201`:** Created configuration

### PUT /admin/system-features/:id

Same fields as POST.
**Response `200`:** Updated configuration

### DELETE /admin/system-features/:id

**Response `200`:** Success message

---

## Admin — CV Management

### GET /admin/cv

**Response `200`:** All CVs (including non-public)

### GET /admin/cv/:id

**Response `200`:** Single CV object
**Response `403`:** CV is not public

### POST /admin/cv

Upload a new CV (PDF only, max 5MB).

**Content-Type:** `multipart/form-data`

| Field | Type | Required | Description |
|---|---|---|---|
| `cvFile` | File (PDF) | Yes | CV file — PDF only, max 5MB |
| `name` | string | Yes | CV label/name |
| `isPublic` | boolean | No | Default: `false` |
| `force` | boolean | No | If `true`, replaces existing public CV |

**Conflict Handling:**
- If `isPublic: true` and a public CV already exists → `409` with `{ needConfirmation: true }`
- Re-submit with `force: true` to deactivate the old public CV and set this one as public

**Response `201`:** Uploaded CV object

### PUT /admin/cv/:id

Same fields as POST.
**Response `200`:** Updated CV

### DELETE /admin/cv/:id

**Response `200`:** Success message

### GET /admin/cv/download/:id

Download a specific CV file.

**Response `200`:** PDF file stream
**Response `403`/`404`:** Error states

---

## Data Models

### Project

```ts
{
  _id: string
  title: string
  description: string
  imageUrl: string           // ImageKit URL
  imageId: string            // ImageKit file ID
  techStack: Skill[]         // Populated
  category: ProjectCategory[] // Populated
  githubUrl?: string
  liveUrl?: string
  demoUrl?: string
  isClient?: boolean
  client?: Client            // Populated
  isPublished: boolean
  createdAt: string          // ISO date
  updatedAt: string          // ISO date
}
```

### Skill

```ts
{
  _id: string
  name: string               // Unique
  level: SkillLevel
  logo?: string              // ImageKit URL
  logoId?: string
  category: SkillCategory    // Populated
  isPublic: boolean
  createdAt: string
  updatedAt: string
}
```

### Service

```ts
{
  _id: string
  title: string
  description: string
  logo?: string
  logoId?: string
  color?: string
  colorRGB?: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}
```

### Blog

```ts
{
  _id: string
  title: string
  content: string
  image?: string
  imageId?: string
  author: string
  tags: string[]
  publishedAt?: string
  url?: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}
```

### Education

```ts
{
  _id: string
  institute: string
  degree: string
  fieldOfStudy?: string
  startDate?: string
  endDate?: string
  grade?: string
  description?: string
  logo?: string
  logoId?: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}
```

### WorkExperience

```ts
{
  _id: string
  title: string
  company: string
  company_site?: string
  startDate?: string
  endDate?: string           // null = currently working there
  logo?: string
  logoId?: string
  responsibilities: string[]
  isPublic: boolean
  createdAt: string
  updatedAt: string
}
```

### ContactInfo

```ts
{
  _id: string
  name: string
  value: string[]
  link?: string
  icon?: string
  color?: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}
```

### SocialAccount

```ts
{
  _id: string
  name: string
  link: string
  icon?: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}
```

### Client

```ts
{
  _id: string
  name: string
  website?: string
  logo: string               // ImageKit URL
  logoId: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}
```

### Testimonial

```ts
{
  _id: string
  name: string
  review: string
  avatar?: string
  avatarId?: string
  client?: Client            // Populated
  isPublished: boolean
  createdAt: string
  updatedAt: string
}
```

### CV

```ts
{
  _id: string
  name: string
  cv: string                 // ImageKit URL to PDF
  cvId: string               // ImageKit file ID
  isPublic: boolean
  createdAt: string
  updatedAt: string
}
```

### SystemFeatures

```ts
{
  _id: string
  siteName?: string
  siteDescription?: string
  logo?: string
  logoId?: string
  favicon?: string
  faviconId?: string
  heroImage?: string
  heroImageId?: string
  isMaintenance: boolean
  maintenanceMessage?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}
```

---

## Constants & Enums

### User Roles

| Value | Description |
|---|---|
| `admin` | Full access to admin panel |
| `user` | Default role, no admin access |

### Skill Levels

| Value |
|---|
| `Beginner` |
| `Intermediate` |
| `Advanced` |
| `Expert` |

---

## Maintenance Mode

When `isMaintenance: true` is set in System Features, all **public** `/api/*` routes return:

**Response `503`:**
```json
{
  "success": false,
  "message": "Custom maintenance message or default"
}
```

Admin routes (`/admin/*`) are **not affected** by maintenance mode.

---

## Quick Reference — Public Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/` | Health check |
| GET | `/api/projects` | Published projects |
| GET | `/api/skills` | Public skills |
| GET | `/api/services` | Published services |
| GET | `/api/contact-info` | Public contact info |
| GET | `/api/social-account` | Public social accounts |
| GET | `/api/blogs` | Published blogs |
| GET | `/api/educations` | Public education records |
| GET | `/api/work-experiences` | Public work experiences |
| GET | `/api/system-features` | Site configuration |
| GET | `/api/clients` | Public clients |
| GET | `/api/testimonials` | Published testimonials |
| GET | `/api/cv` | Public CVs |
| GET | `/api/cv/:id` | Single public CV |
| GET | `/api/cv/download/:id` | Download CV (PDF) |

## Quick Reference — Admin Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login (admin only) |
| GET/POST | `/admin/projects` | List / Create projects |
| GET | `/admin/projects/:id` | Get single project |
| PUT/DELETE | `/admin/projects/:id` | Update / Delete project |
| GET/POST | `/admin/projects-category` | List / Create project categories |
| GET | `/admin/projects-category/:id` | Get single project category |
| PUT/DELETE | `/admin/projects-category/:id` | Update / Delete category |
| GET/POST | `/admin/skills` | List / Create skills |
| GET | `/admin/skills/:id` | Get single skill |
| PUT/DELETE | `/admin/skills/:id` | Update / Delete skill |
| GET/POST | `/admin/skills-category` | List / Create skill categories |
| GET | `/admin/skills-category/:id` | Get single skill category |
| PUT/DELETE | `/admin/skills-category/:id` | Update / Delete category |
| GET/POST | `/admin/services` | List / Create services |
| GET | `/admin/services/:id` | Get single service |
| PUT/DELETE | `/admin/services/:id` | Update / Delete service |
| GET/POST | `/admin/contact-info` | List / Create contact info |
| GET | `/admin/contact-info/:id` | Get single contact info entry |
| PUT/DELETE | `/admin/contact-info/:id` | Update / Delete contact info |
| GET/POST | `/admin/social-account` | List / Create social accounts |
| GET | `/admin/social-account/:id` | Get single social account |
| PUT/DELETE | `/admin/social-account/:id` | Update / Delete account |
| GET/POST | `/admin/blogs` | List / Create blogs |
| GET | `/admin/blogs/:id` | Get single blog |
| PUT/DELETE | `/admin/blogs/:id` | Update / Delete blog |
| GET/POST | `/admin/educations` | List / Create education records |
| GET | `/admin/educations/:id` | Get single education record |
| PUT/DELETE | `/admin/educations/:id` | Update / Delete record |
| GET/POST | `/admin/work-experiences` | List / Create work experiences |
| GET | `/admin/work-experiences/:id` | Get single work experience |
| PUT/DELETE | `/admin/work-experiences/:id` | Update / Delete experience |
| GET/POST | `/admin/clients` | List / Create clients |
| GET | `/admin/clients/:id` | Get single client |
| PUT/DELETE | `/admin/clients/:id` | Update / Delete client |
| GET/POST | `/admin/testimonials` | List / Create testimonials |
| GET | `/admin/testimonials/:id` | Get single testimonial |
| PUT/DELETE | `/admin/testimonials/:id` | Update / Delete testimonial |
| GET/POST | `/admin/system-features` | List / Create system config |
| PUT/DELETE | `/admin/system-features/:id` | Update / Delete config |
| GET/POST | `/admin/cv` | List / Upload CV |
| GET | `/admin/cv/:id` | Get single CV |
| PUT/DELETE | `/admin/cv/:id` | Update / Delete CV |
| GET | `/admin/cv/download/:id` | Download CV file |
