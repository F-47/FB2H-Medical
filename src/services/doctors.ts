import { accountsAPI } from "./axios";

export type BaseDoctor = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  address?: string;
  is_available?: boolean;
  medical_specialization?: string[];
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
