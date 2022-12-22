import { getSessionOrUser } from "@/lib/apiHelper";
import { prisma } from "@cargoship/database";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // Check Authentication
  const user: any = await getSessionOrUser(req, res);
  if (!user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const teamId = req.query.teamId.toString();

  const projectId = req.query.projectId.toString();

  // check team permission
  const membership = await prisma.membership.findUnique({
    where: {
      userId_teamId: {
        userId: user.id,
        teamId,
      },
    },
  });
  if (membership === null) {
    return res.status(403).json({ message: "You don't have access to this team or this team doesn't exist" });
  }

  // GET /api/teams[teamId]/projects/[projectId]
  // Get a specific team
  if (req.method === "GET") {
    const projects = await prisma.project.findFirst({
      where: {
        id: projectId,
        teamId,
      },
    });

    return res.json(projects);
  }

  // POST /api/teams[teamId]/projects/[projectId]
  // Replace a specific project
  else if (req.method === "POST") {
    const data = { ...req.body, updatedAt: new Date() };
    const prismaRes = await prisma.project.update({
      where: { id: projectId },
      data,
    });
    return res.json(prismaRes);
  }

  // Delete /api/teams[teamId]/projects/[projectId]
  // Deletes a single project
  else if (req.method === "DELETE") {
    const prismaRes = await prisma.project.delete({
      where: { id: projectId },
    });
    return res.json(prismaRes);
  }

  // Unknown HTTP Method
  else {
    throw new Error(`The HTTP ${req.method} method is not supported by this route.`);
  }
}
