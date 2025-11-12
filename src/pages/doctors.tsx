import DoctorCard from "@/components/doctors/card";
import DoctorsFilter from "@/components/doctors/sidebar";
import { getDoctors } from "@/services/doctors/doctors";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { Loader2 } from "lucide-react";

type Props = {};

function Doctors({}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsObj = Object.fromEntries(searchParams.entries());

  const { data, isLoading, isError } = useQuery({
    queryKey: ["doctors", paramsObj],
    queryFn: () => getDoctors(searchParams),
  });

  return (
    <div className="flex container mx-auto gap-6 relative py-28">
      <DoctorsFilter
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-6">
        {isLoading && (
          <div className="col-span-full flex justify-center items-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        )}

        {isError && (
          <div className="col-span-full text-center text-red-600 py-10">
            Failed to fetch doctors. Please try again later.
          </div>
        )}

        {!isLoading && !isError && data?.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-10">
            No doctors found matching your criteria.
          </div>
        )}

        {!isLoading &&
          !isError &&
          data?.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)}
      </div>
    </div>
  );
}

export default Doctors;
