import type { ConfigFile } from '@rtk-query/codegen-openapi';

/// Generates the whole client data layer from the server's OpenAPI document.
///
/// Run `npm run openapi:export` in facturo-server, then `npm run api:generate`
/// here. The output is committed-ignored and regenerated, so nobody edits it
/// and nobody hand-copies a response type that later drifts from the server.
const config: ConfigFile = {
  schemaFile: '../facturo-server/openapi.json',
  apiFile: './src/shared/api/base-api.ts',
  apiImport: 'baseApi',
  outputFile: './src/shared/api/generated/api.ts',
  exportName: 'generatedApi',
  hooks: { queries: true, lazyQueries: true, mutations: true },
  tag: true,
};

export default config;
