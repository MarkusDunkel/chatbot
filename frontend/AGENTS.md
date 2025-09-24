# Repository Guidelines

## Project Structure & Module Organization
- Source TypeScript lives in `src/`; keep UI widgets in `components/` and shared helpers adjacent (e.g. `chat-service.ts`).
- Entry `main.tsx` bootstraps React; `App.css`/`index.css` carry scoped and global styles.
- Static assets go in `public/`; Vite emits production bundles to `dist/`, which ESLint ignores.

## Build, Test, and Development Commands
- Run `npm install` to sync dependencies before any workflow or tooling command.
- `npm run dev` launches the Vite HMR server; point the backend at `http://localhost:8080`.
- `npm run build` compiles TypeScript project refs then creates an optimized bundle in `dist/`.
- `npm run preview` serves the production bundle for smoke checks on different browsers.
- `npm run lint` applies the shared ESLint config; resolve warnings or run `--fix` before commits.

## Coding Style & Naming Conventions
- Stick to 2-space indentation, TypeScript, and concise JSX; wrap props when they exceed 80 chars.
- Name React components/hooks in PascalCase or camelCase (`SimpleChat`, `useChatState`); modules stay kebab-case (`chat-service.ts`).
- Group imports by path depth and let ESLint enforce spacing; use `npm run lint -- --fix` for bulk cleanup.

## Testing Guidelines
- Co-locate unit tests as `*.test.tsx` next to the code or under `src/__tests__/`.
- Mock `fetch` to cover success and failure flows in `sendMessage` without hitting external APIs.
- Document manual or experimental test steps in the PR until a shared test runner script ships.

## Commit & Pull Request Guidelines
- Write short, imperative commit subjects (<50 chars) and expand with context in bodies when helpful.
- Rebase before PRs, link tracking issues, and attach UI screenshots or GIFs for changes touching `SimpleChat`.
- PRs should list validation (`npm run lint`, preview), note config tweaks, and flag any follow-on work.

## Environment & API Notes
- `src/chat-service.ts` defaults to `http://localhost:8080`; adjust `API_BASE_URL` per environment and call out overrides.
- Avoid committing secrets; use `.env.local` plus Vite `import.meta.env` and document required keys.
