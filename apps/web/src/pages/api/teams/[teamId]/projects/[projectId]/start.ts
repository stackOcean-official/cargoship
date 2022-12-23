import { getSessionOrUser } from "@/lib/apiHelper";
import { deleteProject, fetchLogs, overwriteRFile, startServer } from "@/lib/docker";
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

  // GET /api/teams[teamId]/projects/[projectId]/start
  // Start server
  if (req.method === "POST") {
    await startServer(projectId);
    const updatedProject = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        running: true,
      },
    });
    return res.json(updatedProject);
  }

  // Unknown HTTP Method
  else {
    throw new Error(`The HTTP ${req.method} method is not supported by this route.`);
  }
}
