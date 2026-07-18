import { NextRequest } from "next/server";
import { submitIndexNow } from "@/lib/indexnow";

export async function POST(req: NextRequest) {
  try {
    const token = process.env.INDEXNOW_ADMIN_TOKEN;
    const authorization = req.headers.get("authorization");
    if (!token || authorization !== `Bearer ${token}`) {
      return Response.json({ error: "unauthorized" }, { status: 401 });
    }
    const { urls } = (await req.json()) as { urls?: string[] };
    if (!urls || !Array.isArray(urls) || urls.length === 0 || urls.length > 100) {
      return new Response(JSON.stringify({ error: "urls required" }), {
        status: 400,
      });
    }
    const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://pixcloak.com").origin;
    const safeUrls = urls.filter((value) => {
      try {
        const url = new URL(value);
        return url.origin === origin && (url.protocol === "https:" || url.protocol === "http:");
      } catch {
        return false;
      }
    });
    if (safeUrls.length !== urls.length) {
      return Response.json({ error: "all URLs must belong to the configured site origin" }, { status: 400 });
    }
    const res = await submitIndexNow(safeUrls);
    return new Response(JSON.stringify(res), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
    });
  }
}
