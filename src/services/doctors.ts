import { accountsAPI } from "./axios";

export type BaseDoctor = {
  address?: string | null;
  bio?: string | null;
  email: string;
  first_name: string;
  id: number;
  image?: string | null;
  is_available?: boolean;
  last_name: string;
  medical_spesification?: string[] | null;
  phone_number?: string | null;
  role: "doctor" | "patient";
};

export type GetDoctor = BaseDoctor;

export type DoctorFilters = {
  specialty?: string[];
  first_name?: string;
  last_name?: string;
  email?: string;
  is_available?: boolean;
  phone_number?: string;
  address?: string;
};

export async function getDoctors(filters?: URLSearchParams) {
  const res = await accountsAPI.get<GetDoctor[]>("/doctors/", {
    params: filters,
  });
  return res.data;
}

export async function getDoctor(id: string) {
  const res = await accountsAPI.get<GetDoctor>(`/doctors/${id}/`);
  return res.data;
}
