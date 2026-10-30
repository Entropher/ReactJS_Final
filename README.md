# Fake Store

A Georgian-language storefront demo built with Next.js and React. Browse products from the Fake Store API, view product details, manage a shopping cart, and try the mock login and registration flows.

## Features

- Product catalog showing up to 20 products, with loading and error states
- Product detail pages with descriptions, prices, and ratings
- Add products to a Redux-powered cart, update quantities, and remove items
- Cart quantity is capped at 10 per product; cart data is held in memory and resets when the app reloads
- Temporarily remove products from the catalog and restore them during the current page session
- Demo user profile loaded from the Fake Store API
- Login form prefilled with the Fake Store API demo account (`johnd` / `m38rmF$`), Yup validation, and an optional “Remember me” token stored in browser local storage
- Registration form with Yup validation for username, email, and password, optional profile details, and React Hook Form
- Shared navigation, cart item count, footer, and responsive CSS Module styling

## Tech Stack

- Next.js 16.3
- React 19
- Redux Toolkit and React Redux
- JavaScript
- CSS Modules
- React Hook Form, Yup, and `@hookform/resolvers`
- Lucide React
- Fake Store API and JSONPlaceholder mock API

## Routes

| Route | Description |
| --- | --- |
| `/` | Product catalog |
| `/products/details/[id]` | Details for an individual product |
| `/cart` | Cart contents, quantity controls, and total |
| `/profile` | Demo profile for Fake Store API user 3 |
| `/login` | Mock login form |
| `/register` | Validated registration form |

## Data and Demo Limitations

- The catalog fetches `https://fakestoreapi.com/products`, and product detail pages fetch `https://fakestoreapi.com/products/[id]`.
- The profile page always displays the demo user at `https://fakestoreapi.com/users/3`.
- Login is sent to `https://fakestoreapi.com/auth/login`. The optional remembered token is stored in local storage; this demo does not use it to protect routes or authorize other API requests.
- Registration submits the username and email, plus any optional profile details provided, to `https://dummyjson.com/users/add`. The password is validated locally and is not sent. DummyJSON is a mock service and does not persist the registration; a successful response returns the user to the catalog.
- Cart contents and catalog removals are kept in client-side state and are not persisted.
- The app requires an internet connection to load product/profile data and use the mock authentication endpoints.

## Project Structure

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── cart/
│   ├── products/
│   │   └── details/
│   │       └── [id]/
│   ├── profile/
│   ├── AppShell.jsx
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   ├── footer/
│   └── navbar/
└── lib/
    └── store/
        └── store.js
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
npm run dev     # Start the Next.js development server
npm run build   # Create a production build
npm run start   # Start the production server
npm run lint    # Run ESLint
```

This project is a learning/demo storefront, not a production e-commerce application.
