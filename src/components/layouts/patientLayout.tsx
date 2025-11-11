import { Link, Outlet, useLocation } from "react-router";
import Footer from "../global/footer";
import Header from "../global/header";
import { Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

function PatientLayout() {
  const location = useLocation();

  const navItems = [
    {
      id: "appointments",
      label: "Appointments",
      icon: <Calendar size={20} />,
      path: "/patient/appointments",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <User size={20} />,
      path: "/patient/settings",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <div className="flex items-start container mx-auto my-28 px-4 md:px-0 gap-6 min-h-screen">
        <aside className="w-full md:w-60">
          <nav className="flex flex-row md:flex-col gap-2 bg-white rounded-xl border border-gray-200 p-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 bg-white p-6 rounded-xl shadow-sm">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default PatientLayout;
