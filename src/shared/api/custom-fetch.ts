import { env } from '@/shared/config';

/// Every generated hook calls this. It is the only place in the client that
/// knows the API's address, that cookies are the credential, and how a server
/// error becomes something the interface can show a person.

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

export async function customFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${env.apiUrl}${url}`, {
    ...options,
    // Authentication is httpOnly cookies; there is no token for JavaScript to
    // attach, and none for a script on another origin to steal.
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });

  if (!response.ok) {
    throw new ApiError(response.status, await readErrorCode(response), response.statusText);
  }

  // 204 and an empty body are ordinary answers, not failures to parse.
  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

async function readErrorCode(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as Partial<ApiErrorBody>;

    return typeof body.code === 'string' ? body.code : 'request_failed';
  } catch {
    // A proxy or a gateway can answer with HTML instead of our JSON. That is
    // still a failure the interface has to name, so it gets a code of its own.
    return 'request_failed';
  }
}
