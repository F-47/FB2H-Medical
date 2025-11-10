import { Outlet, useLocation } from "react-router";
import Logo from "../global/logo";
import { Card, CardContent } from "../ui/card";

export default function AuthLayout() {
  const location = useLocation();
  const isLogin = location.pathname.includes("/login");

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex w-1/2 bg-linear-to-br from-blue-100 via-blue-50 to-indigo-100 dark:from-blue-950 dark:via-slate-950 dark:to-indigo-900 items-center justify-center text-primary p-12 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-300/20 dark:bg-blue-700/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-300/20 dark:bg-indigo-700/20 rounded-full blur-2xl" />

        <div className="relative max-w-md text-center space-y-6">
          <Logo />

          <h1 className="text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            {isLogin ? "Welcome Back" : "Your Health, Simplified"}
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed">
            {isLogin
              ? "Log in to manage your appointments, track your health, and stay connected with trusted doctors — all in one place."
              : "Join thousands of patients who trust FB2H to connect with top healthcare professionals, book appointments, and take control of their well-being."}
          </p>

          {!isLogin && (
            <p className="text-sm text-muted-foreground italic">
              Empowering better health through smarter connections.
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-6 md:p-12">
        <Card className="w-full max-w-xl shadow-lg">
          <CardContent>
            <Outlet />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
