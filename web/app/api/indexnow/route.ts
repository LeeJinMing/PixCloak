import { NextRequest } from "next/server";
import { submitIndexNow, pingSitemaps } from "@/lib/indexnow";

export async function POST(req: NextRequest) {
  try {
    const { urls } = (await req.json()) as { urls?: string[] };
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return new Response(JSON.stringify({ error: "urls required" }), {
        status: 400,
      });
    }
    const res = await submitIndexNow(urls);
    await pingSitemaps();
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
