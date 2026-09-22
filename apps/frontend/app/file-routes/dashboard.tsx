import { sessionCheck } from "@/modules/auth/middleware";
import type { Route } from "./+types/dashboard";
import { timingMiddleware } from "@/lib/middleware";
import { userContext } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Link, useFetcher } from "react-router";
import { authClient } from "@/modules/auth/lib/auth-client";

export const clientMiddleware = [timingMiddleware, sessionCheck];

export async function clientLoader({ context }: Route.ClientLoaderArgs) {
  const user = context.get(userContext);
  return { user };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  await authClient.signOut({ callbackURL: "/login" });
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function DashboardRoute({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  let fetcher = useFetcher();
  return (
    <div>
      <div>Hello Dashboard</div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <fetcher.Form method="post">
        <Button type="submit">Logout</Button>
      </fetcher.Form>
    </div>
  );
}
