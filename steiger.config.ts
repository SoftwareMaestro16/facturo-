import fsd from '@feature-sliced/steiger-plugin';
import { defineConfig } from 'steiger';

/// Structural checks the import linter cannot see: slices nobody imports,
/// segments with no public API, a layer used for one thing only. Runs in CI
/// next to eslint.
export default defineConfig([
  ...fsd.configs.recommended,
  {
    rules: {
      // A "consider merging these" heuristic that counts how many places use a
      // slice. On a skeleton every slice looks insignificant because its
      // consumers are not written yet, and the advice would be to delete the
      // architecture. The layering itself is enforced by eslint, which does not
      // guess.
      'fsd/insignificant-slice': 'off',
    },
  },
  {
    files: ['./src/app/**'],
    rules: {
      // Next.js owns src/app. Its route files are not FSD slices and have no
      // public API to declare.
      'fsd/public-api': 'off',
      'fsd/no-segmentless-slices': 'off',
    },
  },
]);
