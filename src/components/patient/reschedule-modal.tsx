import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RescheduleModalProps {
  appointment: {
    id: string;
    doctor: string;
    date: string;
    time: string;
  };
  onSave: (newDate: string, newTime: string) => void;
  onClose: () => void;
}

export default function RescheduleModal({
  appointment,
  onSave,
  onClose,
}: RescheduleModalProps) {
  const [newDate, setNewDate] = useState(appointment.date);
  const [newTime, setNewTime] = useState(appointment.time.split(" ")[0]);

  const handleSave = () => {
    const period = appointment.time.includes("PM") ? "PM" : "AM";
    onSave(newDate, `${newTime} ${period}`);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reschedule Appointment</DialogTitle>
          <DialogDescription>
            Rescheduling appointment with {appointment.doctor}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="date">New Date</Label>
            <Input
              id="date"
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="border-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">New Time</Label>
            <Input
              id="time"
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="border-input"
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              <strong>Confirmation:</strong>{" "}
              {new Date(newDate).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}{" "}
              at {newTime}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-primary text-primary-foreground"
          >
            Confirm Reschedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
