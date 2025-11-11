import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const slotSchema = z.object({
  day: z.string(),
  isAvailable: z.boolean(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  sessionTime: z.string().optional(),
});

const formSchema = z.object({
  slots: z
    .array(slotSchema)
    .refine(
      (slots) =>
        slots.every(
          (s) =>
            !s.isAvailable ||
            (s.startTime && s.endTime && s.startTime < s.endTime)
        ),
      { message: "End time must be after start time for available days." }
    ),
});

type FormValues = z.infer<typeof formSchema>;
type Slot = FormValues["slots"][number];

const defaultSlots: Slot[] = [
  { day: "Saturday", startTime: "", endTime: "", isAvailable: false },
  { day: "Sunday", startTime: "", endTime: "", isAvailable: false },
  { day: "Monday", startTime: "09:00", endTime: "17:00", isAvailable: true },
  { day: "Tuesday", startTime: "09:00", endTime: "17:00", isAvailable: true },
  { day: "Wednesday", startTime: "09:00", endTime: "14:00", isAvailable: true },
  { day: "Thursday", startTime: "09:00", endTime: "17:00", isAvailable: true },
  { day: "Friday", startTime: "09:00", endTime: "16:00", isAvailable: true },
];

export default function AvailabilityScheduler() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { slots: defaultSlots },
    mode: "onChange",
  });

  const slots = form.watch("slots") as Slot[];

  useEffect(() => {
    slots.forEach((slot: Slot, i: number) => {
      if (!slot.isAvailable) {
        form.setValue(`slots.${i}.startTime`, "");
        form.setValue(`slots.${i}.endTime`, "");
      } else if (!slot.startTime || !slot.endTime) {
        form.setValue(`slots.${i}.startTime`, "09:00");
        form.setValue(`slots.${i}.endTime`, "17:00");
      }
    });
  }, [slots, form.setValue]);

  const onSubmit = (data: FormValues) => {
    console.log("✅ Schedule saved:", data.slots);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-blue-900 mb-2">
          Availability Schedule
        </h1>
        <p className="text-gray-600">
          Set your working hours and available days
        </p>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="p-6 bg-white border border-blue-200 space-y-4">
            {slots.map((slot: Slot, index: number) => (
              <div
                key={slot.day}
                className={cn(
                  "flex items-center gap-4 p-4 border border-gray-200 rounded-lg transition",
                  slot.isAvailable ? "hover:bg-blue-50" : "opacity-70"
                )}
              >
                <div className="w-32 font-semibold text-gray-900">
                  {slot.day}
                </div>
                <FormField
                  control={form.control}
                  name={`slots.${index}.isAvailable`}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 relative">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm text-gray-600 m-0">
                        Available
                      </FormLabel>
                    </FormItem>
                  )}
                />
                {slot.isAvailable && (
                  <div className="flex-1 flex items-center gap-3">
                    <FormField
                      control={form.control}
                      name={`slots.${index}.startTime`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-xs text-gray-600">
                            From
                          </FormLabel>
                          <FormControl>
                            <Input type="time" {...field} className="mt-1" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`slots.${index}.endTime`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-xs text-gray-600">
                            To
                          </FormLabel>
                          <FormControl>
                            <Input type="time" {...field} className="mt-1" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`slots.${index}.sessionTime`}
                      render={({ field }) => (
                        <FormItem className="flex-1 relative">
                          <FormLabel className="text-xs text-gray-600">
                            Session Time
                          </FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="w-full flex-1">
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                {[15, 20, 30, 45, 60].map((min) => (
                                  <SelectItem key={min} value={String(min)}>
                                    {min} min
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            ))}

            <Button
              type="submit"
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save Schedule
            </Button>
          </Card>
        </form>
      </Form>
    </div>
  );
}
