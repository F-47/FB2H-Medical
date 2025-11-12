import { appointmentsAPI } from "../axios";

export async function getScheduleByToken() {
  const res = await appointmentsAPI.get("/schedule/", {
    params: {
      self: true,
    },
  });
  return res.data;
}

export type TSchedule = {
  id: string;
  day: string;
  is_available: boolean;
  start_time: string | null;
  end_time: string | null;
  min_session_duration: number;
};

export type TGetSchedule = TSchedule & {
  available_slots: string[];
};

export async function updateSchedule(data: TSchedule & { id: string }) {
  const res = await appointmentsAPI.patch(`/schedule/${data.id}/`, data);
  return res.data;
}

export async function getScheduleById(
  doctorId: string
): Promise<TGetSchedule[]> {
  const res = await appointmentsAPI.get<{ schedules: TGetSchedule[] }>(
    `/available/`,
    {
      params: {
        doctor_pk: doctorId,
      },
    }
  );
  return res.data.schedules;
}
