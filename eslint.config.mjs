// @ts-check
import eslint from '@eslint/js';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

/// Feature-Sliced Design, top to bottom. A layer may import from layers below
/// it and from nothing else — not from above, and not sideways into a sibling.
/// This is the single rule whose violation turns an FSD project into mush, so
/// it is enforced by the linter rather than remembered at review time.
///
/// Enforced with no-restricted-imports on the literal specifier rather than
/// with a resolver-based plugin: every cross-layer import in this project goes
/// through the @/ alias, so the specifier is all the information needed, and
/// there is no module resolver to break on the next major of anything.
const LAYERS = ['app', 'views', 'widgets', 'features', 'entities', 'shared'];

/// Slices of these layers expose a public API through index.ts and nothing
/// deeper. shared/ is exempt: its segments (ui, lib, config, i18n) are the unit
/// of import there.
const SLICED_LAYERS = ['views', 'widgets', 'features', 'entities'];

function restrictedImportsFor(layer) {
  const index = LAYERS.indexOf(layer);
  // shared/ is the exception to the sibling rule: its segments are primitives
  // that legitimately build on each other, e.g. ui/ formats through lib/.
  const sameOrAbove = layer === 'shared' ? LAYERS.slice(0, index) : LAYERS.slice(0, index + 1);
  const below = LAYERS.slice(index + 1);

  return [
    ...sameOrAbove.map((target) => ({
      group: [`@/${target}/*`, `@/${target}/*/**`],
      message: `${layer}/ may not import ${target}/. FSD allows imports downward only.`,
    })),
    ...below
      .filter((target) => SLICED_LAYERS.includes(target))
      .map((target) => ({
        group: [`@/${target}/*/**`],
        message: `Import ${target}/<slice> from its root, never into its internals.`,
      })),
  ];
}

export default tseslint.config(
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'coverage/**',
      'next-env.d.ts',
      // Written by `npm run api:generate`, never read in review.
      'src/shared/api/generated/**',
    ],
  },

  eslint.configs.recommended,
  ...nextCoreWebVitals,
  prettier,

  // ── Typed rules, TypeScript sources only ──────────────────────────────────
  // The type-aware rules need a program, and config files live outside
  // tsconfig's include. Applying them everywhere fails on this very file.
  {
    files: ['**/*.{ts,tsx}'],
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      // next's shared config installs its own parser; the typed rules need
      // @typescript-eslint's, so it is restated here for TS files.
      parser: tseslint.parser,
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: {
      // CLAUDE.md: `any` is forbidden without exception.
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-expect-error': 'allow-with-description', 'ts-ignore': true, minimumDescriptionLength: 10 },
      ],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-floating-promises': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],

      // CLAUDE.md size guardrail — a signal to split, not a hard stop.
      'max-lines': ['warn', { max: 300, skipBlankLines: true, skipComments: true }],
    },
  },

  // ── One block per layer, each allowing only what sits below it ───────────
  ...LAYERS.map((layer) => ({
    files: [`src/${layer}/**/*.{ts,tsx}`],
    rules: {
      'no-restricted-imports': ['error', { patterns: restrictedImportsFor(layer) }],
    },
  })),

  {
    files: ['**/*.{test,spec}.{ts,tsx}'],
    rules: { 'max-lines': 'off', 'no-restricted-imports': 'off' },
  },

  {
    // Legal texts are content, not code. Splitting a privacy policy across
    // files to satisfy a line count would make it harder for a lawyer to read,
    // which is the only thing that matters about these files.
    files: ['src/views/legal/model/*.{ro,ru}.ts'],
    rules: { 'max-lines': 'off' },
  },

  // Config and setup files are plain JavaScript or live outside the program.
  {
    files: ['**/*.{js,mjs,cjs}', 'vitest.setup.ts', '*.config.ts'],
    extends: [tseslint.configs.disableTypeChecked],
  },
);
