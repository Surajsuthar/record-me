import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const ALLOWED_ORIGINES = [
  "http://localhost:3000",
  "http://localhost:5173",
]

const CORS_OPTIONS = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/api/payment",
  "/payment(.*)",
]);

export default clerkMiddleware(async (auth, req) => {

  const origin = req.headers.get("origin") || ''
  const isAllowedOrigin = ALLOWED_ORIGINES.includes(origin)

  if(req.method === "OPTIONS") {
    const preFlightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...CORS_OPTIONS,
    }

    return NextResponse.json({}, { headers: preFlightHeaders })
  }

  
  if (isProtectedRoute(req)) {
    await auth.protect(); // Protect the route if it matches the defined criteria
  }

  const response = NextResponse.next()

  if(isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin)
  }

  Object.entries(CORS_OPTIONS).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
