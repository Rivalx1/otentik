export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const id = url.searchParams.get("id");
  // const token = url.searchParams.get("auth");

  const CHANNELS = {
    "channel1": "https://asli.server.com/stream1.m3u8",
    "channel2": "https://example.tv/live2/index.m3u8",
  };

  // if (token !== "rahasia123") {
  //   return new Response("Unauthorized", { status: 403 });
  // }

  if (!id || !CHANNELS[id]) {
    return new Response("Channel not found", { status: 404 });
  }

  const targetUrl = CHANNELS[id];

  const upstream = await fetch(targetUrl, {
    headers: {
      "User-Agent": context.request.headers.get("user-agent") || "",
      "Referer": targetUrl,
      "Origin": new URL(targetUrl).origin,
    },
  });

  const headers = new Headers(upstream.headers);
  headers.set("Access-Control-Allow-Origin", "*");

  return new Response(upstream.body, {
    status: upstream.status,
    headers,
  });
}
