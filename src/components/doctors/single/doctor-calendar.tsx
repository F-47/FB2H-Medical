"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TimeSlotPicker from "./time-slot-picker";

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

export default function DoctorCalendar({ doctor }: { doctor: Doctor }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const weekDates = useMemo(() => {
    const today = new Date();
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push(d);
    }
    return days;
  }, []);

  const getScheduleForDate = (date: Date) => {
    const dayCode = dayNames[date.getDay()];
    return doctor.schedule.find((s) => s.day === dayCode);
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const isSelected = (date: Date) =>
    selectedDate?.toDateString() === date.toDateString();

  return (
    <div className="container mx-auto space-y-6 mb-10">
      <Card>
        <CardHeader>
          <CardTitle>Select Appointment Date</CardTitle>
          <CardDescription>
            Choose an available date to view time slots
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-3">
            {weekDates.map((date) => {
              const schedule = getScheduleForDate(date);
              const available =
                schedule?.is_available && schedule.available_slots.length > 0;
              const past = isPastDate(date);
              const selected = isSelected(date);

              return (
                <button
                  key={date.toISOString()}
                  onClick={() => available && !past && setSelectedDate(date)}
                  disabled={!available || past}
                  className={`
                    p-4 rounded-lg font-medium flex flex-col items-center justify-center gap-1 min-h-24
                    border-2
                    ${
                      selected
                        ? "bg-blue-600 text-white border-blue-700 shadow-md"
                        : "border-gray-200"
                    }
                    ${
                      available && !selected && !past
                        ? "bg-blue-50 text-blue-900 hover:bg-blue-100 cursor-pointer"
                        : ""
                    }
                    ${
                      !available || past
                        ? "bg-gray-50 text-gray-400 opacity-50 cursor-not-allowed"
                        : ""
                    }
                  `}
                >
                  <span className="text-xs uppercase">
                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                  </span>
                  <span className="text-2xl font-bold">{date.getDate()}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {selectedDate && <TimeSlotPicker doctor={doctor} date={selectedDate} />}
    </div>
  );
}
