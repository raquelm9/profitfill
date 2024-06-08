import { JobStore } from "@/app/lib/jobStore";
import { jobSchema } from "@/app/lib/validators";
import { Job } from "@/app/types";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return Response.json({ messsage: "Not found" }, { status: 404 });
  }

  const job = JobStore.getById<Job>(params.id);

  if (!job) {
    return Response.json({ messsage: "Not found" }, { status: 404 });
  }

  const body = await request.json();
  const updates = jobSchema.safeParse(body);

  if (!updates.success) {
    return Response.json(updates.error, { status: 400 });
  }

  const updatedJob = { ...updates.data, id: params.id };
  JobStore.set(job.id, updatedJob);
  return Response.json(updatedJob, { status: 200 });
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return Response.json({ messsage: "Not found" }, { status: 404 });
  }

  const job = JobStore.getById(params.id);

  if (!job) {
    return Response.json({ messsage: "Not found" }, { status: 404 });
  }

  return Response.json(job, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return Response.json({ messsage: "Not found" }, { status: 404 });
  }

  const job = JobStore.getById(params.id);

  if (!job) {
    return Response.json({ messsage: "Not found" }, { status: 404 });
  }

  JobStore.remove(params.id);
  return Response.json(job, { status: 200 });
}
