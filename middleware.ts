import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard",
  "/my-resume/:resumeId/edit",
]);

export default clerkMiddleware((auth, request) => {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = new Map(
    cookieHeader.split("; ").map((c) => c.split("=") as [string, string])
  );

  const isOffline = cookies.get("is-offline") === "true";
  console.log("isOffline from cookies:", isOffline);

  if (isProtectedRoute(request)) {
    if (!isOffline) {
      console.log("User is online, applying Clerk auth");
      auth().protect();
    } else {
      console.log("User is offline, skipping auth");
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isProtectedRoute = createRouteMatcher([
//   "/dashboard",
//   "/my-resume/:resumeId/edit",
// ]);

// export default clerkMiddleware((auth, request) => {
//   if (isProtectedRoute(request)) {
//     auth().protect();
//   }
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };
