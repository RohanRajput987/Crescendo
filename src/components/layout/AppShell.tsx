import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { MobileNav } from "./MobileNav";

export function AppShell({
  children,
  onAdd,
}: {
  children: ReactNode;
  onAdd?: () => void;
}) {
  return (
    <div className="min-h-screen app-bg">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <Topbar onAdd={onAdd} />
          <main className="px-4 lg:px-8 py-6 pb-28 lg:pb-12">{children}</main>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
