export { default } from "next-auth/middleware";

// Routes we want to apply the middleware to
export const config = { matcher: ["/", "/posts/:path*", "/api/posts/:path*"] };
