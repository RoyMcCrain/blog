import { allList } from "@/api/microcms/blog/allList.server";
import type { Response } from "@/api/microcms/blog/allList.server";
import type {
  V2_MetaFunction,
  HeadersFunction,
  LoaderFunction,
  LoaderArgs,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Button } from "@/components/button";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "blog" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const headers: HeadersFunction = () => ({
  "Cache-Control": "max-age=0, s-maxage=60, stale-while-revalidate=60",
});

export const loader: LoaderFunction = async ({ context }: LoaderArgs) =>
  await allList(context);

export default function Index() {
  const res = useLoaderData<Response>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Button>押してね</Button>
      {JSON.stringify(res, null, 2)}
    </div>
  );
}
