import type React from "react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DoctorInfo {
  name: string;
  specialty: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  licenseNumber: string;
  yearsOfExperience: number;
  languages: string;
}

const initialDoctor: DoctorInfo = {
  name: "Dr. Sarah Mitchell",
  specialty: "Cardiology",
  bio: "Board-certified cardiologist with 12+ years of clinical experience in preventive and interventional cardiology.",
  email: "sarah.mitchell@medicalcenter.com",
  phone: "+1 (555) 123-4567",
  location: "Medical Center, Suite 302, San Francisco, CA",
  licenseNumber: "MD-456789",
  yearsOfExperience: 12,
  languages: "English, Spanish",
};

export default function ProfileEditor() {
  const [doctor, setDoctor] = useState<DoctorInfo>(initialDoctor);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({
      ...prev,
      [name]: name === "yearsOfExperience" ? Number.parseInt(value) : value,
    }));
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Edit Profile</h1>
        <p className="text-gray-600">Update your professional information</p>
      </div>

      {isSaved && (
        <div className="p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg">
          Profile updated successfully!
        </div>
      )}

      <Card className="p-8 bg-white border border-blue-200">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={doctor.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialty
              </label>
              <input
                type="text"
                name="specialty"
                value={doctor.specialty}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={doctor.bio}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={doctor.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={doctor.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={doctor.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                License Number
              </label>
              <input
                type="text"
                name="licenseNumber"
                value={doctor.licenseNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                name="yearsOfExperience"
                value={doctor.yearsOfExperience}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Languages (comma separated)
            </label>
            <input
              type="text"
              name="languages"
              value={doctor.languages}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button
            type="button"
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
          >
            Save Changes
          </Button>
        </form>
      </Card>
    </div>
  );
}
