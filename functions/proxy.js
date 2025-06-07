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
 const blockedAgents = [
        "mahotv.finale"
        ];

    
    const allowedCountries = ["ID", "TL"];
    const allowedAgents = [
      "ott navigator", "tivimate", "tivimate premium", "tvirl",
      "pvrlive", "ott tv", "ott player", "tizen",
      "smart-tv", "m3u-ip.tv", "xciptv", "televizo"
    ];
    const blockedISPKeywords = [
      "cloud", "google", "aws", "amazon", "digitalocean",
      "linode", "ovh", "anym", "vultr", "host", "oracle", "choopa", "microsoft", "azure"
    ];

    const isBlockedUA = blockedAgents.some(keyword => ua.toLowerCase().includes(keyword));
    const isAllowed = allowedAgents.some(agent => ua.toLowerCase().includes(agent));
    const isBlockedISP = blockedISPKeywords.some(keyword => org.toLowerCase().includes(keyword));

    if (!allowedCountries.includes(country) || !isAllowed || isBlockedISP || isBlockedUA || request.method !== "GET") {
      return Response.redirect("https://auth.semar.my.id/", 302);
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
