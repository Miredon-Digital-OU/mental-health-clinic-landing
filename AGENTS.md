# Repository Guidelines

## Project Structure & Module Organization

- `src/` contains the React + TypeScript app entry (`main.tsx`) and root view (`App.tsx`).
- `src/components/` holds UI sections (PascalCase `.tsx` files like `Hero.tsx`, `FAQ.tsx`).
- `src/styles/` contains Sass stylesheets (`main.scss` plus partials like `_variables.scss`).
- `public/` is for static assets served as-is by Vite.
- `docs/` is project documentation (update when behavior or layout changes).
- `dist/` is the production build output (generated, do not edit).
- `srcstyles/` appears to be a legacy or scratch styling folder; keep it tidy or migrate content into `src/styles/`.

## Build, Test, and Development Commands

- `npm run dev` — start the Vite dev server with HMR for local development.
- `npm run build` — type-check (`tsc -b`) and create a production build in `dist/`.
- `npm run preview` — serve the production build locally for verification.
- `npm run lint` — run ESLint on the codebase.

## Coding Style & Naming Conventions

- Indentation: 2 spaces (match existing `.ts/.tsx` and `.scss` files).
- Components: PascalCase file names (`LeadForm.tsx`) and exported component names.
- Styles: Sass partials use leading underscores (`_mixins.scss`) and are imported into `main.scss`.
- Linting: ESLint is configured in `eslint.config.js` with React Hooks and React Refresh rules.
- Formatting: no Prettier config is present; keep changes consistent with nearby code.

## Testing Guidelines

- No test framework is configured yet; add tests alongside new features if you introduce a runner.
- If you add tests, document the runner and command here and follow a clear naming pattern (e.g., `*.test.tsx`).

## Commit & Pull Request Guidelines

- Git history currently includes only `Initial commit`, so no established convention exists.
- Use short, imperative commit messages (e.g., “Add hero CTA layout”).
- PRs should include: a concise summary, screenshots for UI changes, and notes on any new scripts or dependencies.

## Configuration Tips

- Vite config lives in `vite.config.ts`; TypeScript settings are in `tsconfig*.json`.
- Static assets should go in `public/` or `src/assets/` depending on whether you need bundling.
