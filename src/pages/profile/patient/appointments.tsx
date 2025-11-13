"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { TAppointment } from "@/services/patient/appointment";
import {
  cancelAppointment,
  getAppointments,
} from "@/services/patient/appointment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Calendar, Clock, Pin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function PatientAppointments() {
  const queryClient = useQueryClient();
  const {
    data: appointments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["patient-appointments"],
    queryFn: getAppointments,
  });

  const [cancelId, setCancelId] = useState<number | null>(null);

  const cancelMutation = useMutation({
    mutationFn: async (id: number) => cancelAppointment(id),
    onSuccess: () => {
      toast.success("Appointment deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["patient-appointments"] });
      setCancelId(null);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.detail ||
          error.response?.data?.error ||
          "Failed to cancel appointment. Please try again.";
        toast.error(message);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    },
  });

  const handleCancel = () => {
    if (cancelId) {
      cancelMutation.mutate(cancelId);
    }
  };

  if (isLoading) {
    return (
      <p className="text-center py-8 text-muted-foreground">
        Loading appointments...
      </p>
    );
  }

  if (isError || !appointments) {
    return (
      <p className="text-center py-8 text-red-600">
        Failed to load appointments.
      </p>
    );
  }

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "W" || apt.status === "P"
  );
  const pastAppointments = appointments.filter(
    (apt) => apt.status !== "W" && apt.status !== "P"
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-6">
          Appointments
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
                onDelete={() => setCancelId(appointment.id)}
              />
            ))}
          </div>
        )}
      </div>

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
                onDelete={() => setCancelId(appointment.id)}
                isPast
              />
            ))}
          </div>
        </div>
      )}

      <AlertDialog
        open={cancelId !== null}
        onOpenChange={(open) => !open && setCancelId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this appointment? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Back</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancel}
              className="bg-destructive text-white hover:bg-destructive"
              disabled={cancelMutation.isPending}
            >
              {cancelMutation.isPending ? "Cancelling..." : "Cancel"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

interface AppointmentCardProps {
  appointment: TAppointment;
  onDelete: () => void;
  isPast?: boolean;
}

function AppointmentCard({
  appointment,
  onDelete,
  isPast,
}: AppointmentCardProps) {
  const { label, color } = (() => {
    if (appointment.cancle) {
      return {
        label: "Cancelled",
        color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      };
    }

    switch (appointment.status) {
      case "W":
        return {
          label: "Waiting",
          color:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        };
      case "R":
        return {
          label: "Rejected",
          color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        };
      case "P":
        return {
          label: "Approved",
          color:
            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        };
      default:
        return { label: "Unknown", color: "bg-gray-100 text-gray-800" };
    }
  })();

  return (
    <Card className="hover:shadow-sm shadow-none transition-shadow">
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-foreground">
                Dr. {appointment.doctor.first_name}{" "}
                {appointment.doctor.last_name}
              </h3>
              <Badge className={color} variant="secondary">
                {label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {appointment.doctor.medical_spesification ||
                "General Practitioner"}
            </p>
            <div className="space-y-2 text-sm text-muted-foreground mt-3">
              <div className="flex items-center gap-x-2">
                <Calendar size={18} /> {appointment.schedule.day}
              </div>
              <div className="flex items-center gap-x-2">
                <Clock size={18} /> {appointment.start_time}
              </div>
              <div className="flex items-center gap-x-2">
                <Pin size={18} />{" "}
                {appointment.doctor.address || "Clinic Location TBD"}
              </div>
            </div>
          </div>

          {!isPast && !appointment.cancle && (
            <div className="flex gap-2">
              <Button variant="destructive" size="sm" onClick={onDelete}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
