import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      future: {
        unstable_optimizeDeps: true,
        v3_fetcherPersist: true,
        v3_lazyRouteDiscovery: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
      },
      routes: async (defineRoutes) =>
        defineRoutes((route) => {
          route("/", "routes/welcome/page.tsx");

          route("app", "routes/dashboard/layout.tsx", () => {
            route("/app", "routes/dashboard/index.tsx");

            /* Posts */
            route("/app/posts", "routes/dashboard/posts/page.tsx");
            route(
              "/app/posts/:slug",
              "routes/dashboard/posts/pages/details.tsx",
              () => {
                route(
                  "/app/posts/:slug/comments",
                  "routes/dashboard/posts/pages/comments.tsx"
                );
              }
            );
            route(
              "/app/posts/add-post",
              "routes/dashboard/posts/pages/add-post.tsx"
            );

            /* Users */
            route("/app/users", "routes/dashboard/users/page.tsx");
            route("/app/users/:slug", "routes/dashboard/users/pages/user.tsx");
            route(
              "/app/users/add-user",
              "routes/dashboard/users/pages/add-user.tsx"
            );
          });
        }),
    }),
    tsconfigPaths(),
  ],
});
