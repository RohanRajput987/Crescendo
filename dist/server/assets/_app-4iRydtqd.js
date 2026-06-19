import { jsx, jsxs } from "react/jsx-runtime";
import { Outlet } from "@tanstack/react-router";
import { F as FinanceProvider } from "./store-DEvh2MYP.js";
import { Toaster as Toaster$1 } from "sonner";
import "react";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function AppLayout() {
  return /* @__PURE__ */ jsxs(FinanceProvider, { children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Toaster, { position: "top-right", richColors: true })
  ] });
}
export {
  AppLayout as component
};
