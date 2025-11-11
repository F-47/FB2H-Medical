import { Card } from "@/components/ui/card";

const mockDoctor = {
  name: "Dr. Sarah Mitchell",
  specialty: "Cardiology",
  bio: "Board-certified cardiologist with 12+ years of clinical experience in preventive and interventional cardiology.",
  email: "sarah.mitchell@medicalcenter.com",
  phone: "+1 (555) 123-4567",
  location: "Medical Center, Suite 302, San Francisco, CA",
  licenseNumber: "MD-456789",
  yearsOfExperience: 12,
  languages: ["English", "Spanish"],
};

export default function Profile() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-blue-900">
            {mockDoctor.name}
          </h1>
          <p className="text-xl text-blue-600 mt-1">{mockDoctor.specialty}</p>
        </div>
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
          <span className="text-5xl">👨‍⚕️</span>
        </div>
      </div>

      <Card className="p-6 bg-white border border-blue-200">
        <h2 className="text-lg font-semibold text-blue-900 mb-3">About</h2>
        <p className="text-gray-700 leading-relaxed">{mockDoctor.bio}</p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-white border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-4">
            Contact Information
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-gray-900 font-medium">{mockDoctor.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="text-gray-900 font-medium">{mockDoctor.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="text-gray-900 font-medium">{mockDoctor.location}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-4">Credentials</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">License Number</p>
              <p className="text-gray-900 font-medium">
                {mockDoctor.licenseNumber}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Years of Experience</p>
              <p className="text-gray-900 font-medium">
                {mockDoctor.yearsOfExperience}+ years
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Languages</p>
              <p className="text-gray-900 font-medium">
                {mockDoctor.languages.join(", ")}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
