import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
  getPatientByToken,
  updatePatient,
  type BasePatient,
} from "@/services/patient/patients";

const patientSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email"),
  phone_number: z.string().min(1, "Phone is required"),
});

type PatientFormValues = z.infer<typeof patientSchema>;

export default function PatientSettings() {
  const queryClient = useQueryClient();

  const { data: patient, isLoading } = useQuery({
    queryKey: ["patient"],
    queryFn: getPatientByToken,
  });

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: Partial<BasePatient>) => updatePatient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient"] });
      toast.success("Profile updated successfully!");
    },
    onError: () => toast.error("Failed to update profile"),
  });

  const onSubmit = (data: PatientFormValues) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (patient) {
      form.reset({
        first_name: patient.first_name ?? "",
        last_name: patient.last_name ?? "",
        email: patient.email ?? "",
        phone_number: patient.phone_number ?? "",
      });
    }
  }, [patient]);

  if (isLoading) return <p>Loading patient data...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Settings</h1>
        <p className="text-gray-600">Update your personal information</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="p-8 bg-white border border-blue-200 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={mutation.isPending || !form.formState.isDirty}
            >
              {mutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </Card>
        </form>
      </Form>
    </div>
  );
}
