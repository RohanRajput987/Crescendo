import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { useFinance, useTheme } from "@/lib/store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings")({
  component: Page,
  head: () => ({ meta: [{ title: "Settings · Crescendo" }] }),
});

function Page() {
  const { user, signOut } = useFinance();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Account, preferences, and security.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <h3 className="font-semibold mb-4">Profile</h3>
          <div className="flex items-center gap-4 mb-5">
            <Avatar className="size-16 border border-border">
              <AvatarFallback className="bg-gradient-to-br from-primary to-fuchsia-500 text-white text-lg">
                {user?.name
                  ?.split(" ")
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2) ?? "AM"}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{user?.name}</div>
              <div className="text-sm text-muted-foreground">{user?.email}</div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Name</Label>
              <Input defaultValue={user?.name} />
            </div>
            <div>
              <Label className="text-xs">Email</Label>
              <Input defaultValue={user?.email} />
            </div>
          </div>
          <Button
            className="mt-4"
            onClick={() => toast.success("Profile saved")}
          >
            Save changes
          </Button>
        </div>

        <div className="space-y-4">
          <div className="glass rounded-2xl p-5">
            <h3 className="font-semibold mb-4">Preferences</h3>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-medium">Dark mode</div>
                <div className="text-xs text-muted-foreground">
                  Easy on the eyes at night.
                </div>
              </div>
              <Switch checked={theme === "dark"} onCheckedChange={toggle} />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-medium">Email digests</div>
                <div className="text-xs text-muted-foreground">
                  Weekly money summary.
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-medium">AI insights</div>
                <div className="text-xs text-muted-foreground">
                  Smart suggestions on your dashboard.
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <h3 className="font-semibold mb-2">Sign out</h3>
            <p className="text-xs text-muted-foreground mb-3">
              You'll be redirected to the sign-in screen.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                localStorage.removeItem("crescendo_authed");
                signOut();
                navigate({ to: "/auth" });
              }}
            >
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
