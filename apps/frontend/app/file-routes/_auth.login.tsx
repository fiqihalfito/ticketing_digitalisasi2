import { LoginForm } from "@/components/login-form";
import type { Route } from "./+types/_auth.login";
import { authService } from "@/modules/auth/service";
import { timingMiddleware } from "@/lib/middleware";
import { sessionOnLoginCheck } from "@/modules/auth/middleware";

export const clientMiddleware = [timingMiddleware, sessionOnLoginCheck];

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  let email = formData.get("email") as string;
  let password = formData.get("password") as string;

  await authService.signIn(email, password);
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  return null;
}

export default function LoginRoute({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
