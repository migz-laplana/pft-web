# pft-web

## Description

Frontend UI for Physical Fitness Test (PFT) web app.

## Tech Stack

- Nuxt 3
- Kinde Auth (nuxt module)
- PrimeVue
- Primeflex

## Local Setup

1. Make sure that the backend service (pft-service) is also running.
2. Create `.env` file at root directory and copy contents from `.env.example` file, then supply needed environment variables.
3. Start the app:

```bash
# install dependencies
npm i

# start development server
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```
