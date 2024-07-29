export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (query === null) {
    return new Response("Error: query not provided", { status: 400 });
  }

  const url = `https://financialmodelingprep.com/api/v3/search?query=${query.toUpperCase()}&limit=10&apikey=${
    process.env.FINANCIAL_MODELING_PREP_KEY
  }`;

  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    return Response.json(
      { data },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Cache-Control": "public, s-maxage=1800",
          "CDN-Cache-Control": "public, s-maxage=1800",
          "Vercel-CDN-Cache-Control": "public, s-maxage=3600",
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
}
