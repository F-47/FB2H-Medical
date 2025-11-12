import { appointmentsAPI } from "../axios";
import type { GetDoctor } from "../doctors/doctors";
import type { TSchedule } from "../doctors/schedules";

type TStatus = "W" | "R" | "P";

export type TAppointment = {
  id: number;
  doctor: GetDoctor;
  schedule: TSchedule;
  status: TStatus;
  start_time: string;
  created_at: string;
  updated_at: string;
  cancle: boolean;
};

export type TAppointmentPost = {
  doctor_id: number;
  schedule_id: string;
  start_time: string;
};

export async function getAppointments(): Promise<TAppointment[]> {
  const res = await appointmentsAPI.get("", {
    params: {
      self: true,
    },
  });
  return res.data;
}

export async function createAppointment(data: TAppointmentPost) {
  const res = await appointmentsAPI.post(`/`, data);
  return res.data;
}

export async function cancelAppointment(appointment_pk: number) {
  const res = await appointmentsAPI.patch(`/${appointment_pk}/`, {
    cancle: true,
  });
  return res.data;
}
