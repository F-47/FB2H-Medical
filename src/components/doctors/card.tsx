import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { BaseDoctor } from "@/services/doctors";
import { Mail, Phone } from "lucide-react";
import { Link } from "react-router";

interface DoctorCardProps {
  doctor: BaseDoctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const fullName = `${doctor.first_name} ${doctor.last_name}`;
  const specialization = doctor.medical_spesification || "Not Specified";

  return (
    <Card className="hover:shadow-sm transition-shadow w-full">
      <CardContent className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4">
        <Link
          to={`/doctors/${doctor.id}`}
          className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center"
        >
          {doctor.image ? (
            <img
              src={doctor.image}
              alt={fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xl font-bold text-primary">
              {doctor.first_name[0]}
              {doctor.last_name[0]}
            </span>
          )}
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <Link
              to={`/doctors/${doctor.id}`}
              className="hover:text-primary text-lg font-semibold truncate hover:underline"
            >
              {fullName}
            </Link>
            {doctor.is_available !== undefined && (
              <Badge
                variant="secondary"
                className={cn(
                  doctor.is_available
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                )}
              >
                {doctor.is_available ? "Available" : "Unavailable"}
              </Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-2 ">
            {specialization}
          </p>

          <div className="flex flex-col sm:flex-row sm:gap-2 gap-1 text-sm text-muted-foreground items-start sm:items-center">
            {doctor.email && (
              <Link
                to={`mailto:${doctor.email}`}
                className="hover:text-blue-500"
              >
                {doctor.email}
              </Link>
            )}
            {doctor.email && doctor.phone_number && (
              <span className="hidden sm:inline mx-1">|</span>
            )}
            {doctor.phone_number && (
              <Link
                to={`tel:${doctor.phone_number}`}
                className="hover:text-blue-500 "
              >
                {doctor.phone_number}
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
