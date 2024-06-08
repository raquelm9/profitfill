import { z } from "zod";
import { jobStatusEnum, jobTypesEnum } from "../types";

const dateString = z.string().refine(
  (value) => {
    const date = new Date(value);
    return !isNaN(date.getTime());
  },
  {
    message: "Invalid date string",
  }
);

export const jobSchema = z.object({
  id: z.number().optional(),
  customerName: z.string(),
  jobType: z.enum(jobTypesEnum as unknown as readonly [string, ...string[]]),
  status: z.enum(jobStatusEnum as unknown as readonly [string, ...string[]]),
  appointmentDate: dateString,
  technician: z.string(),
});
