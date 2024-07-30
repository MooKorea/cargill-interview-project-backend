import { unstable_cache } from "next/cache";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (query === null) {
    return new Response("Error: query not provided", { status: 400 });
  }

  const getCachedSymbol = unstable_cache(async (query) => {
    const url = `https://financialmodelingprep.com/api/v3/search?query=${query.toUpperCase()}&limit=10&apikey=${
      process.env.FINANCIAL_MODELING_PREP_KEY
    }`;

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.json();
  }, [query]);

  try {
    const res = await getCachedSymbol(query);

    return Response.json(
      { res },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
}
