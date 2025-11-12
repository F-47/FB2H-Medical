import { accountsAPI } from "../axios";

export type BasePatient = {
  phone_number?: string | null;
};

export async function getPatientByToken() {
  const res = await accountsAPI.get(`/patients`, {
    params: {
      self: true,
    },
  });
  return res.data;
}

export async function updatePatient(data: Partial<BasePatient>) {
  const res = await accountsAPI.patch(`/patients/`, data);
  return res.data;
}
