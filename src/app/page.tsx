"use client";

import { useEffect, useState } from "react";
import { JobTable } from "./components/jobs/JobsTable";
import { JobDialog } from "./components/jobs/JobDialog";
import { Job } from "./types";

export default function JobsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Job | undefined>();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    const res = await fetch("/api/jobs");

    if (!res.ok) {
      alert("Somethign went wrong fetching the jobs");
    } else {
      const data = await res.json();
      setJobs(data);
    }
  };

  const deleteJob = async (job: Job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      alert("Something went wrong deleting job");
    }

    getJobs();
  };

  const openModal = () => setIsOpen(true);

  const closeModal = ({ refetch }: { refetch: boolean }) => {
    if (refetch) {
      getJobs();
    }

    setSelected(undefined);
    setIsOpen(false);
  };

  const onEditJob = (job: Job) => {
    setSelected(job);
    setIsOpen(true);
  };

  const onDeleteJob = (job: Job) => {
    deleteJob(job);
  };

  return (
    <main className="min-h-screen p-24">
      <div>
        <h1 className="text-lg">Job List</h1>
        <JobTable jobs={jobs} onEdit={onEditJob} onDelete={onDeleteJob} />
      </div>

      <div className="mt-4">
        <button
          className="px-3 py-2 bg-white text-blue-500 border border-blue-500 rounded hover:bg-gray-100"
          onClick={openModal}
        >
          Create New Job
        </button>
      </div>

      <JobDialog isOpen={isOpen} onClose={closeModal} job={selected} />
    </main>
  );
}
