import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, Calendar } from "lucide-react";

interface Schedule {
  id: number;
  day: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
  min_session_duration: number;
  available_slots: string[];
}

interface Doctor {
  schedule: Schedule[];
}

export default function TimeSlotPicker({
  doctor,
  date,
}: {
  doctor: Doctor;
  date: Date;
}) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);

  const dayCode = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][
    date.getDay()
  ];
  const schedule = doctor.schedule.find((s) => s.day === dayCode);

  const handleBook = () => {
    if (!selectedSlot) return;
    setIsBooked(true);
    setSelectedSlot(null);
    setTimeout(() => setIsBooked(false), 3000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Appointment Time</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {date.toDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!schedule || schedule.available_slots.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No available time slots for this date.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {schedule.available_slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`
                    p-3 rounded-md text-sm font-medium
                    border-2 border-transparent
                    ${
                      selectedSlot === slot
                        ? "bg-blue-600 text-white border-blue-700 shadow-md"
                        : "bg-blue-50 text-blue-900 hover:bg-blue-100 border-blue-200"
                    }
                  `}
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Book Appointment
              </Button>
            )}

            {isBooked && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">
                    Appointment Booked!
                  </p>
                  <p className="text-sm text-green-700">
                    Your appointment is scheduled for {date.toDateString()} at{" "}
                    {selectedSlot}
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
