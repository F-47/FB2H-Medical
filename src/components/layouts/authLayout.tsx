import { Outlet } from "react-router";
import { Card, CardContent } from "../ui/card";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex w-1/2 bg-linear-to-tr from-blue-500 to-indigo-600 items-center justify-center text-white p-12">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to FB2H</h1>
          <p className="text-gray-200">
            Connect with top healthcare professionals and manage your health
            with ease.
          </p>
        </div>
      </div>

      {/* Right side - auth form */}
      <div className="flex flex-1 items-center justify-center p-6 md:p-12">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent>
            <Outlet />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
