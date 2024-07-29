import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const requiredParams = ["stocksTicker", "multiplier", "timespan", "startDate", "endDate"];

  for (const param of requiredParams) {
    if (searchParams.get(param) === null) {
      return new NextResponse(`Error: ${param} not provided`, { status: 400 });
    }
  }

  const stocksTicker = searchParams.get("stocksTicker");
  const multiplier = searchParams.get("multiplier");
  const timespan = searchParams.get("timespan");
  const startDate = searchParams.get("startDate")
  const endDate = searchParams.get("endDate")

  const url = `https://api.polygon.io/v2/aggs/ticker/${stocksTicker}/range/${multiplier}/${timespan}/${startDate}/${endDate}?adjusted=true&sort=asc&apiKey=${process.env.POLYGON_KEY}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return NextResponse.json({ data });
}
