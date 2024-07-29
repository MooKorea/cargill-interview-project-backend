export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (query === null) {
    return new Response("Error: query not provided", { status: 400 });
  }

  const url = `https://financialmodelingprep.com/api/v3/search?query=${query.toUpperCase()}&limit=10&apikey=${
    process.env.FINANCIAL_MODELING_PREP_KEY
  }`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return Response.json({ data });
}
