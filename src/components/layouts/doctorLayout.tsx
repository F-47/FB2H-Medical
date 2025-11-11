import { logout } from "@/services/auth";
import { Calendar, Notebook, Pencil, User, LogOut } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";

function DoctorLayout() {
  const location = useLocation();

  const navItems = [
    {
      id: "profile",
      label: "Profile",
      icon: <User size={20} />,
      path: "/doctor/profile",
    },
    {
      id: "availability",
      label: "Availability",
      icon: <Calendar size={20} />,
      path: "/doctor/availability",
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: <Notebook size={20} />,
      path: "/doctor/appointments",
    },
    {
      id: "edit",
      label: "Settings",
      icon: <Pencil size={20} />,
      path: "/doctor/settings",
    },
  ];

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100">
      <div className="flex h-screen overflow-hidden">
        <aside className="w-64 bg-primary text-white shadow-lg flex flex-col justify-between">
          <div>
            <div className="p-6 border-b border-blue-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center font-bold text-xl">
                  DR
                </div>
                <div>
                  <h1 className="font-bold text-lg">Dr. Profile</h1>
                  <p className="text-sm text-blue-200">Healthcare Portal</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`w-full flex items-center gap-x-3 text-left px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "text-blue-100 hover:bg-blue-800"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-4 border-t border-blue-800 space-y-2">
            <button
              onClick={logout}
              className="w-full flex items-center gap-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-blue-800 transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </aside>
        <section className="flex-1 overflow-auto">
          <div className="p-8">
            <Outlet />
          </div>
        </section>
      </div>
    </main>
  );
}

export default DoctorLayout;
