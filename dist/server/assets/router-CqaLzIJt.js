import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, redirect, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
const appCss = "/assets/styles-DTKEeFM9.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$8 = createRootRouteWithContext()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "Crescendo App" },
        { name: "description", content: "Crescendo Personal Finance" },
        { name: "author", content: "Crescendo" },
        { property: "og:title", content: "Crescendo App" },
        { property: "og:description", content: "Crescendo Personal Finance" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:site", content: "@Crescendo" }
      ],
      links: [
        {
          rel: "stylesheet",
          href: appCss
        }
      ]
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent
  }
);
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$8.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(Outlet, {}) });
}
const $$splitComponentImporter$7 = () => import("./auth-y2pGAMrb.js");
const Route$7 = createFileRoute("/auth")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component"),
  head: () => ({
    meta: [{
      title: "Sign in · Crescendo"
    }]
  })
});
const $$splitComponentImporter$6 = () => import("./_app-4iRydtqd.js");
const Route$6 = createFileRoute("/_app")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component"),
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const authed = localStorage.getItem("crescendo_authed");
      if (!authed) throw redirect({
        to: "/auth"
      });
    }
  }
});
const $$splitComponentImporter$5 = () => import("./index-C8UQrbGg.js");
const Route$5 = createFileRoute("/_app/")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component"),
  head: () => ({
    meta: [{
      title: "Dashboard · Crescendo"
    }]
  })
});
const $$splitComponentImporter$4 = () => import("./transactions-3cgP5NCh.js");
const Route$4 = createFileRoute("/_app/transactions")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component"),
  head: () => ({
    meta: [{
      title: "Transactions · Crescendo"
    }]
  })
});
const $$splitComponentImporter$3 = () => import("./settings-DM9487V-.js");
const Route$3 = createFileRoute("/_app/settings")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component"),
  head: () => ({
    meta: [{
      title: "Settings · Crescendo"
    }]
  })
});
const $$splitComponentImporter$2 = () => import("./goals-DFcCRZKq.js");
const Route$2 = createFileRoute("/_app/goals")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  head: () => ({
    meta: [{
      title: "Goals · Crescendo"
    }]
  })
});
const $$splitComponentImporter$1 = () => import("./budgets-DthGEqSB.js");
const Route$1 = createFileRoute("/_app/budgets")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  head: () => ({
    meta: [{
      title: "Budgets · Crescendo"
    }]
  })
});
const $$splitComponentImporter = () => import("./analytics-DYxOiA5W.js");
const Route = createFileRoute("/_app/analytics")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  head: () => ({
    meta: [{
      title: "Analytics · Crescendo"
    }]
  })
});
const AuthRoute = Route$7.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$8
});
const AppRoute = Route$6.update({
  id: "/_app",
  getParentRoute: () => Route$8
});
const AppIndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => AppRoute
});
const AppTransactionsRoute = Route$4.update({
  id: "/transactions",
  path: "/transactions",
  getParentRoute: () => AppRoute
});
const AppSettingsRoute = Route$3.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AppRoute
});
const AppGoalsRoute = Route$2.update({
  id: "/goals",
  path: "/goals",
  getParentRoute: () => AppRoute
});
const AppBudgetsRoute = Route$1.update({
  id: "/budgets",
  path: "/budgets",
  getParentRoute: () => AppRoute
});
const AppAnalyticsRoute = Route.update({
  id: "/analytics",
  path: "/analytics",
  getParentRoute: () => AppRoute
});
const AppRouteChildren = {
  AppAnalyticsRoute,
  AppBudgetsRoute,
  AppGoalsRoute,
  AppSettingsRoute,
  AppTransactionsRoute,
  AppIndexRoute
};
const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
const rootRouteChildren = {
  AppRoute: AppRouteWithChildren,
  AuthRoute
};
const routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
