import { jobSchema } from "../../lib/validators";
import { JobStore } from "../../lib/jobStore";

export async function GET(request: Request) {
  const jobs = JobStore.getAll();
  return Response.json(jobs);
}

export async function POST(request: Request, res: Response) {
  const body = await request.json();
  const result = jobSchema.safeParse(body);

  if (!result.success) {
    return Response.json(result.error, { status: 400 });
  }

  const job = { id: JobStore.generateId(), ...result.data };
  JobStore.set(job.id, job);
  return Response.json(job);
}
