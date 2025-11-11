import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AvailabilitySlot {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function AvailabilityScheduler() {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([
    { day: "Monday", startTime: "09:00", endTime: "17:00", isAvailable: true },
    { day: "Tuesday", startTime: "09:00", endTime: "17:00", isAvailable: true },
    {
      day: "Wednesday",
      startTime: "09:00",
      endTime: "14:00",
      isAvailable: true,
    },
    {
      day: "Thursday",
      startTime: "09:00",
      endTime: "17:00",
      isAvailable: true,
    },
    { day: "Friday", startTime: "09:00", endTime: "16:00", isAvailable: true },
    { day: "Saturday", startTime: "", endTime: "", isAvailable: false },
    { day: "Sunday", startTime: "", endTime: "", isAvailable: false },
  ]);

  const handleSlotChange = (dayIndex: number, field: string, value: string) => {
    const updatedSlots = [...slots];
    updatedSlots[dayIndex] = { ...updatedSlots[dayIndex], [field]: value };
    setSlots(updatedSlots);
  };

  const toggleAvailability = (dayIndex: number) => {
    const updatedSlots = [...slots];
    updatedSlots[dayIndex].isAvailable = !updatedSlots[dayIndex].isAvailable;
    if (!updatedSlots[dayIndex].isAvailable) {
      updatedSlots[dayIndex].startTime = "";
      updatedSlots[dayIndex].endTime = "";
    } else {
      updatedSlots[dayIndex].startTime = "09:00";
      updatedSlots[dayIndex].endTime = "17:00";
    }
    setSlots(updatedSlots);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-900 mb-2">
          Availability Schedule
        </h1>
        <p className="text-gray-600">
          Set your working hours and available days
        </p>
      </div>

      <Card className="p-6 bg-white border border-blue-200">
        <div className="space-y-4">
          {slots.map((slot, index) => (
            <div
              key={slot.day}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition"
            >
              <div className="w-32">
                <p className="font-semibold text-gray-900">{slot.day}</p>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={slot.isAvailable}
                  onChange={() => toggleAvailability(index)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-600">Available</span>
              </label>

              {slot.isAvailable && (
                <div className="flex-1 flex items-center gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-gray-600 block mb-1">
                      From
                    </label>
                    <input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) =>
                        handleSlotChange(index, "startTime", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-gray-600 block mb-1">
                      To
                    </label>
                    <input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) =>
                        handleSlotChange(index, "endTime", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white">
          Save Schedule
        </Button>
      </Card>
    </div>
  );
}
