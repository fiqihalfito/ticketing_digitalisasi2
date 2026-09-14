import { LoginForm } from "@/components/login-form";
import type { Route } from "./+types/_auth.login";
import { authService } from "@/modules/auth/service";

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  let email = formData.get("email") as string;
  let password = formData.get("password") as string;

  console.log(email, password, "clientaction pass");
  await authService.signIn(email, password);
}

export default function LoginRoute({}: Route.ComponentProps) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
