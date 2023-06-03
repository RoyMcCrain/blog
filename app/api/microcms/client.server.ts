import type { LoaderArgs } from "@remix-run/cloudflare";
import { createClient as c } from "microcms-js-sdk";

export const createClient = (context: LoaderArgs["context"]) =>
  c({
    serviceDomain: context.MICROCMS_SERVICE_DOMAIN as string,
    apiKey: context.MICROCMS_API_KEY as string,
  });
