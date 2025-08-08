import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const geo = (req as any).geo;
  const requestHeaders = new Headers(req.headers); // clone incoming request headers

  if (
    geo?.city &&
    typeof geo.latitude === "number" &&
    typeof geo.longitude === "number"
  ) {
    requestHeaders.set("x-geo-city", geo.city);
    requestHeaders.set("x-geo-lat", String(geo.latitude));
    requestHeaders.set("x-geo-lon", String(geo.longitude));
    requestHeaders.set("x-geo-timezone", geo.timezone ?? "");
  }

  // ⬇️ pass modified **request** headers forward
  return NextResponse.next({ request: { headers: requestHeaders } });
}
