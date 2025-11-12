import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  getScheduleByToken,
  updateSchedule,
  type TSchedule,
} from "@/services/doctors/schedules";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const slotSchema = z.object({
  day: z.string(),
  is_available: z.boolean(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  sessionTime: z.string().optional(),
});

type Slot = z.infer<typeof slotSchema>;

export default function AvailabilityScheduler() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["schedule"],
    queryFn: getScheduleByToken,
  });
  const mutation = useMutation({
    mutationFn: (data: TSchedule) => updateSchedule(data),
    onSuccess: () => {
      toast.success("Slot updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No schedule data found</p>;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-blue-900 mb-2">
          Availability Schedule
        </h1>
        <p className="text-gray-600">
          Update availability for each day separately
        </p>
      </header>

      <div className="grid gap-4">
        {data.map((slot: any) => (
          <DayForm key={slot.id} slot={slot} onSubmit={mutation.mutateAsync} />
        ))}
      </div>
    </div>
  );
}

function DayForm({
  slot,
  onSubmit,
}: {
  slot: TSchedule;
  onSubmit: (values: TSchedule) => Promise<void>;
}) {
  const form = useForm<Slot>({
    resolver: zodResolver(slotSchema),
    defaultValues: {
      day: slot.day,
      is_available: slot.is_available,
      startTime: slot.start_time?.slice(0, 5),
      endTime: slot.end_time?.slice(0, 5),
      sessionTime: String(slot.min_session_duration),
    },
    mode: "onChange",
  });

  const values = form.watch();
  const { isDirty } = form.formState;

  const handleSave = async (data: Slot) => {
    await onSubmit({
      id: slot.id,
      day: data.day,
      is_available: data.is_available,
      start_time: data.startTime || null,
      end_time: data.endTime || null,
      min_session_duration: Number(data.sessionTime),
    });
    form.reset(data);
  };

  const handleCancel = () => {
    form.reset();
  };

  return (
    <Card
      className={cn(
        "p-4 border border-gray-200 transition-all duration-500",
        !values.is_available && "opacity-60",
        isDirty && "border-blue-500 shadow-xl"
      )}
    >
      <Form {...form}>
        <form className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">{slot.day}</h3>

            <div className="flex flex-col items-center gap-2">
              <FormField
                control={form.control}
                name="is_available"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Available</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {values.is_available && (
            <div className="flex items-end gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>From</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>To</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sessionTime"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Session Time</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
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
                  </FormItem>
                )}
              />
              {isDirty && (
                <div className="flex gap-x-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="px-2 py-1 text-green-600!"
                    onClick={form.handleSubmit(handleSave)}
                  >
                    ✔
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="px-2 py-1 text-red-600!"
                    onClick={handleCancel}
                  >
                    ✖
                  </Button>
                </div>
              )}
            </div>
          )}
        </form>
      </Form>
    </Card>
  );
}
