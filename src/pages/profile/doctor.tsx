import { useState } from "react";
import AvailabilityScheduler from "@/components/doctors/profile/availability-scheduler";
import AppointmentsViewer from "@/components/doctors/profile/appointments-viewer";
import ProfileEditor from "@/components/doctors/profile/profile-editor";
import Profile from "@/components/doctors/profile/profile";

type TabType = "profile" | "availability" | "appointments" | "edit";
type Props = {};

function DoctorProfile({}: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100">
      <div className="flex h-screen overflow-hidden">
        <aside className="w-64 bg-primary text-white shadow-lg flex flex-col">
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
            {[
              { id: "profile" as const, label: "Profile", icon: "👤" },
              {
                id: "availability" as const,
                label: "Availability",
                icon: "📅",
              },
              {
                id: "appointments" as const,
                label: "Appointments",
                icon: "📋",
              },
              { id: "edit" as const, label: "Edit Profile", icon: "✏️" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-500 text-white"
                    : "text-blue-100 hover:bg-blue-800"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-blue-800 text-sm text-blue-200">
            <p>© 2025 FB2H</p>
          </div>
        </aside>

        <section className="flex-1 overflow-auto">
          <div className="p-8">
            {activeTab === "profile" && <Profile />}
            {activeTab === "availability" && <AvailabilityScheduler />}
            {activeTab === "appointments" && <AppointmentsViewer />}
            {activeTab === "edit" && <ProfileEditor />}
          </div>
        </section>
      </div>
    </main>
  );
}

export default DoctorProfile;
