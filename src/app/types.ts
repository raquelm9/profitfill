export const JobType = {
  Installation: "Installation",
  Maintenance: "Maintenance",
  Repair: "Repair",
  Cleaning: "Cleaning",
  Plumbing: "Plumbing",
  Electrical: "Electrical",
} as const;

export const JobStatus = {
  Pending: "Pending",
  Scheduled: "Scheduled",
  InProgress: "In Progress",
  Complete: "Complete",
} as const;

export const jobTypesEnum = Object.values(JobType);
export const jobStatusEnum = Object.values(JobStatus);

export interface Job {
  id: number;
  customerName: string;
  jobType: (typeof JobType)[keyof typeof JobType];
  status: (typeof JobStatus)[keyof typeof JobStatus];
  appointmentDate: string;
  technician: string;
}
