export async function onRequest(context) {
  const url = new URL(context.request.url);
  const token = url.searchParams.get("auth");

  if (token !== "rahasia123") {
    return new Response("Forbidden", { status: 403 });
  }

  return context.next();
}
