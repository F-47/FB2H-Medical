import type { BaseDoctor } from "@/services/doctors";

type Props = {
  doctor: BaseDoctor;
};

function DoctorCard({ doctor }: Props) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-md transition">
      <h3 className="font-bold text-lg">
        {doctor.first_name} {doctor.last_name}
      </h3>
      <p className="text-sm text-gray-500">{doctor.specialty}</p>
      <p className="text-sm text-gray-500">{doctor.location}</p>
    </div>
  );
}

export default DoctorCard;
