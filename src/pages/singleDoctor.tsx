import { getDoctor, type BaseDoctor } from "@/services/doctors";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {};
const doctor: BaseDoctor = {
  id: 1,
  first_name: "Sarah",
  last_name: "Mitchell",
  email: "sarah.mitchell@healthcare.com",
  phone_number: "+1 (555) 123-4567",
  address: "123 Medical Center Drive, New York, NY 10001",
  bio: "Experienced cardiologist with over 15 years of practice. Specializing in preventive cardiology and heart disease management.",
  medical_spesification: ["Cardiology", "Internal Medicine", "Preventive Care"],
  image: "/professional-female-doctor-headshot.png",
  is_available: true,
  role: "doctor",
};

const details = [
  {
    label: "Email",
    value: doctor.email,
    icon: Mail,
  },
  {
    label: "Phone",
    value: doctor.phone_number || "Not provided",
    icon: Phone,
  },
  {
    label: "Address",
    value: doctor.address || "Not provided",
    icon: MapPin,
  },
];

function SingleDoctor({}: Props) {
  const id = useParams().id;

  return (
    <div className="pt-16 mx-auto flex flex-col space-y-5">
      <section className="bg-linear-to-br from-blue-50 via-white to-blue-200 px-6 py-12 md:py-16 flex flex-col md:flex-row items-center gap-8">
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
        <div className="flex-1 text-center md:text-start space-y-5">
          <div className="flex md:flex-row flex-col items-center justify-between">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {doctor.first_name} {doctor.last_name}
            </h1>
            <div className="flex items-center gap-3">
              {doctor.is_available ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
                      Available for Consultations
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <Clock className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Currently Unavailable
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
          <p className="text-xl text-primary">Medical Professional</p>
          <p className="text-priamry text-lg leading-relaxed max-w-2xl">
            Dedicated to providing comprehensive healthcare and personalized
            medical care with a patient-first approach.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            {doctor.medical_spesification &&
              doctor.medical_spesification.length > 0 &&
              doctor.medical_spesification.map((spec) => (
                <Badge
                  key={spec}
                  variant="secondary"
                  className="px-4 py-2 text-sm"
                >
                  {spec}
                </Badge>
              ))}
          </div>
        </div>
      </section>
      <section className="px-6 flex-1 bg-linear-to-b from-background to-muted/20">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {details.map((detail) => {
            const Icon = detail.icon;
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
                        {detail.value}
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
