import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const secret = process.env.REVALIDATE_SECRET;

  if (!body || body.secret !== secret) {
    return Response.json({ message: "غير مصرح" }, { status: 401 });
  }

  const path = typeof body.path === "string" ? body.path : "/";
  revalidatePath(path);

  return Response.json({ revalidated: true, path });
}
