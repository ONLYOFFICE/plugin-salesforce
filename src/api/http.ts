export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface HttpRequestOptions<TBody = unknown> {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: TBody;
  timeout?: number;
  signal?: AbortSignal;
}

export interface HttpError {
  message: string;
  status?: number;
  statusText?: string;
  code?: string;
  aborted?: boolean;
  timedOut?: boolean;
}

export interface HttpResponse<T> {
  data?: T;
  error?: HttpError;
}

function createCombinedSignal(
  timeout?: number,
  externalSignal?: AbortSignal,
): { signal: AbortSignal; cleanup: () => void } {
  const controller = new AbortController();
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  if (timeout && timeout > 0) timeoutId = setTimeout(() => controller.abort(new DOMException('Request timed out', 'TimeoutError')), timeout);

  const onExternalAbort = () => controller.abort(externalSignal?.reason);
  externalSignal?.addEventListener('abort', onExternalAbort);

  const cleanup = () => {
    if (timeoutId) clearTimeout(timeoutId);
    externalSignal?.removeEventListener('abort', onExternalAbort);
  };

  return { signal: controller.signal, cleanup };
}

export async function httpRequest<T, TBody = unknown>(
  url: string,
  options: HttpRequestOptions<TBody> = {},
): Promise<HttpResponse<T>> {
  const {
    method = 'GET', headers = {}, body, timeout, signal: externalSignal,
  } = options;

  const { signal, cleanup } = createCombinedSignal(timeout, externalSignal);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = Array.isArray(errorData) && errorData[0]?.message
        ? errorData[0].message
        : errorData.message || `Request failed with status ${response.status}`;
      const errorCode = Array.isArray(errorData) && errorData[0]?.errorCode
        ? errorData[0].errorCode
        : errorData.errorCode;

      return {
        error: {
          message: errorMessage,
          status: response.status,
          statusText: response.statusText,
          code: errorCode,
        },
      };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      const timedOut = error.message === 'Request timed out';
      return {
        error: {
          message: timedOut ? 'Request timed out' : 'Request was cancelled',
          aborted: true,
          timedOut,
        },
      };
    }

    return {
      error: {
        message: error instanceof Error ? error.message : 'Network error occurred',
      },
    };
  } finally {
    cleanup();
  }
}
