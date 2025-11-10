import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

type Props = {};

function Header({}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-0">
        <div className="text-2xl font-bold text-gray-900">FB2H</div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-gray-900 transition">
            Home
          </Link>
          <Link
            to="/doctors"
            className="text-gray-700 hover:text-gray-900 transition"
          >
            Doctors
          </Link>
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <Button variant="secondary" asChild>
            <Link to="/auth/register/patient">Register</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/login">Login</Link>
          </Button>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="md:hidden">
            <Menu className="h-6 w-6 text-gray-900" />
          </SheetTrigger>
          <SheetContent side="right" className="w-64 p-6">
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/doctors"
                className="text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Doctors
              </Link>
            </nav>
            <div className="mt-6 flex flex-col gap-3">
              <Button variant="secondary" asChild>
                <Link
                  to="/auth/register/patient"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </Button>
              <Button asChild>
                <Link to="/auth/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Header;
