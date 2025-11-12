import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentUser } from "@/services/auth";
import type { TGetSchedule } from "@/services/doctors/schedules";
import {
  createAppointment,
  type TAppointmentPost,
} from "@/services/patient/appointment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Calendar, CheckCircle, Clock, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  doctor_id: number;
  schedule: TGetSchedule[];
  selectedDate: Date;
}

export default function TimeSlotPicker({
  doctor_id,
  schedule,
  selectedDate,
}: Props) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getCurrentUser,
  });

  const dayCode = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][
    selectedDate.getDay()
  ];
  const nschedule = schedule.find((s) => s.day === dayCode);

  const mutation = useMutation({
    mutationFn: (data: TAppointmentPost) => createAppointment(data),
    onSuccess: () => {
      toast.success("Appointment booked successfully!");
      setSelectedSlot(null);
      queryClient.invalidateQueries({ queryKey: ["schedule", doctor_id] });
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to book appointment");
    },
  });

  const handleBook = () => {
    if (!selectedSlot || !nschedule || !user) return;

    mutation.mutate({
      doctor_id,
      schedule_id: nschedule.id,
      start_time: selectedSlot,
    });
  };

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  if (isUserError || !user) {
    return (
      <p className="text-center text-red-600 py-8">
        You must be logged in to book an appointment.
      </p>
    );
  }

  if (user.role !== "patient") {
    return (
      <p className="text-center text-red-600 py-8">
        Only patients can book appointments.
      </p>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Appointment Time</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {selectedDate.toDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!schedule || nschedule?.available_slots.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No available time slots for this date.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {nschedule?.available_slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 rounded-md text-sm font-medium border-2 border-transparent ${
                    selectedSlot === slot
                      ? "bg-blue-600 text-white border-blue-700 shadow-md"
                      : "bg-blue-50 text-blue-900 hover:bg-blue-100 border-blue-200"
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="h-3 w-3" />
                    {slot}
                  </div>
                </button>
              ))}
            </div>

            {selectedSlot && (
              <Button
                onClick={handleBook}
                disabled={mutation.isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {mutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                ) : (
                  "Book Appointment"
                )}
              </Button>
            )}

            {mutation.isSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">
                    Appointment Booked!
                  </p>
                  <p className="text-sm text-green-700">
                    Your appointment is scheduled for{" "}
                    {selectedDate.toDateString()} at{" "}
                    {mutation.variables?.start_time}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
