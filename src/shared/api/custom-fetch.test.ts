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

  it('shares one refresh between concurrent expired requests and retries both', async () => {
    let refreshed = false;
    const fetch = vi.fn((url: string) => {
      if (url === '/api/auth/refresh') {
        return new Promise<Response>((resolve) => {
          setTimeout(() => {
            refreshed = true;
            resolve(new Response('{}'));
          }, 0);
        });
      }
      return Promise.resolve(new Response('{}', { status: refreshed ? 200 : 401 }));
    });
    vi.stubGlobal('fetch', fetch);
    await Promise.all([customFetch('/api/auth/me'), customFetch('/api/companies')]);
    expect(fetch.mock.calls.filter(([url]) => url === '/api/auth/refresh')).toHaveLength(1);
    expect(fetch).toHaveBeenCalledTimes(5);
  });

  it('stops after a failed refresh and never refreshes rejected logins', async () => {
    const fetch = vi.fn().mockImplementation(() => Promise.resolve(new Response('{}', { status: 401 })));
    vi.stubGlobal('fetch', fetch);
    await expect(customFetch('/api/auth/me')).rejects.toMatchObject({ status: 401 });
    expect(fetch).toHaveBeenCalledTimes(2);
    fetch.mockClear();
    await expect(customFetch('/api/auth/login', { method: 'POST' })).rejects.toMatchObject({ status: 401 });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
