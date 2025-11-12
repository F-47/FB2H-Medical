import DoctorCalendar from "@/components/doctors/single/doctor-calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { MedicalSpecifications } from "@/constants";
import { getDoctorById } from "@/services/doctors/doctors";
import { getScheduleById } from "@/services/doctors/schedules";
import { useQuery } from "@tanstack/react-query";
import {
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useParams } from "react-router";

type Props = {};

function SingleDoctor({}: Props) {
  const id = useParams().id;

  const {
    data: doctor,
    isLoading: isDoctorLoading,
    isError: isDoctorError,
    error: doctorError,
  } = useQuery({
    queryKey: ["doctor", id],
    queryFn: () => getDoctorById(id!),
    enabled: !!id,
  });

  const {
    data: schedule,
    isLoading: isScheduleLoading,
    isError: isScheduleError,
    error: scheduleError,
  } = useQuery({
    queryKey: ["schedule", id],
    queryFn: () => getScheduleById(id!),
    enabled: !!id,
  });

  if (isDoctorLoading || isScheduleLoading) {
    return (
      <div className="pt-16 mx-auto flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (isDoctorError || isScheduleError || !doctor) {
    const message =
      doctorError?.message || scheduleError?.message || "Failed to load data.";
    return (
      <div className="pt-16 mx-auto text-center text-red-600">
        {message} Please try again later.
      </div>
    );
  }
  const doctorDetails = [
    {
      label: "Email",
      value: doctor?.email,
      icon: Mail,
    },
    {
      label: "Phone",
      value: doctor?.phone_number,
      icon: Phone,
    },
    {
      label: "Address",
      value: doctor?.address,
      icon: MapPin,
    },
  ];

  const specCode = doctor.medical_spesification;
  const specLabel =
    MedicalSpecifications.values.find((spec) => spec.code === specCode)
      ?.label || "General";

  return (
    <div className="py-16 mx-auto flex flex-col space-y-5">
      <section className="bg-linear-to-br from-blue-50 via-white to-blue-200 px-6 py-12 md:py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
          <Avatar className="w-40 h-40 md:w-48 md:h-48 rounded-lg overflow-hidden">
            <AvatarImage
              src={
                doctor.image ||
                "/placeholder.svg?height=200&width=200&query=doctor"
              }
              alt={doctor.first_name}
            />
            <AvatarFallback className="text-2xl font-medium">
              {`${doctor.first_name?.[0] || ""}${
                doctor.last_name?.[0] || ""
              }`.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center md:text-start space-y-4">
            <div className="flex md:flex-row flex-col items-center justify-between">
              <h1 className="text-4xl md:text-5xl font-bold">
                {doctor.first_name} {doctor.last_name}
              </h1>
              <div className="flex items-center gap-3">
                {doctor.is_available ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
                      Available for Consultations
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <Clock className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Currently Unavailable
                    </span>
                  </div>
                )}
              </div>
            </div>
            <p className="text-xl text-primary">{specLabel}</p>
            <p className="text-priamry text-lg leading-relaxed max-w-2xl">
              {doctor.bio ||
                "No biography available for this doctor at the moment."}
            </p>
          </div>
        </div>
      </section>

      {schedule && schedule.length > 0 ? (
        <DoctorCalendar doctor_id={doctor.id} schedule={schedule} />
      ) : (
        <p className="text-center text-gray-500">No schedule available.</p>
      )}

      <section className="flex-1 container mx-auto bg-linear-to-b from-background to-muted/20">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctorDetails.map((detail) => {
            const Icon = detail.icon;
            console.log(detail);

            return (
              <Card key={detail.label} className="border-l-4 border-l-blue-500">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {detail.label}
                      </p>
                      <p className="text-foreground wrap-break-words">
                        {detail.value !== "" && detail.value !== null
                          ? detail.value
                          : "Not Specified"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default SingleDoctor;
