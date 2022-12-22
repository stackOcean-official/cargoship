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

  // GET /api/teams[teamId]/projects
  // Get a specific team
  if (req.method === "GET") {
    const projects = await prisma.project.findMany({
      where: {
        team: {
          id: teamId,
        },
      },
    });

    return res.json(projects);
  }

  // POST /api/teams[teamId]/projects
  // Create a new project
  // Required fields in body: -
  // Optional fields in body: label, schema
  else if (req.method === "POST") {
    const project = req.body;

    // create project in db
    const result = await prisma.project.create({
      data: {
        ...project,
        team: { connect: { id: teamId } },
      },
    });
    res.json(result);
  }

  // Unknown HTTP Method
  else {
    throw new Error(`The HTTP ${req.method} method is not supported by this route.`);
  }
}
