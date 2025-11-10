import type { Dispatch, SetStateAction } from "react";

type Props = {
  searchParams: URLSearchParams;
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
};

const filters = {
  specialty: ["Cardiologist", "Dentist", "Dermatologist"],
  location: ["New York", "Los Angeles", "Chicago"],
};

function DoctorsFilter({ searchParams, setSearchParams }: Props) {
  const toggleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const existing = params.getAll(key);
    if (existing.includes(value)) {
      params.delete(key);
      existing.filter((v) => v !== value).forEach((v) => params.append(key, v));
    } else {
      params.append(key, value);
    }

    setSearchParams(params);
  };

  return (
    <aside className="w-64 border p-4 rounded-md space-y-6">
      {Object.entries(filters).map(([key, options]) => (
        <div key={key}>
          <h3 className="font-semibold mb-2">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </h3>
          <div className="flex flex-col gap-1">
            {options.map((opt) => (
              <label
                key={opt}
                className="cursor-pointer flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={searchParams.getAll(key).includes(opt)}
                  onChange={() => toggleFilter(key, opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}

export default DoctorsFilter;
