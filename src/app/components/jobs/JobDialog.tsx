"use client";

import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  Job,
  JobStatus,
  JobType,
  jobStatusEnum,
  jobTypesEnum,
} from "@/app/types";
import { format } from "date-fns";

interface Props {
  isOpen: boolean;
  job?: Job;
  onClose: (args: { refetch: boolean }) => void;
}

const jobState = (job?: Job) => ({
  id: job?.id,
  customerName: job?.customerName ?? "",
  jobType: job?.jobType ?? JobType.Electrical,
  status: job?.status ?? JobStatus.Scheduled,
  appointmentDate: job?.appointmentDate
    ? format(job.appointmentDate, "yyyy-MM-dd")
    : format(new Date(), "yyyy-MM-dd"),
  technician: job?.technician ?? "",
});

export const JobDialog = ({ isOpen, onClose, job }: Props) => {
  const [editingJob, setEditingJob] = useState(jobState(job));

  useEffect(() => {
    setEditingJob(jobState(job));
  }, [job]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditingJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const endpoint = `/api/jobs${editingJob.id ? `/${editingJob.id}` : ""}`;

    const res = await fetch(endpoint, {
      method: editingJob.id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(editingJob),
    });

    if (!res.ok) {
      alert("Something went wrong creating job");
    }

    // Handle form submission logic here
    setEditingJob(jobState());
    onClose({ refetch: true });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {}}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <DialogPanel className="fixed inset-0 bg-black opacity-30" />
        <div className="relative bg-white rounded-lg min-w-[40%] max-w-2xl mx-auto p-6">
          <DialogTitle className="font-medium">New Job</DialogTitle>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Customer Name
              </label>
              <input
                type="text"
                name="customerName"
                value={editingJob.customerName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Job Type
              </label>
              <select
                name="jobType"
                value={editingJob.jobType}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                {jobTypesEnum.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={editingJob.status}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                {jobStatusEnum.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Appointment Date
              </label>
              <input
                type="date"
                name="appointmentDate"
                value={editingJob.appointmentDate}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Technician
              </label>
              <input
                type="text"
                name="technician"
                value={editingJob.technician}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-4 py-2 bg-white text-blue-500 border border-blue-500 rounded hover:bg-gray-100"
              >
                Submit
              </button>
              <button
                type="button"
                className="px-4 py-2 ml-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                onClick={() => onClose({ refetch: false })}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};
