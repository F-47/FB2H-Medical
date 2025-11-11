import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MedicalSpecifications } from "@/constants";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

type Props = {
  searchParams: URLSearchParams;
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
};

function DoctorsFilter({ searchParams, setSearchParams }: Props) {
  const [address, setAddress] = useState(searchParams.get("address") || "");
  const [firstName, setFirstName] = useState(
    searchParams.get("phone_number") || ""
  );

  const toggleMultiFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const existing = params.getAll(key);

    if (existing.includes(value)) {
      params.delete(key);
      existing.filter((v) => v !== value).forEach((v) => params.append(key, v));
    } else {
      existing.push(value);
      params.delete(key);
      existing.forEach((v) => params.append(key, v));
    }

    setSearchParams(params);
  };

  const toggleSingleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const existing = params.get(key);

    if (existing === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    setSearchParams(params);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
    setAddress("");
    setFirstName("");
  };

  const hasActiveFilters = Array.from(searchParams.keys()).length > 0;

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (address) params.set("address", address);
      else params.delete("address");
      setSearchParams(params);
    }, 500);

    return () => clearTimeout(timeout);
  }, [address]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (firstName) params.set("first_name", firstName);
      else params.delete("first_name");
      setSearchParams(params);
    }, 500);

    return () => clearTimeout(timeout);
  }, [firstName]);

  return (
    <aside className="w-64 border p-4 rounded-md space-y-2 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg text-gray-800">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs text-blue-600 hover:underline px-2"
          >
            Clear all
          </Button>
        )}
      </div>

      <Accordion
        type="single"
        collapsible
        defaultValue="item-name"
        className="w-full"
      >
        <AccordionItem value="item-name">
          <AccordionTrigger>Name</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-sm text-gray-700">
            <Input
              type="text"
              name="first_name"
              value={firstName}
              placeholder="Enter Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-address">
          <AccordionTrigger>Address</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-sm text-gray-700">
            <Input
              type="text"
              name="address"
              value={address}
              placeholder="Enter address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-availability">
          <AccordionTrigger>Availability</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-sm text-gray-700">
            <div className="flex flex-col gap-2">
              {[
                { label: "Available", code: "is_available", value: "true" },
                {
                  label: "Not Available",
                  code: "is_available",
                  value: "false",
                },
              ].map((item, index) => (
                <label
                  key={index}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <input
                    type="radio"
                    name="availability"
                    value={item.value}
                    checked={searchParams.get(item.code) === item.value}
                    onChange={() => toggleSingleFilter(item.code, item.value)}
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        {Object.entries(MedicalSpecifications).map(([key, options], i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>{options.label}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-3 text-sm text-gray-700">
              <div className="flex flex-col gap-2">
                {options.values.map((opt, index) => (
                  <label
                    key={index}
                    className="cursor-pointer flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={searchParams.getAll(key).includes(opt.code)}
                      onChange={() => toggleMultiFilter(key, opt.code)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
}

export default DoctorsFilter;
