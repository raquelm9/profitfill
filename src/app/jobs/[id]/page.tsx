"use client";

import { Job } from "@/app/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<Job | undefined>();
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      const loadJob = async () => {
        const res = await fetch(`/api/jobs/${params.id}`);

        if (!res.ok) {
          if (res.status === 404) {
            router.push("/");
          } else {
            alert("Something went wrong loading job");
          }
        }

        const data = await res.json();
        setJob(data);
      };

      loadJob();
    }
  }, [params?.id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen p-24">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Job Detail</h1>
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-semibold mb-2">{job.customerName}</h2>
          <p>
            <strong>Job Type:</strong> {job.jobType}
          </p>
          <p>
            <strong>Status:</strong> {job.status}
          </p>
          <p>
            <strong>Appointment Date:</strong> {job.appointmentDate}
          </p>
          <p>
            <strong>Technician:</strong> {job.technician}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => router.push("/")}
          >
            Back to Jobs
          </button>
        </div>
      </div>
    </main>
  );
}
