import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  type: string;
  status: "pending" | "approved" | "rejected" | "completed";
  notes: string;
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientName: "John Doe",
    date: "2025-11-15",
    time: "10:00 AM",
    type: "Consultation",
    status: "pending",
    notes: "",
  },
  {
    id: "2",
    patientName: "Jane Smith",
    date: "2025-11-15",
    time: "11:00 AM",
    type: "Follow-up",
    status: "approved",
    notes: "Patient reports improvement",
  },
  {
    id: "3",
    patientName: "Robert Johnson",
    date: "2025-11-14",
    time: "02:00 PM",
    type: "Check-up",
    status: "completed",
    notes: "Routine checkup completed successfully",
  },
  {
    id: "4",
    patientName: "Maria Garcia",
    date: "2025-11-20",
    time: "03:30 PM",
    type: "Test Review",
    status: "pending",
    notes: "",
  },
];

export default function AppointmentsViewer() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(mockAppointments);
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "past">(
    "upcoming"
  );

  const today = new Date("2025-11-15");
  const upcomingAppointments = appointments.filter(
    (apt) => new Date(apt.date) >= today
  );
  const pastAppointments = appointments.filter(
    (apt) => new Date(apt.date) < today
  );

  const displayAppointments =
    selectedTab === "upcoming" ? upcomingAppointments : pastAppointments;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusChange = (
    id: string,
    newStatus: "approved" | "rejected"
  ) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: newStatus } : apt
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Appointments</h1>
        <p className="text-gray-600">Manage and review patient appointments</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2">
        {["upcoming", "past"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab as "upcoming" | "past")}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              selectedTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      {displayAppointments.length > 0 ? (
        <div className="space-y-4">
          {displayAppointments.map((appointment) => (
            <Card
              key={appointment.id}
              className="p-6 bg-white border border-blue-200 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {appointment.patientName}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status.charAt(0).toUpperCase() +
                        appointment.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Date & Time</p>
                      <p className="font-medium text-gray-900">
                        {new Date(appointment.date).toLocaleDateString()} at{" "}
                        {appointment.time}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Type</p>
                      <p className="font-medium text-gray-900">
                        {appointment.type}
                      </p>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Notes</p>
                      <p className="text-gray-900">{appointment.notes}</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {appointment.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() =>
                        handleStatusChange(appointment.id, "approved")
                      }
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() =>
                        handleStatusChange(appointment.id, "rejected")
                      }
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 bg-white border border-blue-200 text-center">
          <p className="text-gray-600">No {selectedTab} appointments found.</p>
        </Card>
      )}
    </div>
  );
}
