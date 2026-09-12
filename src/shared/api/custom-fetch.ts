import { env } from '@/shared/config';

/// Every generated hook calls this. It is the only place in the client that
/// knows the API's address, that cookies are the credential, and how a server
/// error becomes something the interface can show a person.
///
/// The return shape mirrors what orval's generated types expect: `{ data,
/// status, headers }`, so a hook can inspect the status without a second call.

/// What the server returns on any failure: a stable `code` the interface maps
/// to a translated sentence, plus a message meant for logs, never for a screen.
export interface ApiErrorBody {
  statusCode: number;
  code: string;
  message: string;
}

export class ApiError extends Error {
  constructor(
    readonly status: number,
    /// Map this to a translated sentence. Never render it.
    readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface FetchResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

export async function customFetch<T extends { data: unknown; status: number }>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const path = `/api/${url.replace(/^\/?api\//, '').replace(/^\//, '')}`;
  const target = typeof window === 'undefined' ? `${env.apiUrl.replace(/\/api\/?$/, '')}${path}` : path;
  const response = await fetch(target, {
    ...options,
    // Authentication is httpOnly cookies; there is no token for JavaScript to
    // attach, and none for a script on another origin to steal.
    credentials: 'include',
    headers: {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
  });

  const body = await readBody(response);

  if (!response.ok) {
    throw new ApiError(response.status, readCode(body), response.statusText);
  }

  // The cast is honest: orval's generated types describe T as this exact
  // envelope with the response's own body typed as `data`.
  return { data: body, status: response.status, headers: response.headers } as unknown as T;
}

async function readBody(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return undefined;
  }

  const contentType = response.headers.get('content-type') ?? '';

  if (!contentType.includes('application/json')) {
    return undefined;
  }

  try {
    return await response.json();
  } catch {
    return undefined;
  }
}

function readCode(body: unknown): string {
  // A proxy or a gateway can answer with HTML instead of our JSON. That is
  // still a failure the interface has to name, so it gets a code of its own.
  if (typeof body !== 'object' || body === null) {
    return 'request_failed';
  }

  const candidate = (body as Partial<ApiErrorBody>).code;

  return typeof candidate === 'string' ? candidate : 'request_failed';
}
