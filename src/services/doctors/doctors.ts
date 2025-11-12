import { accountsAPI } from "../axios";

export type BaseDoctor = {
  address?: string | null;
  bio?: string | null;
  email: string;
  first_name: string;
  id: number;
  image?: string | null;
  is_available?: boolean;
  last_name: string;
  medical_spesification?: string | null;
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

export async function getDoctorById(id: string) {
  const res = await accountsAPI.get<GetDoctor>(`/doctors/${id}/`);
  return res.data;
}
export async function getDoctorByToken() {
  const res = await accountsAPI.get<GetDoctor>(`/doctors`, {
    params: {
      self: true,
    },
  });
  return res.data;
}

export async function updateDoctor(data: Partial<BaseDoctor>) {
  const res = await accountsAPI.patch<GetDoctor>(`/doctors/`, data);
  return res.data;
}
