import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { GetDoctor } from "@/services/doctors";
import { Mail, MapPin, Phone } from "lucide-react";

interface DoctorCardProps {
  doctor: GetDoctor;
  compact?: boolean;
}

export default function DoctorCard({
  doctor,
  compact = false,
}: DoctorCardProps) {
  const fullName = `${doctor.first_name} ${doctor.last_name}`;
  const specializations = doctor.medical_spesification || [];

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        {doctor.image && (
          <img
            src={doctor.image || "/placeholder.svg"}
            alt={fullName}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        {!doctor.image && (
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary/30 to-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {doctor.first_name[0]}
              {doctor.last_name[0]}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground truncate">
            Dr. {fullName}
          </p>
          {specializations.length > 0 && (
            <p className="text-sm text-muted-foreground truncate">
              {specializations[0]}
            </p>
          )}
        </div>
        {doctor.is_available !== undefined && (
          <Badge
            variant="secondary"
            className={
              doctor.is_available
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            }
          >
            {doctor.is_available ? "Available" : "Unavailable"}
          </Badge>
        )}
      </div>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Doctor Image */}
          <div className="shrink-0">
            {doctor.image ? (
              <img
                src={doctor.image || "/placeholder.svg"}
                alt={fullName}
                className="w-20 h-20 rounded-lg object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-lg bg-linear-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                <span className="text-lg font-semibold text-primary">
                  {doctor.first_name[0]}
                  {doctor.last_name[0]}
                </span>
              </div>
            )}
          </div>

          {/* Doctor Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Dr. {fullName}
                </h3>
                {/* {specializations && specializations.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {specializations.map((spec) => (
                      <Badge key={spec} variant="secondary" className="text-xs">
                        <Stethoscope className="w-3 h-3 mr-1" />
                        {spec}
                      </Badge>
                    ))}
                  </div>
                )} */}
              </div>
              {doctor.is_available !== undefined && (
                <Badge
                  variant="secondary"
                  className={
                    doctor.is_available
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  }
                >
                  {doctor.is_available ? "Available" : "Unavailable"}
                </Badge>
              )}
            </div>

            {/* Bio */}
            {doctor.bio && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {doctor.bio}
              </p>
            )}

            {/* Contact Info */}
            <div className="space-y-1 text-sm text-muted-foreground">
              {doctor.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a
                    href={`mailto:${doctor.email}`}
                    className="hover:text-primary"
                  >
                    {doctor.email}
                  </a>
                </div>
              )}
              {doctor.phone_number && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a
                    href={`tel:${doctor.phone_number}`}
                    className="hover:text-primary"
                  >
                    {doctor.phone_number}
                  </a>
                </div>
              )}
              {doctor.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{doctor.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
