import type { Blog } from "./type";
import { createClient } from "@/api/microcms/client.server";
import { ENDPOINT, PAGE_PER_COUNT } from "@/const.server";
import type { LoaderArgs } from "@remix-run/cloudflare";
import type { MicroCMSListResponse } from "microcms-js-sdk";

export type Response = ReturnType<typeof allList>;

export const allList = async (context: LoaderArgs["context"]) => {
  const client = createClient(context);
  const res = await client.get<MicroCMSListResponse<Blog>>({
    endpoint: ENDPOINT.blog,
    queries: {
      orders: "-publishedAt,-revisedAt",
      limit: PAGE_PER_COUNT,
    },
  });
  const count = Math.trunc(res.totalCount / PAGE_PER_COUNT);
  const contents = await [...Array(count || 2)].reduce<Promise<Blog[]>>(
    async (acc, _, i) => {
      const num = i + 1;
      const v = await client.get<MicroCMSListResponse<Blog>>({
        endpoint: ENDPOINT.blog,
        queries: {
          orders: "-publishedAt,-revisedAt",
          offset: num * PAGE_PER_COUNT,
          limit: PAGE_PER_COUNT,
        },
      });

      return acc.then((vs) => vs.concat(v.contents));
    },
    Promise.resolve(res.contents),
  );

  return { ...res, contents };
};
