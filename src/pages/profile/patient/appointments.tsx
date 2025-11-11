"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import RescheduleModal from "../../../components/patient/reschedule-modal";
import { Calendar, Calendar1, Clock, Pin, Trash } from "lucide-react";

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  status: "upcoming" | "completed" | "cancelled";
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    doctor: "Dr. Emily Chen",
    specialty: "Cardiology",
    date: "2024-11-25",
    time: "10:00 AM",
    location: "Building A, Room 302",
    status: "upcoming",
  },
  {
    id: "2",
    doctor: "Dr. Michael Rodriguez",
    specialty: "General Checkup",
    date: "2024-12-05",
    time: "2:30 PM",
    location: "Building B, Room 105",
    status: "upcoming",
  },
  {
    id: "3",
    doctor: "Dr. Amanda Smith",
    specialty: "Dermatology",
    date: "2024-10-15",
    time: "3:00 PM",
    location: "Building C, Room 201",
    status: "completed",
  },
];

export default function PatientAppointments() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(mockAppointments);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [rescheduleId, setRescheduleId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      setAppointments(appointments.filter((apt) => apt.id !== deleteId));
      setDeleteId(null);
    }
  };

  const handleReschedule = (id: string, newDate: string, newTime: string) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, date: newDate, time: newTime } : apt
      )
    );
    setRescheduleId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "upcoming"
  );
  const pastAppointments = appointments.filter(
    (apt) => apt.status !== "upcoming"
  );

  return (
    <div className="space-y-6">
      {/* Upcoming Section */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-6">
          Upcoming Appointments
        </h2>
        {upcomingAppointments.length === 0 ? (
          <Card className="bg-white/50 dark:bg-slate-800/50 border-dashed">
            <CardContent className="pt-6 text-center text-muted-foreground">
              No upcoming appointments scheduled
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {upcomingAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onDelete={() => setDeleteId(appointment.id)}
                onReschedule={() => setRescheduleId(appointment.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Past Section */}
      {pastAppointments.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Past Appointments
          </h2>
          <div className="grid gap-4">
            {pastAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onDelete={() => setDeleteId(appointment.id)}
                onReschedule={() => setRescheduleId(appointment.id)}
                isPast
              />
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this appointment? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reschedule Modal */}
      {rescheduleId && (
        <RescheduleModal
          appointment={appointments.find((apt) => apt.id === rescheduleId)!}
          onSave={(newDate, newTime) =>
            handleReschedule(rescheduleId, newDate, newTime)
          }
          onClose={() => setRescheduleId(null)}
        />
      )}
    </div>
  );
}

interface AppointmentCardProps {
  appointment: Appointment;
  onDelete: () => void;
  onReschedule: () => void;
  isPast?: boolean;
}

function AppointmentCard({
  appointment,
  onDelete,
  onReschedule,
  isPast,
}: AppointmentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="hover:shadow-sm shadow-none transition-shadow">
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-foreground">
                {appointment.doctor}
              </h3>
              <Badge
                className={getStatusColor(appointment.status)}
                variant="secondary"
              >
                {appointment.status.charAt(0).toUpperCase() +
                  appointment.status.slice(1)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {appointment.specialty}
            </p>
            <div className="space-y-2 text-sm text-muted-foreground mt-3">
              <div className="flex items-center gap-x-2">
                <Calendar size={18} />
                {new Date(appointment.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center gap-x-2">
                <Clock size={18} /> {appointment.time}
              </div>
              <div className="flex items-center gap-x-2">
                <Pin size={18} /> {appointment.location}
              </div>
            </div>
          </div>

          {!isPast && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onReschedule}>
                <Calendar1 /> Reschedule
              </Button>
              <Button variant="destructive" size="sm" onClick={onDelete}>
                <Trash /> Delete
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
