import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publicRoutes = createRouteMatcher([
  "/",
  "/sign-in",
  "/sign-up",
  "/api/webhook/clerk",
  "/terms",
  "/privacy",
]);

export default clerkMiddleware((auth, req, evt) => {
  if (publicRoutes(req)) {
    return;
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
