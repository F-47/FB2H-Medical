import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Logo from "./logo";
import { getAuth, logout } from "@/services/auth";

type Props = {};

function Header({}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const auth = getAuth();

  return (
    <header className="border-b border-gray-200 bg-white fixed w-full z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-0">
        <Logo />
        <nav className="hidden md:flex items-center gap-6 ml-auto">
          <Link
            to="/#features"
            className="text-gray-700 hover:text-gray-900 transition"
          >
            Features
          </Link>
          <Link
            to="/#how-it-works"
            className="text-gray-700 hover:text-gray-900 transition"
          >
            How It Works
          </Link>
          <Link
            to="/doctors"
            className="text-gray-700 hover:text-gray-900 transition"
          >
            Browse Doctors
          </Link>

          {auth ? (
            <Button
              variant="secondary"
              onClick={() => logout()}
              className="ml-4"
            >
              Logout
            </Button>
          ) : (
            <Button asChild className="ml-4">
              <Link to="/auth/login">Login</Link>
            </Button>
          )}
        </nav>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="md:hidden">
            <Menu className="h-6 w-6 text-gray-900" />
          </SheetTrigger>
          <SheetContent side="right" className="w-64 p-6">
            <nav className="flex flex-col gap-4">
              <Link
                to="/#features"
                className="text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link
                to="/#how-it-works"
                className="text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </Link>
              <Link
                to="/doctors"
                className="text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Browse Doctors
              </Link>
            </nav>
            <div className="mt-6 flex flex-col gap-3">
              {auth ? (
                <Button variant="secondary" onClick={logout}>
                  Logout
                </Button>
              ) : (
                <Button asChild>
                  <Link to="/auth/login" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Header;
