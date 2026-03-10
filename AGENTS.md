## Cursor Cloud specific instructions

This is the **Synthesis Design System** (`@user-interviews/ui-design-system`) — a React component library with Storybook documentation. There is no backend; it is a pure frontend library.

### Key commands

See `README.md` for the full list. The most common:

- `yarn storybook` — launches the Storybook dev server on port 9009
- `yarn test` — runs Jest unit tests (jsdom, no external services)
- `yarn lint` — runs TypeScript type-checking (`tsc --noEmit`), ESLint, and Stylelint
- `yarn build` — Babel transpile + TypeScript declaration emit (production build)

### Environment prerequisites

- **Node.js ^24.13** — pinned via `engines`, `volta`, and `.node-version`. Use nvm: `nvm install 24.13.0 && nvm use 24.13.0`.
- **Yarn 4.12.0** — the project uses Yarn Berry with `nodeLinker: node-modules`. Enable via `corepack enable && corepack prepare yarn@4.12.0 --activate`.
- **`FONTAWESOME_NPM_AUTH_TOKEN`** — required secret for installing private `@fortawesome/pro-*` packages. Must be present as an environment variable. Yarn reads it from a `.env` file at the project root (configured in `.yarnrc.yml` via `injectEnvironmentFiles`). Create it with: `echo "FONTAWESOME_NPM_AUTH_TOKEN=$FONTAWESOME_NPM_AUTH_TOKEN" > .env`.

### Gotchas

- Jest output goes to a pipe that doesn't always appear in terminal capture tools. Use `--json` flag if you need programmatic access to results (e.g. `npx jest --json`).
- `yarn lint` produces no output on success (exit code 0 = pass).
- The `bin/migrate-stack` script references outdated Node/Yarn versions; do not rely on it for environment setup.
