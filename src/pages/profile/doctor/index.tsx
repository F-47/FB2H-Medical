import { Card } from "@/components/ui/card";
import { getToken } from "@/services/auth";
import { getDoctorByToken } from "@/services/doctors/doctors";
import { useQuery } from "@tanstack/react-query";

export default function DoctorProfile() {
  const token = getToken();

  const { data: doctor, isLoading } = useQuery({
    queryKey: ["doctor", token],
    queryFn: () => getDoctorByToken(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600">Loading doctor profile...</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Doctor data not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-blue-900">
          {doctor.first_name}
        </h1>
        <p className="text-xl text-blue-600 mt-1">
          {doctor.medical_spesification}
        </p>
      </div>

      <Card className="p-6 bg-white border border-blue-200">
        <h2 className="text-lg font-semibold text-blue-900 mb-3">About</h2>
        <p className="text-gray-700 leading-relaxed">
          {doctor.bio || "No bio available."}
        </p>
      </Card>

      <Card className="p-6 bg-white border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-4">
          Contact Information
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="text-gray-900 font-medium">{doctor.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="text-gray-900 font-medium">{doctor.phone_number}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Location</p>
            <p className="text-gray-900 font-medium">
              {doctor.address || "Not provided"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
