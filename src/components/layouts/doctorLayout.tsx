import { getCurrentUser, logout } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Notebook, Pencil, User, LogOut } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect } from "react";

function DoctorLayout() {
  const location = useLocation();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getCurrentUser,
  });
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!isLoading && (!user || isError)) {
      navigate("/");
    }
  }, [user, isLoading, isError, navigate]);

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100">
      <div className="flex h-screen overflow-hidden">
        <aside className="w-64 bg-primary text-white shadow-lg flex flex-col justify-between">
          <div>
            <div className="p-6 border-b border-blue-800">
              {isLoading ? (
                <div className="animate-pulse flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-300" />
                  <div className="h-3 w-20 bg-blue-300 rounded" />
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={user?.image || ""}
                      alt={user?.first_name}
                    />
                    <AvatarFallback className="text-black">
                      {`${user?.first_name?.[0] || ""}${
                        user?.last_name?.[0] || ""
                      }`.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="font-bold text-lg">Dr. {user?.first_name}</h1>
                </div>
              )}
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
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-6 w-48 bg-blue-200 rounded" />
                <div className="h-6 w-32 bg-blue-200 rounded" />
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default DoctorLayout;
