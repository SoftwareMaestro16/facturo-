import { defineConfig } from 'orval';
import { existsSync } from 'node:fs';

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
    // Use the live sibling checkout locally and the versioned snapshot in a
    // clean checkout that does not have facturo-server beside it. The sibling
    // is named facturo-server, not backend — a session that guesses wrong
    // here silently falls back to a stale snapshot instead of failing loudly.
    input: {
      target:
        process.env.FACTURO_OPENAPI_PATH ??
        (existsSync('../facturo-server/openapi.json') ? '../facturo-server/openapi.json' : './api-contract.json'),
    },
    output: {
      mode: 'tags-split',
      target: './src/shared/api/generated/facturo.ts',
      schemas: './src/shared/api/generated/model',
      // GETs become useQuery, POST/PATCH/DELETE become useMutation. That is
      // the default and it is right for this API: a login is not a query.
      client: 'react-query',
      httpClient: 'fetch',
      clean: true,
      override: {
        mutator: { path: './src/shared/api/custom-fetch.ts', name: 'customFetch' },
      },
    },
    hooks: {
      // The generated files still have to pass the repository's formatting.
      afterAllFilesWrite: 'prettier --write',
    },
  },
});
