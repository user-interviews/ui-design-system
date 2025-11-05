# Storybook Upgrade to v10.0.5

## Overview
This document outlines the upgrade from Storybook v8.6.14 to v10.0.5.

## Changes Made

### Package Updates
Updated Storybook packages to v10.0.5 where available:
- `@storybook/addon-a11y`: 8.6.14 → 10.0.5
- `@storybook/addon-docs`: 8.6.14 → 10.0.5
- `@storybook/addon-links`: 8.6.14 → 10.0.5
- `@storybook/addon-styling-webpack`: 1.0.1 → 2.0.0
- `@storybook/addon-webpack5-compiler-babel`: 3.0.6 (unchanged)
- `@storybook/react`: 8.6.14 → 10.0.5
- `@storybook/react-webpack5`: 8.6.14 → 10.0.5
- `storybook`: 8.6.14 → 10.0.5

### Removed Packages (Now Built-in to Storybook Core)
Starting with Storybook 9, several essential addons were integrated into core Storybook and are no longer separate packages:
- `@storybook/addon-actions` - Now built-in, removed from dependencies
- `@storybook/addon-backgrounds` - Now built-in, removed from dependencies
- `@storybook/addon-controls` - Now built-in, removed from dependencies
- `@storybook/addon-jest` - Deprecated, removed from dependencies
- `@storybook/addon-storysource` - Deprecated, removed from dependencies

These features are now available automatically without needing to install or configure separate addons.

### Configuration Changes

#### ESM Migration (Required for Storybook 10)
Storybook 10 is ESM-only. All configuration files must use ESM syntax.

**`.storybook/webpack.config.js`**
- Converted from CommonJS (`require`, `module.exports`) to ESM (`import`, `export default`)
- Added ESM-compatible `__dirname` and `__filename` using `import.meta.url`

**`.storybook/main.js`**
- Removed `require.resolve()` calls (not needed in Storybook 10)
- Removed built-in addons from config: `addon-actions`, `addon-backgrounds`, `addon-controls`, `addon-storysource`
- These addons are now part of Storybook core and work automatically
- Direct string references to loaders work fine in Storybook 10
- Added `staticDirs` configuration to serve the `public` directory

**`package.json` scripts**
- Updated `storybook` dev command: Changed from `storybook dev -p 9009 public` to `storybook dev --port 9009`
- Updated `build-storybook`: Changed from `storybook build public` to `storybook build --output-dir public`
- Updated `build-storybook-docs`: Changed from `storybook build public --docs` to `storybook build --output-dir public --docs`
- Storybook 10 no longer accepts positional arguments; all options must use flags

### Breaking Changes to Be Aware Of

1. **ESM-Only**: All configuration files must use ESM syntax
2. **Node.js Requirements**: Node.js 20.19+ or 22.12+ required
3. **Package Manager**: npm 10+, pnpm 9+, or yarn 4+ required
4. **TypeScript**: Must support ES module resolution
5. **CLI Changes**: Storybook 10 no longer accepts positional arguments
   - The static/output directory must be configured via `staticDirs` in `main.js` or via `--output-dir` flag for build command
   - All CLI options must use proper flags (e.g., `--port` instead of `-p`)

### No Breaking Changes for Stories
Story files and component code should continue to work without changes.

### Testing Required
After running `yarn install`, test:
1. `yarn storybook` - Development server should start
2. `yarn build-storybook` - Production build should succeed
3. Visual regression tests if applicable

## References
- [Storybook 10 Migration Guide](https://storybook.js.org/docs/releases/migration-guide)
- [Storybook 8 to 9 Migration](https://storybook.js.org/docs/releases/migration-guide-from-older-version)

## Additional Notes
- The project already had most config files in ESM format, making the upgrade straightforward
- No changes needed to story files or component documentation
