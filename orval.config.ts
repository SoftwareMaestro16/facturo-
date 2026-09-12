import { defineConfig } from 'orval';

/// Generates the whole client data layer from the server's OpenAPI document.
///
/// Run `npm run openapi:export` in facturo-server, then `npm run api:generate`
/// here. The output is git-ignored and regenerated, so nobody edits it and
/// nobody hand-copies a response type that later drifts from the server.
///
/// Every generated hook goes through `customFetch` in shared/api, which is the
/// single place that attaches cookies and turns a server error into something
/// the interface can show a person.
export default defineConfig({
  facturo: {
    input: { target: '../facturo-server/openapi.json' },
    output: {
      mode: 'tags-split',
      target: './src/shared/api/generated/facturo.ts',
      schemas: './src/shared/api/generated/model',
      client: 'react-query',
      httpClient: 'fetch',
      clean: true,
      override: {
        mutator: { path: './src/shared/api/custom-fetch.ts', name: 'customFetch' },
        query: { useQuery: true, useSuspenseQuery: false, signal: true },
      },
    },
    hooks: {
      // The generated files still have to pass the repository's formatting.
      afterAllFilesWrite: 'prettier --write',
    },
  },
});
