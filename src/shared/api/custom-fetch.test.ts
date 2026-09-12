import { afterEach, describe, expect, it, vi } from 'vitest';
import { customFetch } from './custom-fetch';

describe('API transport', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('uses one same-origin API prefix and sends cookies', async () => {
    const fetch = vi
      .fn()
      .mockResolvedValue(new Response('{}', { headers: { 'Content-Type': 'application/json' } }));
    vi.stubGlobal('fetch', fetch);
    await customFetch('/api/auth/me');
    expect(fetch).toHaveBeenCalledWith('/api/auth/me', expect.objectContaining({ credentials: 'include' }));
  });
  it('leaves multipart boundaries to the browser', async () => {
    const fetch = vi
      .fn()
      .mockResolvedValue(new Response('{}', { headers: { 'Content-Type': 'application/json' } }));
    vi.stubGlobal('fetch', fetch);
    const body = new FormData();
    body.append('file', new File(['contents'], 'partners.xlsx'));
    await customFetch('/api/imports', { method: 'POST', body });
    expect(fetch).toHaveBeenCalledWith('/api/imports', expect.objectContaining({ body, headers: {} }));
  });
});
