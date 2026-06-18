import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { FinanceProvider } from "@/lib/store";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const authed = localStorage.getItem("crescendo_authed");
      if (!authed) throw redirect({ to: "/auth" });
    }
  },
});

function AppLayout() {
  return (
    <FinanceProvider>
      <Outlet />
      <Toaster position="top-right" richColors />
    </FinanceProvider>
  );
}
