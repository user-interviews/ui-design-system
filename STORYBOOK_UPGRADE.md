# Storybook Upgrade to v10.0.5

## Overview
This document outlines the upgrade from Storybook v8.6.14 to v10.0.5.

## Changes Made

### Package Updates
All Storybook-related packages have been updated to v10.0.5:
- `@storybook/addon-a11y`: 8.6.14 → 10.0.5
- `@storybook/addon-actions`: 8.6.14 → 10.0.5
- `@storybook/addon-backgrounds`: 8.6.14 → 10.0.5
- `@storybook/addon-controls`: 8.6.14 → 10.0.5
- `@storybook/addon-docs`: 8.6.14 → 10.0.5
- `@storybook/addon-jest`: 8.6.14 → 10.0.5
- `@storybook/addon-links`: 8.6.14 → 10.0.5
- `@storybook/addon-storysource`: 8.6.14 → 10.0.5
- `@storybook/addon-styling-webpack`: 1.0.1 → 2.0.0
- `@storybook/addon-webpack5-compiler-babel`: 3.0.6 (unchanged)
- `@storybook/react`: 8.6.14 → 10.0.5
- `@storybook/react-webpack5`: 8.6.14 → 10.0.5
- `storybook`: 8.6.14 → 10.0.5

### Configuration Changes

#### ESM Migration (Required for Storybook 10)
Storybook 10 is ESM-only. All configuration files must use ESM syntax.

**`.storybook/webpack.config.js`**
- Converted from CommonJS (`require`, `module.exports`) to ESM (`import`, `export default`)
- Added ESM-compatible `__dirname` and `__filename` using `import.meta.url`

**`.storybook/main.js`**
- Removed `require.resolve()` calls (not needed in Storybook 10)
- Direct string references to loaders work fine in Storybook 10

### Breaking Changes to Be Aware Of

1. **ESM-Only**: All configuration files must use ESM syntax
2. **Node.js Requirements**: Node.js 20.19+ or 22.12+ required
3. **Package Manager**: npm 10+, pnpm 9+, or yarn 4+ required
4. **TypeScript**: Must support ES module resolution

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
