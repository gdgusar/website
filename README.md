# GDG USAR Website

This repository contains the source code for the Google Developer Groups (GDG) USAR website.
https://www.sanity.io/plugins/next-sanity

## Folder Structure
```
GDG_USAR_website/
├── src/                  # Source files
│   ├── components/      # React components
│   ├── pages/          # Page components
│   ├── styles/         # CSS/SCSS files
│   └── assets/         # Images, fonts, etc.
├── public/             # Static files
├── config/             # Configuration files
├── .env               # Environment variables
└── README.md          # Documentation
```

## Setup Environment

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Git

### Installation Steps
1. Clone the repository:
```bash
git clone https://github.com/yourusername/GDG_USAR_website.git
cd GDG_USAR_website
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Start development server:
```bash
npm run dev
```

## Sanity CMS

- Studio lives under `sanity/` and uses project `k9r7o650`, dataset `production`.
- Frontend reads these via env: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`.

### Configure
- Create `.env` from `.env.example` in the repo root and set the IDs.
- In Sanity manage (manage.sanity.io), add your frontend domain(s) to CORS (no credentials needed for public reads).

### Develop Studio locally
```bash
cd sanity
npm install
npm run dev
```
Studio runs locally and is not served by Next.js.

### Deploy Studio (separate URL)
```bash
cd sanity
npm run deploy
```
This publishes Studio to `https://<projectId>.sanity.studio`. Keep Studio separate from your frontend domain so it is not accessible within the production app.

If you want to embed Studio in the Next app for dev-only, you can add a route that renders Studio only when `process.env.NODE_ENV !== 'production'` and otherwise returns 404. By default, this project does not embed Studio.

### Tokens (optional)
Public content queries use the CDN without tokens. For private docs or draft previews, create a read token in Sanity and set `SANITY_API_READ_TOKEN`; use it only in server-side code.

## Important Notes
- Always create new branches for features/fixes
- Follow commit message conventions
- Keep dependencies updated
- Run tests before pushing code

## Crucial Files
- `package.json`: Contains project dependencies and scripts
- `.env`: Environment variables (don't commit this file)
- `.gitignore`: Lists files/folders to ignore in version control
- `src/index.js`: Application entry point
- `src/App.js`: Main application component
- `config/webpack.config.js`: Webpack configuration

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License.
