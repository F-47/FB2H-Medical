import DoctorCard from "@/components/doctors/card";
import DoctorsFilter from "@/components/doctors/sidebar";
import { getDoctors } from "@/services/doctors";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

type Props = {};

function Doctors({}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["doctors", searchParams],
    queryFn: () => getDoctors(searchParams),
  });

  return (
    <div className="flex container mx-auto gap-6 relative pt-32">
      <DoctorsFilter
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && <p>Loading doctors...</p>}
        {isError && <p>Failed to fetch doctors.</p>}
        {data &&
          data.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)}
      </div>
    </div>
  );
}

export default Doctors;
