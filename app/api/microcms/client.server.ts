import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export const createClient = (context: LoaderFunctionArgs["context"]) => {
  const serviceDomain = context.MICROCMS_SERVICE_DOMAIN as string;
  const apiKey = context.MICROCMS_API_KEY as string;

  return {
    get: async <T>(
      endpoint: string,
      params?: Record<string, any>,
    ): Promise<T> => {
      const url = new URL(
        `https://${serviceDomain}.microcms.io/api/v1/${endpoint}`,
      );
      if (params) {
        Object.keys(params).forEach((key) =>
          url.searchParams.append(key, params[key]),
        );
      }

      const response = await fetch(url.toString(), {
        headers: {
          "X-API-KEY": apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
      }

      return response.json() as Promise<T>;
    },
  };
};
