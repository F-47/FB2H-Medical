import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MedicalSpecifications } from "@/constants";
import { getToken } from "@/services/auth";
import {
  getDoctorByToken,
  updateDoctor,
  type BaseDoctor,
} from "@/services/doctors/doctors";
import { toast } from "sonner";

const doctorSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  medical_spesification: z.string().optional(),
  bio: z.string().optional(),
  email: z.email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().optional(),
});

type DoctorFormValues = z.infer<typeof doctorSchema>;

export default function DoctorSettings() {
  const queryClient = useQueryClient();
  const token = getToken();

  const { data: doctor, isLoading } = useQuery({
    queryKey: ["doctor", token],
    queryFn: () => getDoctorByToken(),
  });
  const form = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      medical_spesification: "",
      bio: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: Partial<BaseDoctor>) => updateDoctor(data),
    onSuccess: (updatedDoctor) => {
      queryClient.setQueryData(["doctor"], updatedDoctor);
      toast("Doctor updated successfully!");
    },
    onError: () => toast.error("Failed to update doctor"),
  });

  const onSubmit = (data: DoctorFormValues) => {
    mutation.mutate(data);
  };
  useEffect(() => {
    if (doctor) {
      form.reset({
        first_name: doctor.first_name ?? "",
        last_name: doctor.last_name ?? "",
        medical_spesification: doctor.medical_spesification ?? "",
        bio: doctor.bio ?? "",
        email: doctor.email ?? "",
        phone: doctor.phone_number ?? "",
        address: doctor.address ?? "",
      });
    }
  }, [doctor]);

  if (isLoading) return <p>Loading doctor data...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Settings</h1>
        <p className="text-gray-600">Update your professional information</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="p-8 bg-white border border-blue-200 space-y-6">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medical_spesification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical Specification</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value ?? ""}
                      value={field.value ?? ""}
                      onValueChange={(val) => {
                        field.onChange(val);
                        form.setValue("medical_spesification", val);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Specialization" />
                      </SelectTrigger>
                      <SelectContent className="max-h-40">
                        {MedicalSpecifications.values.map((spec) => (
                          <SelectItem key={spec.code} value={spec.code}>
                            {spec.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
