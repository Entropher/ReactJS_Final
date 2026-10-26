# ReactJS Midterm Project

This project is a small e-commerce storefront built with Next.js and React. It pulls product data from the Fake Store API and presents a storefront experience with a product list, product detail pages, cart management, and a user profile section.

## Overview

The app simulates a basic online shopping experience with:

- A home/products catalog page
- Product detail pages
- Cart quantity controls and removal
- User profile data from a fake user endpoint
- User registration form with Yup validation and React Hook Form
- Responsive layout and reusable UI components
- Dynamic fetching from a public API

## Tech Stack

- Next.js 16
- React 19
- JavaScript
- CSS Modules
- Fake Store API
- Lucide React icons

## Project Structure

```text
src/
├── app/
│   ├── api/
│   │   └── products/
│   │       └── route.js
│   ├── cart/
│   │   └── page.js
│   ├── products/
│   │   └── details/
│   │       └── [id]/
│   │           └── page.js
│   ├── profile/
│   │   └── page.js
│   ├── globals.css
│   ├── layout.js
│   ├── page.js
│   └── page.module.css
├── components/
│   ├── footer/
│   └── navbar/
└── ...
```

## Main Routes

- `/` - product catalog and storefront home page
- `/products/details/[id]` - individual product detail page
- `/cart` - shopping cart view
- `/profile` - user profile page
- `/register` - registration form, submitted to JSONPlaceholder's mock users endpoint

The registration form validates all fields locally. For safety, it does not send
the password to the public mock endpoint; JSONPlaceholder does not persist
submitted user data.

## API

The app uses the public Fake Store API:

- `https://fakestoreapi.com/products`
- `https://fakestoreapi.com/users/3`

The local API route in `src/app/api/products/route.js` acts as a proxy to fetch product data for the frontend.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app in your browser:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev     # start the Next.js development server
npm run build   # create production build
npm run start   # run the production build
npm run lint    # run ESLint checks
```

## Notes

- This project is a frontend demo and uses mock/fake data.
- Product and profile data are loaded from remote APIs, so a network connection is required when running the app.
- The project is designed as a learning assignment and storefront prototype rather than a production e-commerce platform.
